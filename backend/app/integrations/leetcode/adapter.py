from typing import Dict, Any, List
from datetime import datetime, timezone

from app.integrations.base import BaseIntegrationAdapter
from app.models.enums import IntegrationPlatform, MetricCategory

class LeetCodeAdapter(BaseIntegrationAdapter):
    """
    Integration adapter for LeetCode GraphQL API.
    """
    def __init__(self, user_id: str):
        super().__init__(user_id=user_id, platform=IntegrationPlatform.leetcode.value)
        
    async def authenticate(self) -> bool:
        # LeetCode typically uses session cookies or public GraphQL
        return True

    async def fetch_delta_metrics(self) -> List[Dict[str, Any]]:
        # Mocking LeetCode recent submissions query
        return [
            {
                "submission_id": "84329104",
                "titleSlug": "two-sum",
                "statusDisplay": "Accepted",
                "difficulty": "Easy",
                "timestamp": datetime.now(timezone.utc).timestamp()
            }
        ]

    async def normalize_payload(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Normalizes LeetCode submission into metric format.
        """
        # Weighting metric value by difficulty
        difficulty = raw_data.get("difficulty", "Easy")
        value = 1.0
        if difficulty == "Medium": value = 2.0
        elif difficulty == "Hard": value = 3.0
        
        return {
            "user_id": self.user_id,
            "source": self.platform,
            "source_record_id": raw_data.get("submission_id"),
            "metric_type": "problem_solved",
            "metric_value": value,
            "metric_metadata": {
                "problem": raw_data.get("titleSlug"),
                "difficulty": difficulty
            },
            "category": MetricCategory.coding.value,
            "recorded_at": datetime.fromtimestamp(raw_data.get("timestamp"), tz=timezone.utc).isoformat()
        }
