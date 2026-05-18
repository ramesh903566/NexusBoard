from apscheduler.schedulers.asyncio import AsyncIOScheduler
import logging
from app.integrations.github.adapter import GitHubAdapter
from app.integrations.linkedin.adapter import LinkedInAdapter
from app.integrations.leetcode.adapter import LeetCodeAdapter

logger = logging.getLogger(__name__)

# Initialize the scheduler
scheduler = AsyncIOScheduler()

async def dummy_sync_job(platform: str):
    """
    Placeholder for actual sync job.
    """
    logger.info(f"Running background sync for platform: {platform}")
    
    # In production, we'd loop over active users. For now, mock a specific user.
    mock_user_id = "00000000-0000-0000-0000-000000000001"
    
    try:
        if platform == "github":
            adapter = GitHubAdapter(user_id=mock_user_id)
        elif platform == "linkedin":
            adapter = LinkedInAdapter(user_id=mock_user_id)
        elif platform == "leetcode":
            adapter = LeetCodeAdapter(user_id=mock_user_id)
        else:
            return
            
        metrics = await adapter.execute_sync()
        logger.info(f"[{platform}] Sync completed. Normalized metrics generated: {len(metrics)}")
        # Next step: persist metrics using SQLAlchemy session
        
    except Exception as e:
        logger.error(f"Sync failed for {platform}: {str(e)}")

def start_scheduler():
    """
    Bootstraps the APScheduler instance with the required platform sync intervals.
    """
    if not scheduler.running:
        # Example schedule mappings based on rate limits and needs
        scheduler.add_job(dummy_sync_job, 'interval', minutes=15, args=["linkedin"], id="linkedin_sync", replace_existing=True)
        scheduler.add_job(dummy_sync_job, 'interval', minutes=15, args=["leetcode"], id="leetcode_sync", replace_existing=True)
        scheduler.add_job(dummy_sync_job, 'interval', minutes=30, args=["github"], id="github_sync", replace_existing=True)
        
        scheduler.start()
        logger.info("Background synchronization engine started.")

def stop_scheduler():
    """Graceful shutdown for the scheduler."""
    if scheduler.running:
        scheduler.shutdown()
        logger.info("Background synchronization engine stopped.")
