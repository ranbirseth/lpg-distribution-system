// src/pages/CustomerDashboard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, User, LogOut } from "lucide-react";

export default function CustomerDashboard() {
  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Sidebar */}
      <aside className="relative z-10 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6">
        <h1 className="text-2xl font-bold text-orange-400 mb-6">🔥 LPG System</h1>
        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition"
          >
            <LayoutDashboard className="text-orange-400" size={18} /> Dashboard
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition"
          >
            <Package className="text-orange-400" size={18} /> My Orders
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition"
          >
            <User className="text-orange-400" size={18} /> Profile
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 py-2 px-4 rounded-lg text-red-400 hover:bg-red-500/20 transition"
          >
            <LogOut size={18} /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="relative z-10 flex-1 p-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-orange-400 mb-8"
        >
          Customer Dashboard
        </motion.h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-gray-300">Total Orders</h3>
            <p className="text-2xl font-bold text-orange-400">12</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-gray-300">Pending Delivery</h3>
            <p className="text-2xl font-bold text-yellow-400">3</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-gray-300">Completed</h3>
            <p className="text-2xl font-bold text-green-400">9</p>
          </motion.div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">Recent Orders</h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-white/5 text-left">
                <th className="p-3">Order ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="p-3">#1001</td>
                <td className="p-3">12 Sep 2025</td>
                <td className="p-3 text-green-400">Delivered</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-3">#1002</td>
                <td className="p-3">10 Sep 2025</td>
                <td className="p-3 text-yellow-400">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
