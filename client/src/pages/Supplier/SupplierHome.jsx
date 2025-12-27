import React from "react";
import { Link } from "react-router-dom";

export default function SupplierHome() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Supplier Dashboard
      </h1>

      <div className="bg-white p-4 rounded shadow mb-4">
        <p className="text-gray-700">
          View purchase orders assigned to you and update delivery status.
        </p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <Link
          to="/supplier/orders"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
        >
          View Purchase Orders
        </Link>
      </div>
    </div>
  );
}
