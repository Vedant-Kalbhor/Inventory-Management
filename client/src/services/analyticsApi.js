import api from "../api/axiosInstance";

export const getForecast = (data) =>
  api.post("/analytics/forecast", data);

export const getOptimization = (data) =>
  api.post("/analytics/optimize", data);
