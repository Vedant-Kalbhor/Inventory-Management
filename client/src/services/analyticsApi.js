import axios from "axios";

const API_BASE = "http://localhost:5000/api/analytics";

export const getForecast = (data) =>
  axios.post(`${API_BASE}/forecast`, data);

export const getOptimization = (data) =>
  axios.post(`${API_BASE}/optimize`, data);
