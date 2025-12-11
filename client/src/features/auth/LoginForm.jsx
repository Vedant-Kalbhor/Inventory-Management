import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const status = useSelector((s) => s.auth.status);
  const onSubmit = (data) => dispatch(login(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Sign in</h2>
      <label className="block mb-2">
        <span className="text-sm">Email</span>
        <input
          className="mt-1 block w-full border rounded px-3 py-2"
          type="email"
          {...register('email', { required: true })}
        />
      </label>

      <label className="block mb-4">
        <span className="text-sm">Password</span>
        <input
          className="mt-1 block w-full border rounded px-3 py-2"
          type="password"
          {...register('password', { required: true })}
        />
      </label>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
