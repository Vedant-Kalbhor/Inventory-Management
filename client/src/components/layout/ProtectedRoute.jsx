import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loadProfile } from '../../features/auth/authSlice';

export default function ProtectedRoute({ children, roles = [] }) {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const token = localStorage.getItem('token');

  // attempt to load profile if token exists but user not loaded
  useEffect(() => {
    if (token && !user) dispatch(loadProfile());
  }, [dispatch, token, user]);

  if (!token) return <Navigate to="/login" replace />;

  if (roles.length && user && !roles.includes(user.role)) {
    return <div className="p-4 bg-white rounded shadow">Access denied (role)</div>;
  }

  // still loading if token present but user null
  if (!user) return <div className="p-4">Loading...</div>;

  return children;
}
