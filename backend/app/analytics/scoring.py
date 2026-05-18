import logging
from typing import Dict

logger = logging.getLogger(__name__)

class UnifiedScoringEngine:
    """
    Implements the TDR section 6 math:
    Unified Score = (Coding + Productivity + Social + Career) / 4
    """
    
    @staticmethod
    def calculate_unified_score(pillar_scores: Dict[str, float]) -> float:
        """
        Calculates the normalized unified score based on 4 pillar indices.
        Each pillar score must be pre-normalized between 0 and 100.
        """
        coding = pillar_scores.get("coding", 0.0)
        productivity = pillar_scores.get("productivity", 0.0)
        social = pillar_scores.get("social", 0.0)
        career = pillar_scores.get("career", 0.0)
        
        # Ensure values are capped between 0 and 100
        coding = max(0.0, min(100.0, coding))
        productivity = max(0.0, min(100.0, productivity))
        social = max(0.0, min(100.0, social))
        career = max(0.0, min(100.0, career))
        
        unified_score = (coding + productivity + social + career) / 4.0
        
        logger.debug(f"Calculated Unified Score: {unified_score:.2f}")
        return round(unified_score, 2)
        
    @staticmethod
    def calculate_moving_average(scores: list[float], window: int = 7) -> float:
        """
        Calculates moving average.
        """
        if not scores:
            return 0.0
        
        recent_scores = scores[-window:] if len(scores) >= window else scores
        average = sum(recent_scores) / len(recent_scores)
        return round(average, 2)
