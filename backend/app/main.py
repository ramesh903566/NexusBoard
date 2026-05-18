from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.api.v1 import dashboard, social, career
from app.api.routers import auth

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Phase 2 architecture utilizes external Celery Beat heartbeat daemon
    # rather than inline APScheduler to prevent thread blocking
    yield

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
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["dashboard"])
app.include_router(social.router, prefix=f"{settings.API_V1_STR}/social", tags=["social"])
app.include_router(career.router, prefix=f"{settings.API_V1_STR}/career", tags=["career"])

@app.get("/")
async def root():
    return {"message": "Welcome to NexusBoard API", "version": settings.VERSION}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
