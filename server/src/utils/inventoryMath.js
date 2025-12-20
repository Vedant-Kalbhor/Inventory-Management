const calculateEOQ = (annualDemand, orderingCost, holdingCost) => {
    return Math.sqrt((2 * annualDemand * orderingCost) / holdingCost);
  };
  
  const calculateSafetyStock = (dailyStdDev, leadTimeDays, zScore = 1.65) => {
    return zScore * dailyStdDev * Math.sqrt(leadTimeDays);
  };
  
  const calculateReorderPoint = (
    avgDailyDemand,
    leadTimeDays,
    safetyStock
  ) => {
    return avgDailyDemand * leadTimeDays + safetyStock;
  };
  
  module.exports = {
    calculateEOQ,
    calculateSafetyStock,
    calculateReorderPoint,
  };
  