// File: src/features/products/ProductList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from './productsSlice';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const dispatch = useDispatch();
  const { list, status } = useSelector((s) => s.products);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [dispatch, status]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Products</h3>
        <Link to="/manager" className="text-indigo-600">Manager Home</Link>
      </div>
      <table className="w-full table-auto">
        <thead className="text-left">
          <tr className="border-b">
            <th className="p-2">SKU</th>
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p._id} className="border-b">
              <td className="p-2">{p.sku}</td>
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">{p.stockQuantity}</td>
              <td className="p-2">
                <button className="mr-2 px-2 py-1 border rounded bg-yellow-50">Edit</button>
                <button onClick={() => dispatch(deleteProduct(p._id))} className="px-2 py-1 border rounded bg-red-50">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
