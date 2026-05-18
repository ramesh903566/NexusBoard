from typing import Dict, Any, List
from datetime import datetime, timezone

from app.integrations.base import BaseIntegrationAdapter
from app.models.enums import IntegrationPlatform, MetricCategory

class LinkedInAdapter(BaseIntegrationAdapter):
    """
    Integration adapter for LinkedIn API.
    """
    def __init__(self, user_id: str):
        super().__init__(user_id=user_id, platform=IntegrationPlatform.linkedin.value)
        
    async def authenticate(self) -> bool:
        # Placeholder for OAuth token validation/refresh
        return True

    async def fetch_delta_metrics(self) -> List[Dict[str, Any]]:
        # Mocking LinkedIn profile insights
        return [
            {
                "insight_id": f"li_stats_{datetime.now(timezone.utc).date()}",
                "followers_count": 5200,
                "profile_views": 124,
                "post_impressions": 840,
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
        ]

    async def normalize_payload(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Normalizes LinkedIn insights into metric format.
        """
        return {
            "user_id": self.user_id,
            "source": self.platform,
            "source_record_id": raw_data.get("insight_id"),
            "metric_type": "audience_insight",
            "metric_value": float(raw_data.get("followers_count", 0)),
            "metric_metadata": {
                "profile_views": raw_data.get("profile_views"),
                "post_impressions": raw_data.get("post_impressions")
            },
            "category": MetricCategory.social.value,
            "recorded_at": raw_data.get("timestamp")
        }
