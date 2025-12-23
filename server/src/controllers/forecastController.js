const axios = require("axios");
const mongoose = require("mongoose");
const SalesHistory = require("../models/SalesHistory");
const DemandForecast = require("../models/DemandForecast");

const ML_SERVICE_URL = "http://localhost:8000";

const generateForecast = async (req, res) => {
  try {
    const { productId, horizon } = req.body;

    // 1️⃣ Basic validation
    if (!productId || !horizon) {
      return res.status(400).json({
        error: "productId and horizon are required",
      });
    }

    // 2️⃣ ObjectId validation (CRITICAL FIX)
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        error: "Invalid productId format",
      });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);

    // 3️⃣ Fetch sales history
    const sales = await SalesHistory.find({
      productId: productObjectId,
    }).sort({ date: 1 });

    if (sales.length < 5) {
      return res.status(400).json({
        error: "Not enough sales data for forecasting (minimum 5 required)",
      });
    }

    const salesValues = sales.map((s) => s.quantitySold);

    // 4️⃣ Call ML service
    let mlResponse;
    try {
      mlResponse = await axios.post(`${ML_SERVICE_URL}/forecast`, {
        sales: salesValues,
        horizon,
      });
    } catch (mlError) {
      return res.status(500).json({
        error: "ML service error",
        details: mlError.response?.data || mlError.message,
      });
    }

    // 5️⃣ Save forecast
    const forecastDoc = await DemandForecast.create({
      productId: productObjectId,
      forecastHorizonDays: horizon,
      forecastValues: mlResponse.data.forecast,
      model: mlResponse.data.model || "ARIMA",
    });

    return res.status(200).json({
      message: "Forecast generated successfully",
      forecast: forecastDoc,
    });
  } catch (error) {
    console.error("Forecast Error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = {
  generateForecast,
};
