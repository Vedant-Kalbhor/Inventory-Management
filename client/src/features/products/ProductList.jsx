import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct } from './productsSlice';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const dispatch = useDispatch();
  const { list, status } = useSelector((s) => s.products);

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [dispatch, status]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updated = {
      name: formData.get('name'),
      category: formData.get('category'),
      stockQuantity: parseInt(formData.get('stockQuantity'), 10),
    };

    dispatch(updateProduct({ id: editingProduct._id, data: updated }));
    setEditingProduct(null);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Products</h3>
        <Link to="/manager" className="text-indigo-600">
          Manager Home
        </Link>
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
                <button
                  onClick={() => setEditingProduct(p)}
                  className="mr-2 px-2 py-1 border rounded bg-yellow-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteProduct(p._id))}
                  className="px-2 py-1 border rounded bg-red-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow w-96">
            <h3 className="font-semibold mb-2">Edit Product</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-2">
                <label className="block text-sm">Name</label>
                <input
                  name="name"
                  defaultValue={editingProduct.name}
                  className="border p-1 w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm">Category</label>
                <input
                  name="category"
                  defaultValue={editingProduct.category}
                  className="border p-1 w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm">Stock</label>
                <input
                  type="number"
                  name="stockQuantity"
                  defaultValue={editingProduct.stockQuantity}
                  className="border p-1 w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="mr-2 px-3 py-1 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
