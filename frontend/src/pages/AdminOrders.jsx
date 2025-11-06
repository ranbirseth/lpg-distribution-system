// src/pages/AdminOrders.jsx
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Users,
  LogOut,
  CheckCircle,
  XCircle,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function AdminOrders() {
  const { logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/bookings/all");
      setBookings(data);
    } catch (err) {
      console.error("Error loading bookings:", err);
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdating(id);
      await API.put(`/bookings/${id}/status`, { status });
      await fetchBookings();
    } catch (err) {
      console.error("Failed to update booking:", err);
    } finally {
      setUpdating(null);
    }
  };

  const handleLogout = () => logout();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Loader2 className="animate-spin mr-2" /> Loading bookings...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/70" />

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-20 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-orange-400">🔥 Admin Panel</h1>
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>
        <nav className="space-y-3">
          <Link
            to="/admin"
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition"
          >
            <LayoutDashboard className="text-orange-400" size={18} /> Dashboard
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-2 py-2 px-4 rounded-lg bg-orange-500/20 transition"
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

      {/* Mobile Menu Button */}
      <button
        className="absolute top-4 left-4 md:hidden z-30 text-white bg-orange-500/20 p-2 rounded-lg border border-white/20"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Main */}
      <main className="relative z-10 flex-1 p-6 md:p-8">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-orange-400 mb-6"
        >
          Manage Bookings
        </motion.h1>

        {error && (
          <p className="text-red-400 bg-red-500/10 p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {bookings.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto bg-white/10 border border-white/20 rounded-2xl shadow-lg backdrop-blur-xl">
            <table className="min-w-full text-sm text-gray-200">
              <thead>
                <tr className="border-b border-gray-700 text-orange-300">
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Qty</th>
                  <th className="py-3 px-4 text-left">Address</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b border-gray-800 hover:bg-white/5 transition"
                  >
                    <td className="py-3 px-4">{b.customer?.name || "N/A"}</td>
                    <td className="py-3 px-4">{b.customer?.email || "-"}</td>
                    <td className="py-3 px-4">{b.cylinderType}</td>
                    <td className="py-3 px-4">{b.quantity}</td>
                    <td className="py-3 px-4">{b.address}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        b.status === "Delivered"
                          ? "text-green-400"
                          : b.status === "Pending"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {b.status}
                    </td>
                    <td className="py-3 px-4 flex items-center justify-center gap-3 flex-wrap">
                      <button
                        onClick={() => updateStatus(b._id, "Delivered")}
                        disabled={updating === b._id}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                      >
                        <CheckCircle size={14} /> Delivered
                      </button>
                      <button
                        onClick={() => updateStatus(b._id, "Cancelled")}
                        disabled={updating === b._id}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                      >
                        <XCircle size={14} /> Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
