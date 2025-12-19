import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

def run_arima_forecast(sales, horizon):
    """
    sales: historical demand values
    horizon: future periods
    """
    if len(sales) < 5:
        raise ValueError("At least 5 data points required for ARIMA")

    series = pd.Series(sales)
    model = ARIMA(series, order=(1, 1, 1))
    model_fit = model.fit()

    forecast = model_fit.forecast(steps=horizon)
    return forecast.tolist()
