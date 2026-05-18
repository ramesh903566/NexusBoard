# NexusBoard: Hardened PostgreSQL Database Schema

This architectural upgrade moves the database layer from a basic multi-tenant design to a hardened, enterprise-grade **PostgreSQL 16+ production database engine** for **NexusBoard**.

These changes add **time-series table partitioning**, **precomputed cache aggregations**, **idempotence verification fields**, and **write-protected security boundaries** to keep the platform fast, stable, and highly scalable.

---

## 1. System Extensions, Augmented Enums, & Custom Types

This layer adds state-tracking capabilities for background workers, data source tracking, and long-term analytical metric storage.

```sql
-- Core Technical Initialization
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define and Augment System Enums
CREATE TYPE user_role AS ENUM ('standard_user', 'premium_user', 'system_admin');
CREATE TYPE integration_platform AS ENUM ('github', 'leetcode', 'linkedin', 'instagram', 'twitter', 'naukri', 'manual');
CREATE TYPE metric_category AS ENUM ('coding', 'social', 'career', 'productivity');
CREATE TYPE sync_status_type AS ENUM ('synced', 'syncing', 'stale', 'failed');

-- NEW: Advanced Production Automation Enums
CREATE TYPE job_status_type AS ENUM ('queued', 'running', 'completed', 'failed');
CREATE TYPE metric_source_type AS ENUM ('api_sync', 'manual', 'csv_import', 'system_generated');
CREATE TYPE security_event_type AS ENUM ('login_success', 'login_failed', 'token_revoked', 'password_reset_request', 'password_changed', 'account_soft_deleted');
```

---

## 2. Core Identity & Token Lifecycle Management (With Soft Deletes)

This update replaces permanent hard deletes with safe soft deletes and tracks external identity modifications to protect historical metrics from accidental data loss.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'standard_user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL -- Soft delete tracking flag
);

CREATE TABLE connected_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform integration_platform NOT NULL,
    platform_user_id VARCHAR(255) NOT NULL, -- Safeguard: Protects against username changes
    encrypted_access_token TEXT NOT NULL,
    encrypted_refresh_token TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    sync_status sync_status_type NOT NULL DEFAULT 'stale',
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE, -- Identifies unlinked oauth apps instantly
    refresh_failure_count INT NOT NULL DEFAULT 0, -- Automated error circuit breaker threshold
    last_refresh_attempt TIMESTAMP WITH TIME ZONE,
    last_synced_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_platform UNIQUE (user_id, platform)
);
```

---

## 3. High-Velocity Data Layer (Partitioned Time-Series)

Because analytics data grows exponentially over time, the `normalized_metrics` table is partitioned by month using the `recorded_at` timestamp. Floating-point metrics (like social engagement percentages) use the `NUMERIC(12,4)` format, while platform-specific parameters are stored in highly flexible `JSONB` properties.

```sql
-- Project Wrapper Container (Supporting Soft Deletes)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

-- Master Time-Series Repository Partitioned by Month
CREATE TABLE normalized_metrics (
    id BIGSERIAL,
    user_id UUID NOT NULL,
    project_id UUID,
    source integration_platform NOT NULL,
    source_record_id VARCHAR(255), -- Safeguard: Enforces api ingestion idempotency (e.g. Commit SHA)
    metric_type VARCHAR(64) NOT NULL,
    metric_value NUMERIC(12,4) NOT NULL DEFAULT 0.0000, -- Supports engagement, money, scales
    metric_metadata JSONB DEFAULT '{}'::jsonb, -- Flexible payload field for raw platform outputs
    category metric_category NOT NULL,
    created_by_source metric_source_type NOT NULL DEFAULT 'api_sync',
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, recorded_at) -- Partition key must match the database composite primary key
) PARTITION BY RANGE (recorded_at);

-- Core Partition Layout Examples
CREATE TABLE normalized_metrics_y2026m05 PARTITION OF normalized_metrics
    FOR VALUES FROM ('2026-05-01 00:00:00+00') TO ('2026-06-01 00:00:00+00');

CREATE TABLE normalized_metrics_y2026m06 PARTITION OF normalized_metrics
    FOR VALUES FROM ('2026-06-01 00:00:00+00') TO ('2026-07-01 00:00:00+00');
```

---

## 4. Summary Precomputations & Materialized Performance Subsystem

Instead of calculating metrics from raw database rows on every page load, dashboard requests look up precomputed summaries stored in dedicated aggregation tables and high-speed materialized views.

```sql
CREATE TABLE daily_aggregates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category metric_category NOT NULL,
    aggregated_value NUMERIC(12,4) NOT NULL DEFAULT 0.0000,
    log_date DATE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_category_date UNIQUE (user_id, category, log_date)
);

-- Materialized View for Quick Scoring Component Computations
CREATE MATERIALIZED VIEW mv_user_performance_trends AS
SELECT 
    user_id,
    DATE_TRUNC('day', recorded_at)::DATE AS evaluation_date,
    category,
    SUM(metric_value) as raw_score_sum,
    COUNT(id) as transaction_events_count
FROM normalized_metrics
GROUP BY user_id, evaluation_date, category;

-- Index to support concurrent database view refreshes without downtime
CREATE UNIQUE INDEX idx_mv_perf_trends_uid_date 
ON mv_user_performance_trends (user_id, evaluation_date, category);
```

---

## 5. Background Ingestion & Webhook Automation Pipelines

These automation components allow background workers to log scheduling tasks, manage rate limits, and safely buffer external webhooks.

```sql
CREATE TABLE sync_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform integration_platform NOT NULL,
    status job_status_type NOT NULL DEFAULT 'queued',
    retry_count INT NOT NULL DEFAULT 0,
    max_retries INT NOT NULL DEFAULT 5,
    execution_time_ms INT DEFAULT 0,
    error_log TEXT,
    queued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE api_usage_logs (
    id BIGSERIAL PRIMARY KEY,
    platform integration_platform NOT NULL,
    request_type VARCHAR(64) NOT NULL,
    rate_limit_limit INT,
    rate_limit_remaining INT,
    rate_limit_reset_at TIMESTAMP WITH TIME ZONE,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE webhook_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source integration_platform NOT NULL,
    external_delivery_id VARCHAR(255),
    payload JSONB NOT NULL,
    is_processed BOOLEAN DEFAULT FALSE,
    processing_attempts INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. Security Audit & Monitoring Log Infrastructure

This standalone logging table acts as an immutable trace log, recording sensitive profile lifecycle events separate from the core application metrics.

```sql
CREATE TABLE security_audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type security_event_type NOT NULL,
    ip_address_v4_v6 VARCHAR(45),
    client_user_agent TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 7. Performance Optimizations & Relational Indexing Matrix

```sql
-- Index to locate identical source rows and prevent double-ingestion errors
CREATE INDEX idx_metrics_idempotency_lookup 
ON normalized_metrics (source, source_record_id) 
WHERE source_record_id IS NOT NULL;

-- Index to optimize dashboard analytics charts
CREATE INDEX idx_metrics_composite_timeline 
ON normalized_metrics (user_id, category, recorded_at DESC);

-- Partial index for active account sync workers
CREATE INDEX idx_accounts_active_refresh 
ON connected_accounts (token_expires_at ASC) 
WHERE is_revoked = FALSE;
```

---

## 8. Hardened Write-Protected Row-Level Security (RLS) Policies

This setup extends Row-Level Security rules by adding explicit `WITH CHECK` conditions. This step provides comprehensive protection by validating incoming write requests alongside standard read filtering rules.

```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE normalized_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE connected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_aggregates ENABLE ROW LEVEL SECURITY;

-- 1. Projects Security Management Policies
CREATE POLICY projects_security_perimeter ON projects
    FOR ALL
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
    WITH CHECK (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid);

-- 2. Normalized Metrics Time-Series Access Control Rules
CREATE POLICY metrics_security_perimeter ON normalized_metrics
    FOR ALL
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
    WITH CHECK (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid);

-- 3. Connected Third-Party Authorization Key Enforcements
CREATE POLICY accounts_security_perimeter ON connected_accounts
    FOR ALL
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
    WITH CHECK (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid);

-- 4. Precalculated Aggregated Interface Summaries Ingress
CREATE POLICY aggregation_security_perimeter ON daily_aggregates
    FOR ALL
    USING (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid)
    WITH CHECK (user_id = NULLIF(current_setting('app.current_user_id', true), '')::uuid);
```
