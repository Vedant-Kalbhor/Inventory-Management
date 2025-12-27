import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  updateOrderStatus,
} from "../../features/orders/ordersSlice";

export default function SupplierOrders() {
  const dispatch = useDispatch();

  const { list, status, error } = useSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading orders...</div>;
  }

  if (status === "failed") {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!list || list.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl mb-2">Purchase Orders</h2>
        <p className="text-gray-600">No orders assigned yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl mb-4">Purchase Orders</h2>

      {list.map((order) => (
        <div key={order._id} className="border p-3 mb-3 rounded">
          <div className="mb-2">
            <strong>Status:</strong> {order.status}
          </div>

          <div className="mb-2">
            {order.items?.map((i) => (
              <div key={i._id}>
                {i.productId?.name || "Product"} × {i.quantity}
              </div>
            ))}
          </div>

          {order.status !== "Delivered" && (
            <button
              onClick={() =>
                dispatch(
                  updateOrderStatus({
                    id: order._id,
                    status: "Delivered",
                  })
                )
              }
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Mark Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
