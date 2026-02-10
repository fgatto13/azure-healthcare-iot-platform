#+-----------------------------------+
#| Created by: fgatto13 @2026-02-10  |
#+-----------------------------------+
# auth.py
import logging
import jwt  # PyJWT, used to decode Entra ID JWTs

def parse_jwt(token: str) -> dict:
    """
    Parse JWT token and return claims.
    """
    try:
        # Note: For real use, verify signature and issuer!
        return jwt.decode(token, options={"verify_signature": False})
    except Exception as e:
        logging.error(f"Failed to parse JWT: {e}")
        return {}


def log_auth_header(header: str):
    """
    Debugging helper to log the Authorization header.
    """
    logging.info(f"Authorization header: {header}")
