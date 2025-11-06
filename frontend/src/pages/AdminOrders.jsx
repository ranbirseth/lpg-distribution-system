// src/pages/AdminOrders.jsx
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function AdminOrders() {
  const { logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [error, setError] = useState("");

  // Fetch all bookings for admin
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

  // Update booking status
  const updateStatus = async (id, status) => {
    try {
      setUpdating(id);
      await API.put(`/bookings/${id}/status`, { status });
      await fetchBookings(); // reload data after update
    } catch (err) {
      console.error("Failed to update booking:", err);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Loader2 className="animate-spin mr-2" /> Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/admin"
          className="flex items-center gap-2 text-orange-400 hover:text-orange-300"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>

        <button
          onClick={logout}
          className="text-red-400 hover:text-red-500 font-semibold"
        >
          Logout
        </button>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-orange-400 mb-6"
      >
        Manage Bookings
      </motion.h1>

      {error && (
        <p className="text-red-400 bg-red-500/10 p-3 rounded mb-4">{error}</p>
      )}

      {bookings.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">
          No bookings found yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-lg">
          <table className="min-w-full text-sm text-gray-200">
            <thead>
              <tr className="border-b border-gray-700 text-orange-300">
                <th className="py-3 text-left">Customer</th>
                <th className="py-3 text-left">Email</th>
                <th className="py-3 text-left">Type</th>
                <th className="py-3 text-left">Qty</th>
                <th className="py-3 text-left">Address</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b._id}
                  className="border-b border-gray-800 hover:bg-white/5 transition"
                >
                  <td className="py-2">{b.customer?.name || "N/A"}</td>
                  <td className="py-2">{b.customer?.email || "-"}</td>
                  <td className="py-2">{b.cylinderType}</td>
                  <td className="py-2">{b.quantity}</td>
                  <td className="py-2">{b.address}</td>
                  <td
                    className={`py-2 font-semibold ${
                      b.status === "Delivered"
                        ? "text-green-400"
                        : b.status === "Pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {b.status}
                  </td>
                  <td className="py-2 flex items-center justify-center gap-3">
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
    </div>
  );
}
