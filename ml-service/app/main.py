from fastapi import FastAPI, HTTPException
from app.schemas import ForecastRequest, ForecastResponse
from app.models.arima_model import run_arima_forecast

app = FastAPI(title="Inventory ML Service")

@app.post("/forecast", response_model=ForecastResponse)
def forecast_demand(req: ForecastRequest):
    try:
        forecast = run_arima_forecast(req.sales, req.horizon)
        return {
            "forecast": forecast,
            "model": "ARIMA"
        }
    except Exception as e:
        
        raise HTTPException(status_code=400, detail=str(e))
