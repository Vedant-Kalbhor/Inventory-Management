import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createProduct } from './productsSlice';

export default function ProductForm() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    await dispatch(createProduct({ ...data, stockQuantity: Number(data.stockQuantity || 0) }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow">
      <h4 className="mb-2">Add Product</h4>
      <input {...register('name')} placeholder="Name" className="border px-2 py-1 w-full mb-2" />
      <input {...register('sku')} placeholder="SKU" className="border px-2 py-1 w-full mb-2" />
      <input {...register('category')} placeholder="Category" className="border px-2 py-1 w-full mb-2" />
      <input {...register('price')} placeholder="Price" type="number" className="border px-2 py-1 w-full mb-2" />
      <input {...register('stockQuantity')} placeholder="Stock" type="number" className="border px-2 py-1 w-full mb-2" />
      <button className="bg-indigo-600 text-white px-3 py-1 rounded">Create</button>
    </form>
  );
}
