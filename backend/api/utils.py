#+-----------------------------------+
#| Created by: fgatto13 @2026-02-10  |
#+-----------------------------------+

# utils.py
import azure.functions as func

def cors_response() -> func.HttpResponse:
    """
    Responds to preflight OPTIONS requests with proper CORS headers.
    """
    headers = {
        "Access-Control-Allow-Origin": "*",  # replace "*" with your frontend URL in production
        "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
    }
    return func.HttpResponse(status_code=200, headers=headers)


def add_cors_headers(response: func.HttpResponse) -> func.HttpResponse:
    """
    Adds CORS headers to all responses.
    """
    response.headers.update({
        "Access-Control-Allow-Origin": "*",  # replace "*" with frontend URL in production
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
    })
    return response
