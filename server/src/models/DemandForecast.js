const mongoose = require("mongoose");

const DemandForecastSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    forecastHorizonDays: {
      type: Number,
      required: true,
    },
    forecastValues: {
      type: [Number],
      required: true,
    },
    model: {
      type: String,
      default: "ARIMA",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DemandForecast", DemandForecastSchema);
