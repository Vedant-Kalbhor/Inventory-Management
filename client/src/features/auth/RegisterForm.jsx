import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './authSlice';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
    const { register, handleSubmit, watch } = useForm();
    const dispatch = useDispatch();
    const status = useSelector((s) => s.auth.status);
    const error = useSelector((s) => s.auth.error);

    const onSubmit = (data) => {
        dispatch(registerUser(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded shadow border">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

            {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded text-sm">{error}</div>}

            <div className="space-y-4">
                <label className="block">
                    <span className="text-gray-700 text-sm font-medium">Full Name</span>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        type="text"
                        placeholder="John Doe"
                        {...register('name', { required: true })}
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700 text-sm font-medium">Email Address</span>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        type="email"
                        placeholder="admin@example.com"
                        {...register('email', { required: true })}
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700 text-sm font-medium">Password</span>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        type="password"
                        placeholder="••••••••"
                        {...register('password', { required: true, minLength: 6 })}
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700 text-sm font-medium">Role</span>
                    <select
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        {...register('role')}
                    >
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Supplier">Supplier</option>
                        <option value="Admin">Admin</option>
                    </select>
                </label>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? 'Creating Account...' : 'Continue'}
                </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                    Sign In
                </Link>
            </p>
        </form>
    );
}
