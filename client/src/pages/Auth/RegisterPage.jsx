import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import RegisterForm from '../../features/auth/RegisterForm';

export default function RegisterPage() {
    const user = useSelector((s) => s.auth.user);
    if (user) {
        if (user.role === 'Admin') return <Navigate to="/admin" replace />;
        if (user.role === 'Manager') return <Navigate to="/manager" replace />;
        if (user.role === 'Supplier') return <Navigate to="/supplier" replace />;
        return <Navigate to="/employee" replace />;
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <RegisterPage.Wrapper>
                <RegisterForm />
            </RegisterPage.Wrapper>
        </div>
    );
}

// Simple wrapper for styling
RegisterPage.Wrapper = ({ children }) => (
    <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-indigo-600">InventoryPro</h1>
            <p className="text-gray-500 mt-2">Manage your warehouse with intelligence</p>
        </div>
        {children}
    </div>
);
