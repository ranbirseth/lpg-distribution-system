// src/pages/AdminDashboard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Package, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: bookings } = await API.get("/bookings/all");
        const total = bookings.length;
        const pending = bookings.filter((b) => b.status === "Pending").length;
        const delivered = bookings.filter((b) => b.status === "Delivered").length;

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
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-white/10">
        <h1 className="text-xl font-bold text-orange-400">Admin Panel</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-20 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h1 className="hidden md:block text-2xl font-bold text-orange-400 mb-6">
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

      {/* Overlay for Mobile Sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-orange-400 mb-8 text-center md:text-left"
        >
          Admin Dashboard Overview
        </motion.h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Bookings", value: stats.total, color: "text-orange-400" },
            { label: "Pending", value: stats.pending, color: "text-yellow-400" },
            { label: "Delivered", value: stats.delivered, color: "text-green-400" },
            { label: "Total Customers", value: stats.customers, color: "text-blue-400" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg text-center"
            >
              <h3 className="text-gray-300 text-sm md:text-base">{item.label}</h3>
              <p className={`text-2xl md:text-3xl font-bold ${item.color}`}>
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link
            to="/admin/orders"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-center"
          >
            Manage Bookings
          </Link>
          <Link
            to="/admin/users"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center"
          >
            Manage Users
          </Link>
        </div>
      </main>
    </div>
  );
}
