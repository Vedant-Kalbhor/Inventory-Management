import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../features/auth/LoginForm';

export default function LoginPage() {
  const user = useSelector((s) => s.auth.user);
  if (user) {
    // redirect based on role
    if (user.role === 'Admin') return <Navigate to="/admin" replace />;
    if (user.role === 'Manager') return <Navigate to="/manager" replace />;
    if (user.role === 'Supplier') return <Navigate to="/supplier" replace />;
    return <Navigate to="/employee" replace />;
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
