# NexusBoard: Optimized Production Architecture & App Flow

This updated architectural blueprint shifts **NexusBoard** from a single-process prototype to a production-ready, event-driven SaaS application flow. The architecture completely separates **Ingestion**, **Analytics Processing**, and **Presentation Display** to ensure fast load times, system stability, and clean horizontal scaling.

---

## 1. System Topology & Three-Tier Separation

NexusBoard divides tasks into isolated functional blocks to keep heavy processing from slowing down user interactions:

```text
[ Ingestion System ]                  [ Analytics Engine ]                 [ Presentation Layer ]
  - Celery Background Workers           - Pandas Normalization Engine        - Next.js Client App
  - Modular Abstract Adapters           - Score Aggregator Matrix            - Segmented Split APIs
  - Token Refresh Loops                 - Event Invalidation Bus             - Real-Time Sync Badges
          │                                      │                                      │
          ▼                                      ▼                                      ▼
┌───────────────────┐                  ┌───────────────────┐                  ┌───────────────────┐
│ PostgreSQL Store  │ ═══════════════> │    Redis Cache    │ ═══════════════> │ Browser Viewport  │
│ (Persistent Data) │                  │(Precomputed JSON) │                  │ (Lazy-Loaded UI)  │
└───────────────────┘                  └───────────────────┘                  └───────────────────┘
```

---

## 2. Streamlined Application Routing Tree

The onboarding flow is slimmed down to reduce user drop-off. Complex third-party integrations are deferred to internal settings dashboard cards so users can access the application faster.

```text
                        ┌───────────────────┐
                        │   Landing Page    │  ( / )
                        └─────────┬─────────┘
                                  │ Click Start CTA
                                  ▼
                        ┌───────────────────┐
                        │  Auth Gateway     │  ( /auth )
                        └─────────┬─────────┘
                                  │ JWT Generated
                                  ▼
                       [ Profile Verified? ]
                       ▲                   ▲
            New User   │                   │ Existing User
      ┌────────────────┴┐                  │
      │ Onboarding Hub  │                  │
      │ ( /onboarding ) │                  │
      └────────┬────────┘                  │
               │ Setup Profile             │
               │ (Integrations Optional)   │
               └────────┬──────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │  Dashboard Overview   │  ( /dashboard/overview )
            └───────────┬───────────┘
                        │
         ┌──────────────┼──────────────┬──────────────┐
         ▼              ▼              ▼              ▼
   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │  Coding  │   │  Social  │   │  Career  │   │ Settings │
   │Analytics │   │Analytics │   │Analytics │   │  Hub     │
   └──────────┘   └──────────┘   └──────────┘   └──────────┘
```

---

## 3. Asynchronous Ingestion & Background Sync Pipeline

Dashboard page loads **never** trigger direct, synchronous third-party API processing calls. The user interface reads precomputed data payloads directly from the Redis memory store, while background workers manage data ingestion.

### 3.1 Incremental Sync Loop Data Flow

```text
 [ Worker Trigger ] ──> Read last_synced_timestamp ──> Request Delta Only ──> [ Normalization Engine ]
```

1. **Trigger Engine:** Celery handles task schedules using `APScheduler` or a `Redis Queue` broker to run sync tasks automatically every few minutes.
2. **High-Watermark Check:** The integration worker reads the `last_synced_timestamp` attribute for the targeted profile from the central PostgreSQL database.
3. **Delta Extraction:** The worker passes this timestamp to external APIs to pull only new data points (e.g., new commits or updated follower counts) generated since the last successful sync run.
4. **Rate-Limit Guard:** Outbound requests route through an automated retry queue. If an external API returns a throttling error status, the task uses **exponential backoff** to automatically reschedule itself for a later run.

### 3.2 Sync Status State Transitions

The backend tracks synchronization states using a state matrix, passing updates directly to the user interface via a live status attribute:

```text
  ┌──────────────┐      Worker Job Runs      ┌──────────────┐
  │    Synced    │ ────────────────────────> │   Syncing    │
  └──────▲───────┘                           └──────┬───────┘
         │                                          │
         │ Job Done Successfully                    ├─ Job Fails / Timeout
         │                                          ▼
  ┌──────┴───────┐   15-Min Expiry Passed    ┌──────────────┐
  │    Stale     │ <──────────────────────── │    Failed    │
  └──────────────┘                           └──────────────┘
```

---

## 4. Modular Adapter Architecture & Data Normalization

All external platform connections inherit from a structured base template class. This keeps platform-specific query adjustments safely isolated from the core application logic.

### 4.1 Structural Ingestion Code Template

```python
from abc import ABC, abstractmethod
from typing import Dict, Any, List
from datetime import datetime

class BaseIntegrationAdapter(ABC):
    """
    Abstract blueprint enforcing absolute structural uniformity 
    across all inbound downstream connection modules.
    """
    
    @abstractmethod
    def authenticate(self, credentials: Dict[str, Any]) -> bool:
        pass

    @abstractmethod
    def fetch_delta_metrics(self, last_synced: datetime) -> List[Dict[str, Any]]:
        pass


class GitHubAdapter(BaseIntegrationAdapter):
    def authenticate(self, credentials: Dict[str, Any]) -> bool:
        # Secure token initialization sequence goes here
        return True

    def fetch_delta_metrics(self, last_synced: datetime) -> List[Dict[str, Any]]:
        # Executes specific GitHub GraphQL delta collection queries
        return [{"metric_type": "commits", "value": 5, "category": "coding"}]
```

### 4.2 Standardized Normalization Schema

Raw third-party data maps directly to a unified internal schema definition. This gives the scoring engine a consistent, predictable format to calculate overall performance index values:

```json
{
  "$schema": "https://nexusboard.io/schemas/metric.json",
  "type": "object",
  "properties": {
    "source": { "type": "string" },          "// Example: 'github', 'linkedin', 'instagram'"
    "metric_type": { "type": "string" },     "// Example: 'commits', 'impressions', 'views'"
    "value": { "type": "integer" },
    "timestamp": { "type": "string", "format": "date-time" },
    "category": { "type": "string" }         "// Example: 'coding', 'social', 'career', 'productivity'"
  },
  "required": ["source", "metric_type", "value", "timestamp", "category"]
}
```

### 4.3 Manual Tracking Fallback Matrix

If an upstream API suffers a prolonged outage or lacks public metrics access, the **Manual Override Layer** lets users fill in missing timeline data using direct dashboard forms or structured CSV file uploads:

```text
[ User Manual Form Input ] ──┐
                             ├──> Convert to Normalized Schema ──> Write to PostgreSQL
[ CSV Document Import ] ─────┘
```

---

## 5. Event-Driven Messaging Architecture

NexusBoard uses an internal event bus to keep modules decoupled. This makes it easy to add system actions—like audit logging, metric calculations, and automated webhooks—without changing the core ingestion workflows.

| Trigger Event Name | Origin Point Component | Downstream Processing Sequence |
| --- | --- | --- |
| **`ACCOUNT_CONNECTED`** | OAuth Service Manager | Initiates primary background synchronization tasks and schedules token validation checks. |
| **`SYNC_STARTED`** | Background Worker Pipeline | Sets the active sync status dashboard variable to `syncing` and clears the error tracking registers. |
| **`SYNC_COMPLETED`** | Modular Extraction Adapter | Routes raw data streams directly to the Pandas normalization engine. |
| **`ANALYTICS_UPDATED`** | Pandas Processing Core | Recalculates the unified overall score value using the standard target metrics. |
| **`CACHE_INVALIDATED`** | Analytics Scoring Engine | Evicts stale data segments from the Redis cluster memory, prompting the presentation tier to display the fresh dashboard updates. |

---

## 6. API Routing Architecture & Splitting

The broad, unified endpoint payload design is replaced by a segmented structure. This lets the frontend application lazy-load individual metrics, keeping dashboard views fast and responsive:

```text
                      ┌──> GET /api/v1/dashboard/overview   (Fast Summary View)
                      ├──> GET /api/v1/analytics/coding      (Lazy-Loaded Graph Data)
 [ Next.js Frontend ] ├──> GET /api/v1/analytics/social      (Lazy-Loaded Graph Data)
                      ├──> GET /api/v1/analytics/career      (Lazy-Loaded Graph Data)
                      └──> GET /api/v1/analytics/productivity(Lazy-Loaded Graph Data)
```

### 6.1 Split Endpoint Performance Matrix

| Target Endpoint Path | Data Scope Content | In-Memory Cache Life (Redis) |
| --- | --- | --- |
| `/api/v1/dashboard/overview` | Overall performance index score, timeline summaries, and global synchronization state flags. | 5 Minutes |
| `/api/v1/analytics/coding` | In-depth development metrics, commit arrays, and resolved problem logs. | 15 Minutes |
| `/api/v1/analytics/social` | Content distribution updates, absolute follower growth timelines, and multi-platform engagement scores. | 15 Minutes |
| `/api/v1/analytics/career` | Profile search visibility trends, active application status counts, and recruiter touchpoint records. | 15 Minutes |
| `/api/v1/analytics/productivity` | Manual time entry matrices, focus hour progress indicators, and custom task completion logs. | 1 Minute |

---

## 7. Production Storage Architecture

### 7.1 PostgreSQL Data Store Schema (Persistent Core)

```sql
-- Core user tracking definition
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Normalized time-series repository for analytical computations
CREATE TABLE normalized_metrics (
    id BIGSERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    source VARCHAR(32) NOT NULL,
    metric_type VARCHAR(64) NOT NULL,
    metric_value INT NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
    category VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_metrics_user_category_date ON normalized_metrics(user_id, category, recorded_at);
```

---

## 8. Observability & Monitoring Frameworks

The platform integrates deep system monitoring layers to ensure background operations run predictably:

* **Structured Application Logging:** Replaces plain string prints with rich JSON logs via `Logfire` or standardized Python logging tools to simplify centralized log parsing.
* **Telemetry Failure Pipelines:** Routes background worker connection errors and third-party API timeout alerts straight to `Sentry` for quick debugging.
* **Performance Metrics:** Tracks system throughput rates and request execution latencies, laying the groundwork for clean `Prometheus` and Grafana metrics down the road.
