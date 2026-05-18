import enum

class UserRole(str, enum.Enum):
    standard_user = "standard_user"
    premium_user = "premium_user"
    system_admin = "system_admin"

class IntegrationPlatform(str, enum.Enum):
    github = "github"
    leetcode = "leetcode"
    linkedin = "linkedin"
    instagram = "instagram"
    twitter = "twitter"
    manual = "manual"

class MetricCategory(str, enum.Enum):
    coding = "coding"
    social = "social"
    career = "career"
    productivity = "productivity"

class SyncStatusType(str, enum.Enum):
    synced = "synced"
    syncing = "syncing"
    stale = "stale"
    failed = "failed"

class JobStatusType(str, enum.Enum):
    queued = "queued"
    running = "running"
    completed = "completed"
    failed = "failed"

class MetricSourceType(str, enum.Enum):
    api_sync = "api_sync"
    manual = "manual"
    csv_import = "csv_import"
    system_generated = "system_generated"

class SecurityEventType(str, enum.Enum):
    login_success = "login_success"
    login_failed = "login_failed"
    token_revoked = "token_revoked"
    password_reset_request = "password_reset_request"
    password_changed = "password_changed"
    account_soft_deleted = "account_soft_deleted"
