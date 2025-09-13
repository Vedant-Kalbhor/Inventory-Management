// File: src/pages/Admin/UsersManagement.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../features/users/usersSlice';

export default function UsersManagement() {
  const dispatch = useDispatch();
  const { list, status } = useSelector((s) => s.users);

  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
      ...(formData.get('password') ? { password: formData.get('password') } : {}),
    };

    if (editingUser) {
      dispatch(updateUser({ id: editingUser._id, data }));
    } else {
      dispatch(createUser(data));
    }
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users Management</h2>
        <button
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-3 py-1 rounded"
        >
          + New User
        </button>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((u) => (
            <tr key={u._id} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">
                <button
                  onClick={() => {
                    setEditingUser(u);
                    setShowForm(true);
                  }}
                  className="mr-2 px-2 py-1 border rounded bg-yellow-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteUser(u._id))}
                  className="px-2 py-1 border rounded bg-red-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow w-96">
            <h3 className="font-semibold mb-2">
              {editingUser ? 'Edit User' : 'Create User'}
            </h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-2">
                <label className="block text-sm">Name</label>
                <input
                  name="name"
                  defaultValue={editingUser?.name || ''}
                  className="border p-1 w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingUser?.email || ''}
                  className="border p-1 w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm">Role</label>
                <select
                  name="role"
                  defaultValue={editingUser?.role || 'employee'}
                  className="border p-1 w-full"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                  <option value="Supplier">Supplier</option>
                </select>
              </div>
              {!editingUser && (
                <div className="mb-2">
                  <label className="block text-sm">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="border p-1 w-full"
                    required
                  />
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingUser(null);
                  }}
                  className="mr-2 px-3 py-1 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
