import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../features/orders/ordersSlice";

export default function SupplierOrders() {
  const dispatch = useDispatch();
  const { list } = useSelector(s => s.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl mb-4">Purchase Orders</h2>

      {list.map(order => (
        <div key={order._id} className="border p-3 mb-3 rounded">
          <div>Status: {order.status}</div>
          <div>
            {order.items.map(i => (
              <div key={i._id}>
                {i.productId?.name} × {i.quantity}
              </div>
            ))}
          </div>

          <div className="mt-2">
            {order.status !== "Delivered" && (
              <button
                onClick={() =>
                  dispatch(updateOrderStatus({ id: order._id, status: "Delivered" }))
                }
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Mark Delivered
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
