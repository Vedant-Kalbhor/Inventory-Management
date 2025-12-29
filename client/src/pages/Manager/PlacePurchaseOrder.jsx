import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacePurchaseOrder() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get("/api/users?role=Supplier").then(res => setSuppliers(res.data));
    axios.get("/api/products").then(res => setProducts(res.data));
  }, []);

  const placeOrder = async () => {
    await axios.post("/api/purchase-orders", {
      supplierId,
      items: [{ productId, quantity }],
    });
    alert("Purchase Order Created");
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-lg">
      <h2 className="text-xl mb-4">Place Purchase Order</h2>

      <select onChange={e => setSupplierId(e.target.value)} className="border p-2 w-full mb-3">
        <option>Select Supplier</option>
        {suppliers.map(s => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>

      <select onChange={e => setProductId(e.target.value)} className="border p-2 w-full mb-3">
        <option>Select Product</option>
        {products.map(p => (
          <option key={p._id} value={p._id}>{p.name}</option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={placeOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
