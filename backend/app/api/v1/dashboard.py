from fastapi import APIRouter
from datetime import datetime, timezone
import asyncio

router = APIRouter()

@router.get("/overview")
async def get_overview_data():
    """
    Returns the Unified Score Matrix data for the Overview dashboard.
    """
    await asyncio.sleep(1) # Simulate DB latency
    return {
        "score": 84.2,
        "chartData": [
            { "subject": 'Coding', "A": 88, "fullMark": 100 },
            { "subject": 'Productivity', "A": 92, "fullMark": 100 },
            { "subject": 'Social', "A": 65, "fullMark": 100 },
            { "subject": 'Career', "A": 78, "fullMark": 100 },
        ],
        "status": "synced"
    }

@router.get("/productivity")
async def get_productivity_metrics():
    """
    Returns the Time-Series data for the Productivity deep work chart.
    """
    await asyncio.sleep(1)
    return [
        { "date": "May 1", "hours": 4.5 },
        { "date": "May 2", "hours": 6.2 },
        { "date": "May 3", "hours": 5.8 },
        { "date": "May 4", "hours": 7.1 },
        { "date": "May 5", "hours": 3.5 },
        { "date": "May 6", "hours": 8.4 },
        { "date": "May 7", "hours": 6.9 },
    ]

@router.get("/network")
async def get_network_metrics():
    """
    Returns the Dual-Axis data for the Network Hub audience growth chart.
    """
    await asyncio.sleep(1)
    return [
        { "date": "May 1", "followers": 5120, "impressions": 840 },
        { "date": "May 2", "followers": 5135, "impressions": 920 },
        { "date": "May 3", "followers": 5140, "impressions": 780 },
        { "date": "May 4", "followers": 5180, "impressions": 1200 },
        { "date": "May 5", "followers": 5195, "impressions": 1450 },
        { "date": "May 6", "followers": 5200, "impressions": 1100 },
        { "date": "May 7", "followers": 5212, "impressions": 1050 },
    ]
