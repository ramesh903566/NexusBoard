from datetime import datetime, timedelta, timezone
from typing import Any, Union
import jwt
from passlib.context import CryptContext
from pydantic import BaseModel

# In production, these should be loaded from env vars
SECRET_KEY = "NEXUS_BOARD_SUPER_SECRET_KEY_FOR_JWT_GENERATION"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7 # 7 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class TokenPayload(BaseModel):
    sub: str = None
    exp: int = None
    role: str = None

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(subject: Union[str, Any], role: str = "standard_user") -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expire, "sub": str(subject), "role": role}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
