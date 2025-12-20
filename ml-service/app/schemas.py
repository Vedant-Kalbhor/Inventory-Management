from pydantic import BaseModel
from typing import List

class ForecastRequest(BaseModel):
    sales: List[int]
    horizon: int

class ForecastResponse(BaseModel):
    forecast: List[float]   #ARIMA returns floats
    model: str
