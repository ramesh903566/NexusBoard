import os
from celery import Celery
from celery.schedules import crontab

# In production, use environment variables for Redis URL
REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "nexusboard_worker",
    broker=REDIS_URL,
    backend=REDIS_URL,
    include=["app.tasks.sync"]
)

# Optional configurations
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    # Celery Beat Heartbeat Schedule (Phase 2 requirement)
    beat_schedule={
        "sync-every-15-minutes": {
            "task": "app.tasks.sync.sync_all_platforms",
            "schedule": crontab(minute="*/15"),
        },
    }
)
