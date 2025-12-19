const axios = require("axios");
const SalesHistory = require("../models/SalesHistory");
const DemandForecast = require("../models/DemandForecast");

const ML_SERVICE_URL = "http://localhost:8001";

const generateForecast = async (req, res) => {
  try {
    const { productId, horizon } = req.body;

    if (!productId || !horizon) {
      return res.status(400).json({
        error: "productId and horizon are required",
      });
    }

    const sales = await SalesHistory.find({ productId }).sort({ date: 1 });

    if (sales.length < 5) {
      return res.status(400).json({
        error: "Not enough sales data for forecasting (minimum 5 required)",
      });
    }

    const salesValues = sales.map((s) => s.quantitySold);

    const mlResponse = await axios.post(`${ML_SERVICE_URL}/forecast`, {
      sales: salesValues,
      horizon,
    });

    const forecastDoc = await DemandForecast.create({
      productId,
      forecastHorizonDays: horizon,
      forecastValues: mlResponse.data.forecast,
      model: mlResponse.data.model || "ARIMA",
    });

    return res.status(200).json({
      message: "Forecast generated successfully",
      forecast: forecastDoc,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  generateForecast,
};
