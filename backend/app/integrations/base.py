from abc import ABC, abstractmethod
from typing import Dict, Any, List

class BaseIntegrationAdapter(ABC):
    """
    Abstract Base Class for all external platform connectors.
    Provides the standard interface expected by the background scheduler.
    """
    
    def __init__(self, user_id: str, platform: str):
        self.user_id = user_id
        self.platform = platform

    @abstractmethod
    async def authenticate(self) -> bool:
        """
        Verify current credentials or execute an automatic token refresh cycle
        if expiration is within the 30-minute high-watermark.
        """
        pass

    @abstractmethod
    async def fetch_delta_metrics(self) -> List[Dict[str, Any]]:
        """
        Query the external platform for new changes since the last sync.
        Return raw payloads to be normalized.
        """
        pass

    @abstractmethod
    async def normalize_payload(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Convert raw platform data into the standard NormalizedMetric shape.
        """
        pass

    async def execute_sync(self):
        """
        Standardized pipeline for the scheduler.
        1. Authenticate/Refresh Token
        2. Fetch Deltas
        3. Normalize
        4. (Yields result to Database Layer)
        """
        is_authenticated = await self.authenticate()
        if not is_authenticated:
            raise PermissionError(f"Authentication failed for {self.platform} for user {self.user_id}")
            
        raw_items = await self.fetch_delta_metrics()
        normalized_items = [await self.normalize_payload(item) for item in raw_items]
        return normalized_items
