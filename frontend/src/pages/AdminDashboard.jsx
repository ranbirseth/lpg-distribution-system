// src/pages/AdminDashboard.jsx
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">Admin Panel</h1>
        <nav className="space-y-3">
          <Link to="/admin" className="block py-2 px-4 rounded-lg hover:bg-indigo-50">📊 Dashboard</Link>
          <Link to="/users" className="block py-2 px-4 rounded-lg hover:bg-indigo-50">👥 Manage Users</Link>
          <Link to="/orders" className="block py-2 px-4 rounded-lg hover:bg-indigo-50">📦 Manage Orders</Link>
          <Link to="/" className="block py-2 px-4 text-red-600 hover:bg-red-50">🚪 Logout</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500">Total Customers</h3>
            <p className="text-2xl font-bold text-indigo-600">150</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500">Active Orders</h3>
            <p className="text-2xl font-bold text-yellow-500">20</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold text-green-500">₹ 85,000</p>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Users</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-3">User ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">#U101</td>
                <td className="p-3">Ranbir Seth</td>
                <td className="p-3 text-indigo-600">Customer</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">#U102</td>
                <td className="p-3">Admin User</td>
                <td className="p-3 text-red-600">Admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
