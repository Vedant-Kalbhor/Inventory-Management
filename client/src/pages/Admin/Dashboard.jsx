import React from 'react';
import ProductList from '../../features/products/ProductList';
import ProductForm from '../../features/products/ProductForm';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div><ProductForm /></div>
        <div className="bg-white p-4 rounded shadow">Other admin widgets</div>
      </div>
      <ProductList />
    </div>
  );
}
