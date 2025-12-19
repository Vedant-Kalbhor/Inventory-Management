from fastapi import FastAPI, HTTPException
from app.config import APP_NAME, APP_VERSION
from app.health import router as health_router
from app.schemas import ForecastRequest, ForecastResponse
from app.models.arima_model import run_arima_forecast
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
    
@app.post("/forecast",response_model=ForecastResponse)
def forecast_demand(req:ForecastRequest):
    try:
        forecast=run_arima_forecast(req.sales,req.horizon)
        return{
            "forecast":forecast,
            "model":"ARIMA"
        }
    except Exception as e:
        raise HTTPException(status_code=400,detail=str(e))