import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

def run_arima_forecast(sales, horizon):
    # 1️ Basic validations
    if not isinstance(sales, list) or len(sales) < 5:
        raise ValueError("At least 5 historical data points are required")

    if horizon <= 0:
        raise ValueError("Forecast horizon must be >= 1")

    # 2 Convert to numeric series
    series = pd.Series(sales, dtype="float")

    # 3️ ARIMA model
    model = ARIMA(series, order=(1, 1, 1))
    model_fit = model.fit()

    # 4️ Forecast
    forecast = model_fit.forecast(steps=horizon)

    return [float(x) for x in forecast]
