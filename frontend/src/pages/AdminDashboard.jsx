// src/pages/AdminDashboard.jsx
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">LPG Admin Dashboard</h1>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded">Logout</button>
      </nav>

      <div className="p-6 space-y-6">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <p className="text-3xl font-bold text-blue-600">108</p>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold">Delivered</h3>
            <p className="text-3xl font-bold text-green-600">92</p>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold">Cylinders in Stock</h3>
            <p className="text-3xl font-bold text-yellow-600">36</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">🔍 Search Bookings</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by user or date"
              className="flex-1 px-4 py-2 border rounded"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">📋 Manage Bookings</h3>
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">User</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">john@example.com</td>
                <td className="p-2">2025-08-01</td>
                <td className="p-2">
                  <select className="border px-2 py-1 rounded">
                    <option>Booked</option>
                    <option>Dispatched</option>
                    <option>Delivered</option>
                  </select>
                </td>
                <td className="p-2 flex gap-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Upload Receipt
                  </button>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    View Receipt
                  </button>
                </td>
              </tr>
              {/* More rows mapped from DB */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
