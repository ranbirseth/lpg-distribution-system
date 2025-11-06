// src/pages/AdminDashboard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Package, LayoutDashboard, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0,
    customers: 0,
  });

  // 🧠 Load booking and user stats for admin
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // ✅ Admin endpoint to get all bookings
        const { data: bookings } = await API.get("/bookings/all");

        const total = bookings.length;
        const pending = bookings.filter((b) => b.status === "Pending").length;
        const delivered = bookings.filter(
          (b) => b.status === "Delivered"
        ).length;

        // ✅ Admin endpoint to get all users
        const { data: users } = await API.get("/auth/all");
        const customers = users.filter((u) => u.role === "customer").length;

        setStats({ total, pending, delivered, customers });
      } catch (err) {
        console.error("Error loading admin stats:", err);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => logout();

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/70" />

      {/* Sidebar */}
      <aside className="relative z-10 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6">
        <h1 className="text-2xl font-bold text-orange-400 mb-6">
          🔥 Admin Panel
        </h1>
        <nav className="space-y-3">
          <Link
            to="/admin"
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition"
          >
            <LayoutDashboard className="text-orange-400" size={18} /> Dashboard
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition"
          >
            <Package className="text-orange-400" size={18} /> Manage Orders
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition"
          >
            <Users className="text-orange-400" size={18} /> Manage Users
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 px-4 rounded-lg text-red-400 hover:bg-red-500/20 transition w-full text-left"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-orange-400 mb-8"
        >
          Admin Dashboard Overview
        </motion.h2>

        {/* Booking Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-gray-300">Total Bookings</h3>
            <p className="text-2xl font-bold text-orange-400">{stats.total}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-gray-300">Pending</h3>
            <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-gray-300">Delivered</h3>
            <p className="text-2xl font-bold text-green-400">
              {stats.delivered}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-gray-300">Total Customers</h3>
            <p className="text-2xl font-bold text-blue-400">
              {stats.customers}
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center gap-6">
          <Link
            to="/admin/orders"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Manage Bookings
          </Link>
          <Link
            to="/admin/users"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Manage Users
          </Link>
        </div>
      </main>
    </div>
  );
}
