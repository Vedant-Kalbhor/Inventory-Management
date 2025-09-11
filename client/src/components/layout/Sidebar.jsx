import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Sidebar() {
  const user = useSelector((s) => s.auth.user);

  return (
    <aside className="w-56 bg-gray-100 border-r min-h-screen p-4">
      <div className="mb-6">
        <div className="font-bold text-xl">Inventory</div>
        <div className="text-sm text-gray-600">Manage stock & orders</div>
      </div>

      <nav className="flex flex-col space-y-2">
        {!user && <NavLink to="/login" className="p-2 rounded hover:bg-gray-200">Login</NavLink>}
        {user && (
          <>
            <NavLink to="/employee" className="p-2 rounded hover:bg-gray-200">Employee</NavLink>
            {(user.role === 'Manager' || user.role === 'Admin') && (
              <NavLink to="/manager" className="p-2 rounded hover:bg-gray-200">Manager</NavLink>
            )}
            {user.role === 'Admin' && (
              <>
                <NavLink to="/admin" className="p-2 rounded hover:bg-gray-200">Admin</NavLink>
                <NavLink to="/admin/users" className="p-2 rounded hover:bg-gray-200">Users</NavLink>
              </>
            )}
          </>
        )}
      </nav>
    </aside>
  );
}
