// src/pages/CustomerDashboard.jsx
import { Link } from "react-router-dom";

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6">LPG System</h1>
        <nav className="space-y-3">
          <Link to="/dashboard" className="block py-2 px-4 rounded-lg hover:bg-indigo-50">🏠 Dashboard</Link>
          <Link to="/orders" className="block py-2 px-4 rounded-lg hover:bg-indigo-50">📦 My Orders</Link>
          <Link to="/profile" className="block py-2 px-4 rounded-lg hover:bg-indigo-50">👤 Profile</Link>
          <Link to="/" className="block py-2 px-4 text-red-600 hover:bg-red-50">🚪 Logout</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Customer Dashboard</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold text-indigo-600">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500">Pending Delivery</h3>
            <p className="text-2xl font-bold text-yellow-500">3</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500">Completed</h3>
            <p className="text-2xl font-bold text-green-500">9</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-3">Order ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">#1001</td>
                <td className="p-3">12 Sep 2025</td>
                <td className="p-3 text-green-600">Delivered</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">#1002</td>
                <td className="p-3">10 Sep 2025</td>
                <td className="p-3 text-yellow-600">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
