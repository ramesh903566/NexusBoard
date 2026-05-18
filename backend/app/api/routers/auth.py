from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Any
import uuid

from app.core.security import create_access_token
from app.models.enums import UserRole

router = APIRouter()

@router.post("/login")
async def login_access_token(
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    For Phase 2, this is mocked to always succeed and return a token for testing.
    In real usage, we'd query SQLAlchemy for the user by email (form_data.username).
    """
    # MOCK DB VALIDATION:
    if form_data.username == "error":
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    # Generate a dummy user ID for now
    user_id = str(uuid.uuid4())
    
    access_token = create_access_token(
        subject=user_id,
        role=UserRole.standard_user.value
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "is_new_user": form_data.username == "newuser" # Simulate new user flag
    }
