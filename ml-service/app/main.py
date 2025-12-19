from fastapi import FastAPI
from app.config import APP_NAME,APP_VERSION
from app.health import router as health_router

app= FastAPI(
    title=APP_NAME,
    version=APP_VERSION
)

app.include_router(health_router)

@app.get("/")
def root():
    return{
        "message":"ML Service is running.."
    }