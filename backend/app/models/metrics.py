from datetime import datetime, timezone, date
from sqlalchemy import Column, String, Numeric, DateTime, ForeignKey, Date
from sqlalchemy.dialects.postgresql import UUID, JSONB, BIGINT
from sqlalchemy.orm import relationship
from app.config.database import Base
from app.models.enums import IntegrationPlatform, MetricCategory, MetricSourceType

class NormalizedMetric(Base):
    """
    Master Time-Series Repository.
    Partitioned by month in the database.
    """
    __tablename__ = "normalized_metrics"

    # In partitioned tables, id and the partition key (recorded_at) form the composite primary key
    id = Column(BIGINT, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    project_id = Column(UUID(as_uuid=True), ForeignKey("projects.id", ondelete="SET NULL"), nullable=True)
    
    source = Column(String, nullable=False) # Maps to IntegrationPlatform
    source_record_id = Column(String(255), nullable=True)
    
    metric_type = Column(String(64), nullable=False)
    metric_value = Column(Numeric(12, 4), nullable=False, default=0.0000)
    metric_metadata = Column(JSONB, default=dict)
    
    category = Column(String, nullable=False) # Maps to MetricCategory
    created_by_source = Column(String, nullable=False, default=MetricSourceType.api_sync.value)
    
    recorded_at = Column(DateTime(timezone=True), primary_key=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class DailyAggregate(Base):
    __tablename__ = "daily_aggregates"

    id = Column(UUID(as_uuid=True), primary_key=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    category = Column(String, nullable=False)
    aggregated_value = Column(Numeric(12, 4), nullable=False, default=0.0000)
    log_date = Column(Date, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
