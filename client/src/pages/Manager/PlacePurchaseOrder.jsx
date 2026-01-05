import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PlacePurchaseOrder() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get("/api/users?role=Supplier");

        // 🔥 IMPORTANT FIX: extract array safely
        const supplierList =
          Array.isArray(res.data)
            ? res.data
            : res.data.users || res.data.data || [];

        setSuppliers(supplierList);
      } catch (err) {
        console.error("Supplier fetch failed:", err);
        setSuppliers([]);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");

        const productList =
          Array.isArray(res.data)
            ? res.data
            : res.data.products || res.data.data || [];

        setProducts(productList);
      } catch (err) {
        console.error("Product fetch failed:", err);
        setProducts([]);
      }
    };

    fetchSuppliers();
    fetchProducts();
  }, []);

  const placeOrder = async () => {
    if (!supplierId || !productId || quantity <= 0) {
      alert("Please select supplier, product and valid quantity");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/purchase-orders", {
        supplierId,
        items: [{ productId, quantity: Number(quantity) }],
      });
      alert("Purchase Order Created Successfully");
      setSupplierId("");
      setProductId("");
      setQuantity(1);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-lg">
      <h2 className="text-xl mb-4 font-semibold">
        Place Purchase Order
      </h2>

      {/* Supplier */}
      <select
        value={supplierId}
        onChange={(e) => setSupplierId(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="">Select Supplier</option>
        {suppliers.length > 0 ? (
          suppliers.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name || s.email}
            </option>
          ))
        ) : (
          <option disabled>No suppliers found</option>
        )}
      </select>

      {/* Product */}
      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="">Select Product</option>
        {products.length > 0 ? (
          products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))
        ) : (
          <option disabled>No products found</option>
        )}
      </select>

      {/* Quantity */}
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      <button
        onClick={placeOrder}
        disabled={loading}
        className={`w-full px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
