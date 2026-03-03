import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "./ordersSlice";

export default function OrdersList() {
    const dispatch = useDispatch();
    const { list, status } = useSelector((s) => s.orders);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchOrders());

    }, [dispatch, status]);

    if (status === 'loading') return <div>Loading Orders...</div>;

    return (
        <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Orders</h3>
            <table className="w-full table-auto">
                <thead className="text-left">
                    <tr className="border-b">
                        <th className="p-2">Type</th>
                        <th className="p-2">Supplier</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((o) => (
                        <tr key={o._id} className="border-b">
                            <td className="p-2">{o.orderType}</td>
                            <td className="p-2">{o.supplierId?.name || 'N/A'}</td>
                            <td className="p-2">
                                <span className={`px-2 py-1 rounded text-xs ${o.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                                    }`}>
                                    {o.status}
                                </span>
                            </td>
                            <td className="p-2">{new Date(o.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}