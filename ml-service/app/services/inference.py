import joblib
import os

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "../models/model.joblib"
)

model = None

def load_model():
    global model
    if model is None:
        model = joblib.load(MODEL_PATH)

def predict(features: list[float]):
    if model is None:
        load_model()
    return model.predict([features]).tolist()
