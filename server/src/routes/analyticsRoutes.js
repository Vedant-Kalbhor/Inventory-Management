const express = require("express");
const axios = require("axios");
const { generateForecast } = require("../controllers/forecastController");
const { optimizeInventory } = require("../controllers/optimizationController");

const router = express.Router();
const ML_SERVICE_URL = "http://localhost:8001";

router.get("/health", async (req, res) => {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/health`);
    return res.status(200).json({
      backend: "ok",
      mlService: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      backend: "ok",
      mlService: "down",
      error: error.message,
    });
  }
});

router.post("/forecast", generateForecast);
router.post("/optimize", optimizeInventory);

module.exports = router;
