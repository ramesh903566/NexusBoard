from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.api.v1 import dashboard, social, career

from contextlib import asynccontextmanager
from app.scheduler.engine import start_scheduler, stop_scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    start_scheduler()
    yield
    # Shutdown
    stop_scheduler()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Set up CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["dashboard"])
app.include_router(social.router, prefix=f"{settings.API_V1_STR}/social", tags=["social"])
app.include_router(career.router, prefix=f"{settings.API_V1_STR}/career", tags=["career"])

@app.get("/")
async def root():
    return {"message": "Welcome to NexusBoard API", "version": settings.VERSION}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
