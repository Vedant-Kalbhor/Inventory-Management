import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const user = useSelector((s) => s.auth.user);

  const linkClass = ({ isActive }) =>
    `p-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200 font-semibold" : ""
    }`;

  return (
    <aside className="w-56 bg-white border-r border-slate-200 min-h-screen p-6 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* App Title */}
      <div className="mb-8 pl-2 border-l-4 border-indigo-600">
        <div className="font-bold text-xl tracking-tight text-slate-900">SmartInventory</div>
        <div className="text-xs text-slate-500 font-medium">
          Next-Gen Supply Chain
        </div>
      </div>

      <nav className="flex flex-col space-y-2">
        {/* Login */}
        {!user && (
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
        )}

        {/* Logged-in users */}
        {user && (
          <>
            <NavLink to="/employee" className={linkClass}>
              Employee
            </NavLink>

            {(user.role === "Manager" || user.role === "Admin") && (
              <>
                <NavLink to="/manager" className={linkClass}>
                  Manager Home
                </NavLink>
                <NavLink to="/manager/place-order" className={linkClass}>
                  Place Purchase Order
                </NavLink>
              </>
            )}

            {/* Analytics Section (Manager + Admin only) */}
            {(user.role === "Manager" || user.role === "Admin") && (
              <>
                <div className="mt-4 mb-1 text-xs font-semibold text-gray-500 uppercase">
                  Analytics
                </div>

                <NavLink to="/analytics/forecast" className={linkClass}>
                  Demand Forecast
                </NavLink>

                <NavLink to="/analytics/optimize" className={linkClass}>
                  Inventory Optimization
                </NavLink>
              </>
            )}

            {/* Admin-only */}
            {user.role === "Admin" && (
              <>
                <div className="mt-4 mb-1 text-xs font-semibold text-gray-500 uppercase">
                  Admin
                </div>

                <NavLink to="/admin" className={linkClass}>
                  Admin Dashboard
                </NavLink>

                <NavLink to="/admin/users" className={linkClass}>
                  Users
                </NavLink>
              </>
            )}

            {user.role === "Supplier" && (
              <>
                <NavLink to="/supplier" className={linkClass}>
                  Supplier Dashboard
                </NavLink>
                <NavLink to="/supplier/orders" className={linkClass}>
                  Purchase Orders
                </NavLink>
              </>
            )}
          </>
        )}
      </nav>
    </aside>
  );
}
