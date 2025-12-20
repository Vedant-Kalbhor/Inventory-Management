const mongoose = require("mongoose");

const InventoryOptimizationSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    annualDemand: {
      type: Number,
      required: true,
    },
    eoq: {
      type: Number,
      required: true,
    },
    safetyStock: {
      type: Number,
      required: true,
    },
    reorderPoint: {
      type: Number,
      required: true,
    },
    serviceLevel: {
      type: Number,
      default: 0.95,
    },
    leadTimeDays: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "InventoryOptimization",
  InventoryOptimizationSchema
);
