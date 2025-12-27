import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import AdminDashboard from "./pages/Admin/Dashboard";
import UsersManagement from "./pages/Admin/UsersManagement";
import ManagerHome from "./pages/Manager/ManagerHome";
import EmployeeHome from "./pages/Employee/EmployeeHome";
import SupplierHome from "./pages/Supplier/SupplierHome";
import SupplierOrders from "./pages/Supplier/SupplierOrders";

import ProtectedRoute from "./components/layout/ProtectedRoute";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

import ForecastDashboard from "./pages/ForecastDashboard";
import OptimizationDashboard from "./pages/OptimizationDashboard";

export default function App() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <UsersManagement />
                </ProtectedRoute>
              }
            />

            {/* Manager */}
            <Route
              path="/manager"
              element={
                <ProtectedRoute roles={["Manager", "Admin"]}>
                  <ManagerHome />
                </ProtectedRoute>
              }
            />

            {/* Employee */}
            <Route
              path="/employee"
              element={
                <ProtectedRoute roles={["Employee", "Manager", "Admin"]}>
                  <EmployeeHome />
                </ProtectedRoute>
              }
            />

            {/* Supplier */}
            <Route
              path="/supplier"
              element={
                <ProtectedRoute roles={["Supplier"]}>
                  <SupplierHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/supplier/orders"
              element={
                <ProtectedRoute roles={["Supplier"]}>
                  <SupplierOrders />
                </ProtectedRoute>
              }
            />

            {/* Analytics */}
            <Route path="/analytics/forecast" element={<ForecastDashboard />} />
            <Route path="/analytics/optimize" element={<OptimizationDashboard />} />

            <Route path="/" element={<Navigate to="/employee" replace />} />
            <Route path="*" element={<div>404 - Not Found</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
