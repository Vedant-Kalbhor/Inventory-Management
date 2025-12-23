import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  return (
    <header className="bg-white border-b p-4 flex justify-between items-center">
      {/* <div className="text-lg font-semibold">Inventory & Supply Chain Management System</div> */}
      <div className=""></div>
      <div className="flex items-center space-x-3">
        {user ? (
          <>
            <div className="text-sm">Hi, <span className="font-medium">{user.name}</span> ({user.role})</div>
            <button
              onClick={() => dispatch(logout())}
              className="px-3 py-1 bg-red-50 border rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="text-sm">Not signed in</div>
        )}
      </div>
    </header>
  );
}
