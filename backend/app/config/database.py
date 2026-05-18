from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config.settings import settings

# Make sure to use the asyncpg driver for PostgreSQL
# Replace standard postgresql:// with postgresql+asyncpg:// if needed
# We'll handle this transformation dynamically
DATABASE_URL = settings.DATABASE_URL
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    future=True,
    pool_size=5,
    max_overflow=10
)

async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    """
    Dependency function that yields database sessions for FastAPI routes
    """
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()
