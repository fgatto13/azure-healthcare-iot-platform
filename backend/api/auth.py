#+-----------------------------------+
#| Created by: fgatto13 @2026-02-10  |
#+-----------------------------------+
import os
import logging
import jwt
from jwt import PyJWKClient, InvalidTokenError, ExpiredSignatureError

TENANT_ID = os.environ["TENANT_ID"]
CLIENT_ID = os.environ["CLIENT_ID"]  # backend API app id

def validate_jwt(token: str) -> dict:
    """
    Validates an Entra ID JWT using PyJWKClient.
    Returns claims dict if valid, raises ValueError if invalid.
    """
    try:
        jwks_url = f"https://login.microsoftonline.com/{TENANT_ID}/discovery/v2.0/keys"
        issuer_url = f"https://login.microsoftonline.com/{TENANT_ID}/v2.0"
        audience = f"api://{CLIENT_ID}"

        jwks_client = PyJWKClient(jwks_url)
        signing_key = jwks_client.get_signing_key_from_jwt(token)

        claims = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            audience=audience,
            issuer=issuer_url,
        )

        return claims

    except ExpiredSignatureError:
        logging.warning("JWT expired")
        raise ValueError("Token expired")
    except InvalidTokenError as e:
        logging.warning(f"JWT invalid: {e}")
        raise ValueError("Unauthorized")
