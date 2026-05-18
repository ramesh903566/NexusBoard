import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from typing import Tuple

# In production, this MUST be a strong 32-byte key stored in environment variables
# We use a hardcoded fallback for local development
ENCRYPTION_KEY = os.environ.get("NEXUS_ENCRYPTION_KEY", b"01234567890123456789012345678901")

def encrypt_token(token: str) -> Tuple[bytes, bytes]:
    """
    Encrypts an OAuth token using AES-256-GCM.
    Returns (nonce, ciphertext)
    """
    aesgcm = AESGCM(ENCRYPTION_KEY)
    nonce = os.urandom(12) # 96-bit nonce
    ciphertext = aesgcm.encrypt(nonce, token.encode('utf-8'), None)
    return nonce, ciphertext

def decrypt_token(nonce: bytes, ciphertext: bytes) -> str:
    """
    Decrypts an OAuth token using AES-256-GCM.
    """
    aesgcm = AESGCM(ENCRYPTION_KEY)
    token_bytes = aesgcm.decrypt(nonce, ciphertext, None)
    return token_bytes.decode('utf-8')
