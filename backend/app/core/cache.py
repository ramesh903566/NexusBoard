import json
import redis.asyncio as redis
import os

REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

# Async Redis client for FastAPI usage
redis_client = redis.from_url(REDIS_URL, decode_responses=True)

async def get_cached_dashboard(key: str):
    """
    Reads precomputed dashboard data from Redis Cache.
    Loads in < 200ms per Phase 4 spec.
    """
    data = await redis_client.get(f"nexusboard:cache:{key}")
    if data:
        return json.loads(data)
    return None

async def set_cached_dashboard(key: str, data: dict, ttl: int = 3600):
    """
    Precomputes the dashboard view and stores it in Redis.
    """
    await redis_client.setex(
        f"nexusboard:cache:{key}",
        ttl,
        json.dumps(data)
    )

async def invalidate_dashboard_cache():
    """
    Fires the CACHE_INVALIDATED event, wiping out old dashboard entries
    inside the Redis Cache Layer so fresh data can take its place (Phase 3).
    """
    # Simple pattern matching to clear all dashboard caches
    keys = await redis_client.keys("nexusboard:cache:*")
    if keys:
        await redis_client.delete(*keys)
