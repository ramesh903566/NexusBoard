import httpx
from typing import Dict, Any, List
from app.integrations.base import BaseIntegrationAdapter

class GitHubPublicAdapter(BaseIntegrationAdapter):
    """
    Guarantees that only public, non-sensitive data vectors 
    are requested from the external platform graph. Minimum OAuth scope `read:user`.
    """
    
    async def authenticate(self) -> bool:
        # For public analytics via username, full OAuth token isn't strictly required
        # but if we have it, it's scoped only to public data.
        return True
        
    async def fetch_delta_metrics(self) -> List[Dict[str, Any]]:
        # Implemented for standard sync loop
        return []

    async def normalize_payload(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        return raw_data

    async def fetch_public_analytics(self, platform_user_id: str) -> Dict[str, Any]:
        """
        Pulls public data from the unauthenticated/low-scope public endpoint boundary.
        """
        api_url = f"https://api.github.com/users/{platform_user_id}"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(api_url)
            
            if response.status_code == 200:
                user_data = response.json()
                return {
                    "source": "github",
                    "metric_type": "public_repos_count",
                    "metric_value": user_data.get("public_repos", 0),
                    "category": "coding"
                }
            return {"status": "failed", "error": "Profile not public or found"}
