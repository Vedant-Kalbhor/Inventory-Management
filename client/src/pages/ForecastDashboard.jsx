import React, { useState } from "react";
import { getForecast } from "../services/analyticsApi";

const ForecastDashboard = () => {
  const [productId, setProductId] = useState("");
  const [horizon, setHorizon] = useState(7);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const runForecast = async () => {
    if (!productId) {
      alert("Please enter a valid Product ID");
      return;
    }

    try {
      setLoading(true);
      const res = await getForecast({
        productId,
        horizon: Number(horizon),
      });
      setForecast(res.data.forecast.forecastValues);
    } catch (err) {
      alert(err.response?.data?.error || "Forecast failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📈 Demand Forecast</h2>
        <p style={styles.subtitle}>
          Generate demand predictions based on historical sales data
        </p>

        {/* Product ID */}
        <div style={styles.field}>
          <label style={styles.label}>Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="e.g. 64f1b0c9e2a1a34d91c7fabc"
            style={styles.input}
          />
        </div>

        {/* Horizon */}
        <div style={styles.field}>
          <label style={styles.label}>Forecast Horizon (days)</label>
          <input
            type="number"
            min="1"
            value={horizon}
            onChange={(e) => setHorizon(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Action */}
        <button
          onClick={runForecast}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Running Forecast..." : "Generate Forecast"}
        </button>

        {/* Results */}
        {forecast.length > 0 && (
          <div style={styles.results}>
            <h3 style={styles.resultsTitle}>Forecast Results</h3>
            <ul style={styles.list}>
              {forecast.map((value, index) => (
                <li key={index} style={styles.listItem}>
                  <span>Day {index + 1}</span>
                  <strong>{value.toFixed(2)}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForecastDashboard;

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "40px",
  },
  card: {
    background: "#ffffff",
    padding: "30px",
    width: "100%",
    maxWidth: "480px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    marginBottom: "25px",
    color: "#666",
    fontSize: "14px",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    marginTop: "10px",
  },
  results: {
    marginTop: "25px",
  },
  resultsTitle: {
    marginBottom: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
  },
};
