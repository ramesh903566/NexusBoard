from fastapi import Depends, HTTPException, status, Request
import jwt

from app.core.security import SECRET_KEY, ALGORITHM, TokenPayload

async def get_current_user_token(request: Request) -> TokenPayload:
    """
    Validates the JWT token from the HttpOnly cookie and returns the payload.
    Raises 401 if invalid or expired.
    """
    token = request.cookies.get("nexus_session")
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    
    if not token:
        raise credentials_exception
        
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        token_data = TokenPayload(**payload)
        
        if token_data.sub is None:
            raise credentials_exception
            
        return token_data
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
        )
    except jwt.InvalidTokenError:
        raise credentials_exception
