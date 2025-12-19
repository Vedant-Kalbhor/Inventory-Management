import CameraScanner from "../../components/BarcodeScanner/CameraScanner";
import api from "../../api/axiosInstance";
import { useState } from "react";

export default function ScanAndLookup() {
  const [product, setProduct] = useState(null);

  async function onDetected(code) {
    const res = await api.get(`/products?sku=${code}`);
    setProduct(res.data[0]);
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <CameraScanner onDetected={onDetected} />
      {product && (
        <div className="mt-4">
          <h3 className="font-bold">{product.name}</h3>
          <div>Stock: {product.stockQuantity}</div>
        </div>
      )}
    </div>
  );
}
