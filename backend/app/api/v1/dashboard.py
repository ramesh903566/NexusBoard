from fastapi import APIRouter, Depends
from datetime import datetime, timezone, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc

from app.config.database import get_db
from app.models.metrics import NormalizedMetric, DailyAggregate
from app.core.security import TokenPayload
from app.api.dependencies import get_current_user_token
from app.core.cache import get_cached_dashboard, set_cached_dashboard

router = APIRouter()

@router.get("/overview")
async def get_overview_data(
    db: AsyncSession = Depends(get_db),
    # Optional token, if not provided we just return dummy for now to keep UI working during dev
    # token: TokenPayload = Depends(get_current_user_token)
):
    """
    Returns the Unified Score Matrix data. Reads from DailyAggregate.
    Implements Phase 4: Cache-First Render
    """
    cached = await get_cached_dashboard("overview")
    if cached:
        return cached

    # Attempt to query real data for the last 7 days
    stmt = select(DailyAggregate).order_by(desc(DailyAggregate.log_date)).limit(4)
    result = await db.execute(stmt)
    aggregates = result.scalars().all()
    
    if not aggregates:
        # Fallback to dummy data if DB is empty
        dummy_data = {
            "score": 84.2,
            "chartData": [
                { "subject": 'Coding', "A": 88, "fullMark": 100 },
                { "subject": 'Productivity', "A": 92, "fullMark": 100 },
                { "subject": 'Social', "A": 65, "fullMark": 100 },
                { "subject": 'Career', "A": 78, "fullMark": 100 },
            ],
            "status": "synced"
        }
        await set_cached_dashboard("overview", dummy_data)
        return dummy_data
        
    # If we had real data, we'd map it here...
    real_data = {"score": 0, "chartData": [], "status": "synced"}
    await set_cached_dashboard("overview", real_data)
    return real_data


@router.get("/productivity")
async def get_productivity_metrics(db: AsyncSession = Depends(get_db)):
    """
    Returns Time-Series data for Productivity. Reads from NormalizedMetric.
    """
    stmt = select(
        func.date_trunc('day', NormalizedMetric.recorded_at).label('day'),
        func.sum(NormalizedMetric.metric_value).label('total_hours')
    ).where(
        NormalizedMetric.category == "productivity"
    ).group_by(
        func.date_trunc('day', NormalizedMetric.recorded_at)
    ).order_by(desc('day')).limit(7)
    
    result = await db.execute(stmt)
    rows = result.all()
    
    if not rows:
        return [
            { "date": "May 1", "hours": 4.5 },
            { "date": "May 2", "hours": 6.2 },
            { "date": "May 3", "hours": 5.8 },
            { "date": "May 4", "hours": 7.1 },
            { "date": "May 5", "hours": 3.5 },
            { "date": "May 6", "hours": 8.4 },
            { "date": "May 7", "hours": 6.9 },
        ]
        
    return [{"date": row.day.strftime("%b %d"), "hours": float(row.total_hours)} for row in reversed(rows)]


@router.get("/network")
async def get_network_metrics(db: AsyncSession = Depends(get_db)):
    """
    Returns Dual-Axis data for Network Hub. Reads from NormalizedMetric.
    """
    stmt = select(NormalizedMetric).where(NormalizedMetric.category == "social").order_by(desc(NormalizedMetric.recorded_at)).limit(7)
    result = await db.execute(stmt)
    metrics = result.scalars().all()
    
    if not metrics:
        return [
            { "date": "May 1", "followers": 5120, "impressions": 840 },
            { "date": "May 2", "followers": 5135, "impressions": 920 },
            { "date": "May 3", "followers": 5140, "impressions": 780 },
            { "date": "May 4", "followers": 5180, "impressions": 1200 },
            { "date": "May 5", "followers": 5195, "impressions": 1450 },
            { "date": "May 6", "followers": 5200, "impressions": 1100 },
            { "date": "May 7", "followers": 5212, "impressions": 1050 },
        ]
        
    # Real mapping would go here
    return []
