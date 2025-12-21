from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

# Load the model
model = joblib.load('auction_model.pkl')

app = FastAPI()

class BidData(BaseModel):
    features: list[float]

@app.post("/predict")
def predict_win(data: BidData):
    try:
        # 1. Convert to 2D numpy array
        input_array = np.array(data.features).reshape(1, -1)
        
        # 2. Get the hard prediction (0 or 1)
        prediction = model.predict(input_array)[0]
        
        # 3. Get the probabilities
        # predict_proba returns [[prob_0, prob_1]]
        probabilities = model.predict_proba(input_array)[0]
        
        prob_loss = round(probabilities[0], 4)
        prob_win = round(probabilities[1], 4)

        return {
            "target": int(prediction),
            "probability": {
                "loss": prob_loss,
                "win": prob_win
            },
            "status": "success"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)