from fastapi import FastAPI
from app.api.routes import router



app = FastAPI(title="ML Bid preidcation")

app.include_router(router)

@app.get("/")
def health():
    return {"status": "ok"}
