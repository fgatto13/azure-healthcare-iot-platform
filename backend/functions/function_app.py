import azure.functions as func
import logging
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="patients/{patient_id}", methods=["GET"])
def get_patient(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('get_patient endpoint called')

    # now let's retrieve the patient id from the request
    patient_id = req.route_params.get("patient_id")

    if not patient_id:
        return func.HttpResponse(
            "Missing patient_id",
            status_code=400
        )

    # Placeholder for Entra ID token validation:
    # - it'll extract auth header
    # - validate JWT
    # - check role

    # template for the patient from FHIR call
    patient_data = {
        "resourceType": "Patient",
        "id": patient_id,
        "name": [
            {
                "family": "Rossi",
                "given": ["Mario"]
            }
        ],
        "gender": "male",
        "birthDate": "1980-01-01"
    }

    return func.HttpResponse(
        body=json.dumps(patient_data),
        status_code=200,
        mimetype="application/json"
    )
