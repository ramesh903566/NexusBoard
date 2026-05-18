import asyncio
from app.worker import celery_app
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

@celery_app.task(
    bind=True,
    max_retries=5,
    # Exponential backoff: 60s, 120s, 240s, etc.
    retry_backoff=True,
    retry_backoff_max=3600,
    retry_jitter=True
)
def sync_all_platforms(self):
    """
    Celery task representing the Delta Sync.
    If we hit a 429 Rate Limit, we trigger self.retry() which implements
    the exponential backoff logic as defined in Phase 2.
    """
    try:
        logger.info("Initiating background sync for all platforms...")
        
        # Simulate fetching last_synced_timestamp and grabbing API Deltas
        # If rate limit is hit, we would do:
        # raise Exception("429 Too Many Requests")
        
        logger.info("Sync completed successfully. Normalization pipeline executed.")
        
        # Following Phase 3: trigger cache invalidation
        from app.core.cache import invalidate_dashboard_cache
        # We need an event loop to run the async invalidation function from a sync celery context
        loop = asyncio.get_event_loop()
        loop.run_until_complete(invalidate_dashboard_cache())
        
        return "Sync Success"

    except Exception as exc:
        logger.warning(f"Sync failed, triggering exponential backoff. Error: {exc}")
        # Transition dashboard sync badge to 'failed' in DB here
        raise self.retry(exc=exc)
