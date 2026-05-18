from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm
from typing import Any
import uuid

from app.core.security import create_access_token
from app.models.enums import UserRole

router = APIRouter()

@router.post("/login")
async def login_access_token(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login. Drops an HttpOnly, Secure JWT cookie.
    """
    if form_data.username == "error":
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    user_id = str(uuid.uuid4())
    
    access_token = create_access_token(
        subject=user_id,
        role=UserRole.standard_user.value
    )
    
    is_new_user = form_data.username == "newuser"
    
    # Set the JWT as an HttpOnly, Secure cookie
    response.set_cookie(
        key="nexus_session",
        value=access_token,
        httponly=True,
        secure=True,     # In production, requires HTTPS
        samesite="lax",
        max_age=60 * 60 * 24 * 7 # 7 days
    )
    
    # Optional metadata cookie for the frontend (not HttpOnly)
    response.set_cookie(
        key="is_new_user",
        value="true" if is_new_user else "false",
        httponly=False,
        secure=True,
        samesite="lax",
        max_age=60 * 60 * 24 * 7
    )
    
    response.set_cookie(
        key="auth_status",
        value="authenticated",
        httponly=False,
        secure=True,
        samesite="lax",
        max_age=60 * 60 * 24 * 7
    )
    
    return {
        "status": "success",
        "message": "Authenticated successfully",
        "is_new_user": is_new_user
    }
