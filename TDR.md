# TECHNICAL DESIGN RECORD (TDR)

**Project Title:** NexusBoard: Unified Personal Analytics Platform
**Document Version:** 2.0.0
**Date:** May 2026
**Status:** Approved for Core Architecture Revision

---

## 6. Unified Scoring System

To provide an objective metric for multi-dimensional performance tracking, NexusBoard computes a standardized scalar variable called the **Unified Score**. This score normalizes performance data across all four data-ingestion paths every day.

The core math behind the scoring framework evaluates each pillar as an isolated index value scaled between 0 and 100:

$$\text{Unified Score} = \frac{\text{Coding} + \text{Productivity} + \text{Social} + \text{Career}}{4}$$

### 6.1 Temporal Reporting Dimensions

The mathematical model outputs three specific temporal views based on this formula:

* **Overall Growth Score:** The current rolling 24-hour snapshot value reflecting daily task completion.
* **Weekly Trend Vector:** A moving average calculation smoothing out weekday and weekend behavioral variations:

$$\text{Unified Score}_{\text{weekly}} = \frac{1}{7}\sum_{i=1}^{7}\text{Unified Score}_{i}$$

* **Monthly Analytics Spectrum:** A 30-day macro pipeline matrix highlighting medium-term progress and multi-week consistency shifts.

---

## 7. System Architecture & Component Design

The NexusBoard data pipeline is built from the ground up to handle data extraction, normalization, and visualization efficiently while protecting the system from external API rate-limiting blocks.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS FRONTEND VIEWPORT                       │
│    (Tailwind CSS UI / Interactive Client-Side Recharts Components)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ JSON Payloads
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        FASTAPI APPLICATION LAYER                       │
│  [OAuth Router] ──> [Analytics Scoring Engine] ──> [Cache Middleware]  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Read/Write
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           PERSISTENCE SUBSYSTEM                        │
│         [Redis Memory Cache Layer]  <==>  [SQLite Database Engine]     │
└───────────────────────────────────▲────────────────────────────────────┘
                                    │ Cron Trigger / Sync Tasks
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       AUTOMATION & INTEGRATION LAYER                   │
│           [Background Sync System (APScheduler / Celery Core)]         │
│                                   │                                    │
│  ┌───────────────┬────────────────┼──────────────┬──────────────┐      │
│  ▼               ▼                ▼              ▼              ▼      ▼
│[GitHub]     [LeetCode]       [LinkedIn]     [Instagram]        [X]  [Naukri]
└────────────────────────────────────────────────────────────────────────┘
```

### 7.1 Core Components

* **OAuth Service:** Manages multi-platform authentication loops, token validation states, secure token refreshes, and encryption handshakes.
* **Scheduler Service:** Handles automated background synchronization tasks, prioritizing API calls dynamically based on platform-specific rate limits.
* **Integration Layer:** Modular platform connectors that normalize incoming data shapes before passing them down the line.
* **Redis Cache Layer:** Accelerates UI render pipelines by saving pre-calculated JSON records and avoiding repeated external API updates.

---

## 8. Backend Directory Structure

The platform uses a highly modular domain-driven layout, making it easy to add new integration connectors over time:

```text
backend/
├── app/
│   ├── main.py                     # ASGI application bootstrap
│   ├── api/                        # API Routing definitions
│   │   ├── v1/
│   │   │   ├── dashboard.py        # Core unified summary endpoints
│   │   │   ├── social.py           # Social analytics routes
│   │   │   └── career.py           # Career intelligence paths
│   ├── oauth/                      # OAuth authentication services
│   │   ├── manager.py              # Cryptographic handshake handlers
│   │   └── routes.py               # Callback verification endpoints
│   ├── scheduler/                  # Background sync automation engine
│   │   ├── engine.py               # APScheduler configuration routines
│   │   └── tasks.py                # Normalized extraction sequences
│   ├── integrations/               # Low-level platform adapters
│   │   ├── github/                 # GitHub GraphQL endpoint client
│   │   ├── leetcode/               # LeetCode query manager
│   │   ├── linkedin/               # LinkedIn profile insight collector
│   │   ├── instagram/              # Instagram Graph data client
│   │   ├── twitter/                # X API ingestion wrapper
│   │   └── naukri/                 # Naukri automation parser
│   ├── social_analytics/           # Social metric aggregators
│   ├── career_analytics/           # Career metric aggregators
│   ├── models/                     # SQLModel / SQLAlchemy definitions
│   └── config/                     # Core system settings
```

---

## 9. Data Architecture & Schema Specifications

The SQLite database schema isolates high-frequency third-party telemetry data from active authentication state vectors.

### 9.1 Social Metrics Repository

```sql
CREATE TABLE IF NOT EXISTS social_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    platform VARCHAR(32) NOT NULL,        -- 'instagram', 'twitter', 'linkedin'
    followers INTEGER NOT NULL DEFAULT 0,
    impressions INTEGER NOT NULL DEFAULT 0,
    engagement_rate REAL NOT NULL DEFAULT 0.0,
    recorded_date DATE NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_social_user_platform_date 
ON social_metrics(user_id, platform, recorded_date);
```

### 9.2 Linked Identity Registry (OAuth Token Storage)

```sql
CREATE TABLE IF NOT EXISTS connected_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    platform VARCHAR(32) NOT NULL,        -- 'github', 'linkedin', 'instagram', 'twitter'
    access_token TEXT NOT NULL,           -- Encrypted at rest
    refresh_token TEXT,                   -- Encrypted at rest
    token_expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_platform 
ON connected_accounts(user_id, platform);
```

---

## 10. OAuth 2.0 Security & Token Architecture

NexusBoard communicates directly with sensitive user-owned profiles, requiring clean security protocols at the application boundaries:

> ### 🔒 Cryptographic Protection Protocol
> 
> All long-lived authentication keys (`access_token`, `refresh_token`) must be encrypted before being written to disk. The application layer implements symmetric encryption using AES-256-GCM via the Python cryptography primitives library. Unencrypted secret keys must never appear in cleartext inside system logs or database dumps.

```text
       [OAuth Callback Handler] 
                  │
                  ▼
   [Extract Raw Access/Refresh Tokens]
                  │
                  ▼
  [Encrypt via AES-256-GCM Secret Key]
                  │
                  ▼
 [Write Encrypted Payload to SQLite Storage]
```

### 10.1 Proactive Token Refresh Cycle

To maintain continuous data ingestion without manual user logins, the background scheduler runs a token verification check before every extraction pipeline run:

$$\Delta t = T_{\text{expiration}} - T_{\text{current}}$$

* If $\Delta t \le 30\text{ minutes}$, the integration module intercepts the execution flow and routes a token refresh query out to the target platform's identity gateway using the stored `refresh_token`.
* Upon a successful refresh call, the database atomic transaction updates the `connected_accounts` entry with the new credentials and a recalculated timestamp.

---

## 11. Background Automation & Invalidation Caching Architecture

NexusBoard relies on background processing tools and intelligent caching layers to handle external request workflows efficiently.

### 11.1 Background Synchronization Engine

The synchronization system uses an `APScheduler` workflow engine integrated with the FastAPI ASGI process context. This setup handles scheduled background tasks smoothly without the maintenance overhead of heavy worker infrastructure configurations:

```python
from apscheduler.schedulers.background import BackgroundScheduler
from app.integrations.linkedin.client import sync_linkedin_metrics
from app.integrations.instagram.client import sync_instagram_metrics

scheduler = BackgroundScheduler()

# Register multi-platform background sync loops every 15 minutes
scheduler.add_job(sync_linkedin_metrics, 'interval', minutes=15, id='linkedin_sync')
scheduler.add_job(sync_instagram_metrics, 'interval', minutes=15, id='instagram_sync')
scheduler.start()
```

### 11.2 Redis Invalidation Caching Strategy

To keep dashboard page load times fast, the API routes use an absolute in-memory database configuration managed via a **Redis** cache wrapper.

* **Read Optimization Path:** When a user opens the main dashboard layout, the application routes the lookup query directly to the Redis server instance using a structured cache key string (e.g., `user:001:dashboard:unified`). If a valid record is found, it returns the compiled JSON payload instantly, bypassing the SQL relational engine entirely.
* **Write Eviction Path:** When a background synchronization task completes a successful extraction run or a user manually updates their productivity logs, the transaction model triggers a cache eviction call that drops the stale data key, preparing the system for the next read query.

---

## 12. API Gateway Contract Specifications

### 12.1 Platform Endpoint Registry

| Protocol | API Path Target | Payload Ingestion Context | Cache Time |
| --- | --- | --- | --- |
| `GET` | `/api/v1/social/instagram` | Fetches historical Instagram metric vectors including follower counts and impression lists. | 15 min |
| `GET` | `/api/v1/social/linkedin` | Fetches professional audience growth trends and post performance data. | 15 min |
| `GET` | `/api/v1/social/twitter` | Fetches X account impressions and interaction rate updates. | 15 min |
| `GET` | `/api/v1/career/naukri` | Pulls job seeker application histories and recruiter view trends. | 30 min |
| `GET` | `/api/v1/dashboard/unified` | Computes aggregate cross-domain metric vectors to render the main dashboard interface. | 5 min |

### 12.2 Unified Summary Payload Shape Example

`GET /api/v1/dashboard/unified`

```json
{
  "status": "success",
  "calculated_at": "2026-05-18T19:48:00Z",
  "metrics": {
    "unified_growth_score": 76.2,
    "historical_trends": {
      "weekly_delta": +4.1,
      "monthly_delta": +12.8
    },
    "pillars": {
      "developer_intelligence": { "score": 88.0, "primary_metric": "42 commits" },
      "productivity": { "score": 65.0, "primary_metric": "6.5 hours focus" },
      "social_analytics": { "score": 72.4, "primary_metric": "+1.2k followers" },
      "career_analytics": { "score": 79.4, "primary_metric": "14 recruiter views" }
    }
  }
}
```

---

## 13. Data Visualization Specifications

The Next.js client application maps raw API metrics into interactive client-side visual components using responsive vector rendering:

* **Follower Growth Visualization Matrix:** Smooth multi-line charts tracking follower counts across LinkedIn, X, and Instagram simultaneously on a unified timeline.
* **Engagement Performance Heatmaps:** 52-week contribution grids that display content distribution consistency, mapping posting activity volume to varying color intensities.
* **Cross-Domain Comparison Layouts:** Radar charts mapping the four metric pillars against each other to help users quickly identify execution gaps (such as high technical output paired with low social distribution consistency).

---

## 14. Future Roadmap & Enhancements

* **AI Recommendations Engine:** An integrated inference engine that flags imbalances across the personal growth matrix and suggests corrective actions (e.g., *"Technical output is in the top 5%, but social visibility has dropped 12%—consider scheduling an open-source summary update"*).
* **Predictive Growth Analytics:** Time-series forecast models using historical tracking data to project audience milestones and career visibility metrics up to 90 days in advance.
* **Smart Content Strategy Insights:** Predictive evaluation tools that analyze cross-platform content performance data to pinpoint the best posting times and topic categories for maximum engagement.
* **AI Career Readiness Scoring:** Automated portfolio assessment tools that evaluate GitHub commits and LinkedIn profile metrics against target market trends to generate a real-time employability score.
