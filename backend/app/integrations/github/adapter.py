from typing import Dict, Any, List
from datetime import datetime, timezone
import httpx

from app.integrations.base import BaseIntegrationAdapter
from app.models.enums import IntegrationPlatform, MetricCategory

class GitHubAdapter(BaseIntegrationAdapter):
    """
    Integration adapter for GitHub API (GraphQL/REST).
    """
    def __init__(self, user_id: str):
        super().__init__(user_id=user_id, platform=IntegrationPlatform.github.value)
        self.base_url = "https://api.github.com"
        
    async def authenticate(self) -> bool:
        # Placeholder for OAuth token lookup and validation/refresh
        # In a real scenario, this would query the connected_accounts table
        return True

    async def fetch_delta_metrics(self) -> List[Dict[str, Any]]:
        # Placeholder for hitting GitHub API to fetch commits since last sync
        # Returning mock payloads representing commits
        return [
            {
                "sha": "a1b2c3d4",
                "commit": {"message": "feat: initial commit"},
                "stats": {"additions": 104, "deletions": 12},
                "date": datetime.now(timezone.utc).isoformat()
            }
        ]

    async def normalize_payload(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Normalizes a GitHub commit payload into the standard metric format.
        """
        return {
            "user_id": self.user_id,
            "source": self.platform,
            "source_record_id": raw_data.get("sha"),
            "metric_type": "commit",
            "metric_value": 1.0, # 1 commit
            "metric_metadata": {
                "additions": raw_data.get("stats", {}).get("additions", 0),
                "deletions": raw_data.get("stats", {}).get("deletions", 0)
            },
            "category": MetricCategory.coding.value,
            "recorded_at": raw_data.get("date")
        }
