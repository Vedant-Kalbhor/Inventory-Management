const express = require("express");
const axios = require("axios");

const router = express.Router();

const ML_SERVICE_URL = "http://localhost:8001";

router.get("/health", async (req, res) => {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/health`);
    res.json({
      backend: "ok",
      mlService: response.data,
    });
  } catch (error) {
    res.status(500).json({
      backend: "ok",
      mlService: "down",
      error: error.message,
    });
  }
});

module.exports = router;
