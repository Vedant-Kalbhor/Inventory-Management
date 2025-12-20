const DemandForecast = require("../models/DemandForecast");
const InventoryOptimization = require("../models/InventoryOptimization");
const {
  calculateEOQ,
  calculateSafetyStock,
  calculateReorderPoint,
} = require("../utils/inventoryMath");

const optimizeInventory = async (req, res) => {
  try {
    const {
      productId,
      orderingCost,
      holdingCost,
      leadTimeDays,
      serviceLevel = 0.95,
    } = req.body;

    if (!productId || !orderingCost || !holdingCost || !leadTimeDays) {
      return res.status(400).json({
        error: "Missing required optimization inputs",
      });
    }

    const forecast = await DemandForecast.findOne({ productId }).sort({
      createdAt: -1,
    });

    if (!forecast) {
      return res.status(400).json({
        error: "No forecast available for this product",
      });
    }

    const dailyDemand = forecast.forecastValues;
    const annualDemand = dailyDemand.reduce((a, b) => a + b, 0) * 52 / dailyDemand.length;

    const avgDailyDemand =
      dailyDemand.reduce((a, b) => a + b, 0) / dailyDemand.length;

    const variance =
      dailyDemand.reduce(
        (sum, d) => sum + Math.pow(d - avgDailyDemand, 2),
        0
      ) / dailyDemand.length;

    const dailyStdDev = Math.sqrt(variance);

    const eoq = calculateEOQ(annualDemand, orderingCost, holdingCost);
    const safetyStock = calculateSafetyStock(
      dailyStdDev,
      leadTimeDays,
      serviceLevel === 0.95 ? 1.65 : 1.28
    );

    const reorderPoint = calculateReorderPoint(
      avgDailyDemand,
      leadTimeDays,
      safetyStock
    );

    const optimization = await InventoryOptimization.create({
      productId,
      annualDemand: Math.round(annualDemand),
      eoq: Math.round(eoq),
      safetyStock: Math.round(safetyStock),
      reorderPoint: Math.round(reorderPoint),
      serviceLevel,
      leadTimeDays,
    });

    return res.status(200).json({
      message: "Inventory optimization completed",
      optimization,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  optimizeInventory,
};
