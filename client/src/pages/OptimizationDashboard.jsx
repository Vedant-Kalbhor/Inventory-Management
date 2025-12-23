import React, { useState } from "react";
import { getOptimization } from "../services/analyticsApi";

const OptimizationDashboard = () => {
  const [productId, setProductId] = useState("");
  const [orderingCost, setOrderingCost] = useState(500);
  const [holdingCost, setHoldingCost] = useState(20);
  const [leadTimeDays, setLeadTimeDays] = useState(7);
  const [serviceLevel, setServiceLevel] = useState(0.95);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runOptimization = async () => {
    if (!productId) {
      alert("Please enter a valid Product ID");
      return;
    }

    try {
      setLoading(true);
      const res = await getOptimization({
        productId,
        orderingCost: Number(orderingCost),
        holdingCost: Number(holdingCost),
        leadTimeDays: Number(leadTimeDays),
        serviceLevel: Number(serviceLevel),
      });
      setResult(res.data.optimization);
    } catch (err) {
      alert(err.response?.data?.error || "Optimization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📦 Inventory Optimization</h2>
        <p style={styles.subtitle}>
          Calculate EOQ, Safety Stock & Reorder Point using forecast data
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

        {/* Ordering Cost */}
        <div style={styles.field}>
          <label style={styles.label}>Ordering Cost (₹ per order)</label>
          <input
            type="number"
            value={orderingCost}
            onChange={(e) => setOrderingCost(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Holding Cost */}
        <div style={styles.field}>
          <label style={styles.label}>Holding Cost (₹ per unit/year)</label>
          <input
            type="number"
            value={holdingCost}
            onChange={(e) => setHoldingCost(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Lead Time */}
        <div style={styles.field}>
          <label style={styles.label}>Lead Time (days)</label>
          <input
            type="number"
            min="1"
            value={leadTimeDays}
            onChange={(e) => setLeadTimeDays(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Service Level */}
        <div style={styles.field}>
          <label style={styles.label}>Service Level</label>
          <select
            value={serviceLevel}
            onChange={(e) => setServiceLevel(e.target.value)}
            style={styles.input}
          >
            <option value={0.90}>90%</option>
            <option value={0.95}>95%</option>
            <option value={0.99}>99%</option>
          </select>
        </div>

        {/* Action */}
        <button
          onClick={runOptimization}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Optimizing..." : "Run Optimization"}
        </button>

        {/* Results */}
        {result && (
          <div style={styles.results}>
            <h3 style={styles.resultsTitle}>Optimization Results</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <span>EOQ</span>
                <strong>{result.eoq}</strong>
              </li>
              <li style={styles.listItem}>
                <span>Safety Stock</span>
                <strong>{result.safetyStock}</strong>
              </li>
              <li style={styles.listItem}>
                <span>Reorder Point</span>
                <strong>{result.reorderPoint}</strong>
              </li>
              <li style={styles.listItem}>
                <span>Annual Demand</span>
                <strong>{result.annualDemand}</strong>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizationDashboard;

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
