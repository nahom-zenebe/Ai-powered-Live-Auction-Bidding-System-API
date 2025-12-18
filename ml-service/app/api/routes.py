from fastapi import APIRouter
from app.schemas.predict import PredictRequest, PredictResponse
from app.services.inference import load_model, predict

router = APIRouter()

@router.on_event("startup")
def startup_event():
    load_model()

@router.post("/predict", response_model=PredictResponse)
def predict_api(data: PredictRequest):
    result = predict(data.features)
    return {"prediction": result}
