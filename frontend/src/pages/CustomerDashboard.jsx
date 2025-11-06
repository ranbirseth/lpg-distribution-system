import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, User, LogOut, Flame, Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function CustomerDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    cylinderType: "Domestic",
    quantity: 1,
    address: "",
  });
  const [message, setMessage] = useState("");

  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/bookings/my");
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/bookings", formData);
      setMessage("✅ Booking placed successfully!");
      setShowForm(false);
      setFormData({ cylinderType: "Domestic", quantity: 1, address: "" });
      fetchBookings();
    } catch (err) {
      setMessage("❌ Failed to book cylinder.");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await API.put(`/bookings/${id}/cancel`);
      setMessage("❌ Booking cancelled successfully!");
      fetchBookings();
    } catch (err) {
      console.error("Cancel booking error:", err);
      setMessage("⚠️ Failed to cancel booking.");
    }
  };

  const handleLogout = () => logout();

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/70" />

      {/* Mobile Navbar */}
      <header className="md:hidden relative z-20 flex items-center justify-between p-4 bg-black/50 backdrop-blur-xl border-b border-white/20">
        <h1 className="text-xl font-bold text-orange-400">🔥 LPG System</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-orange-400 focus:outline-none"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 transform transition-transform duration-300 z-30 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h1 className="hidden md:block text-2xl font-bold text-orange-400 mb-6">
          🔥 LPG System
        </h1>
        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition"
          >
            <LayoutDashboard className="text-orange-400" size={18} /> Dashboard
          </Link>

          <button
            onClick={() => {
              setShowForm(true);
              setSidebarOpen(false);
            }}
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition w-full text-left"
          >
            <Flame className="text-orange-400" size={18} /> Book Cylinder
          </button>

          <Link
            to="/profile"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition"
          >
            <User className="text-orange-400" size={18} /> Profile
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
      <main className="relative z-10 flex-1 p-4 md:p-8 overflow-x-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-orange-400 mb-6 text-center md:text-left"
        >
          Welcome, {user?.name}
        </motion.h2>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-lg text-center"
          >
            <h3 className="text-gray-300">Total Orders</h3>
            <p className="text-2xl font-bold text-orange-400">
              {bookings.length}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-lg text-center"
          >
            <h3 className="text-gray-300">Pending</h3>
            <p className="text-2xl font-bold text-yellow-400">
              {bookings.filter((b) => b.status === "Pending").length}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-lg text-center"
          >
            <h3 className="text-gray-300">Delivered</h3>
            <p className="text-2xl font-bold text-green-400">
              {bookings.filter((b) => b.status === "Delivered").length}
            </p>
          </motion.div>
        </div>

        {message && (
          <p className="text-center text-green-400 mb-4 font-semibold">
            {message}
          </p>
        )}

        {/* Booking History */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 overflow-x-auto">
          <h3 className="text-lg md:text-xl font-bold text-orange-400 mb-4">
            My Bookings
          </h3>

          {bookings.length === 0 ? (
            <p className="text-gray-400">No bookings yet.</p>
          ) : (
            <table className="w-full text-left text-gray-200 text-sm md:text-base min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-600 text-orange-300">
                  <th className="py-2 px-2">Type</th>
                  <th className="py-2 px-2">Qty</th>
                  <th className="py-2 px-2">Address</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2">Booked On</th>
                  <th className="py-2 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b border-gray-700">
                    <td className="py-2 px-2">{b.cylinderType}</td>
                    <td className="py-2 px-2">{b.quantity}</td>
                    <td className="py-2 px-2">{b.address}</td>
                    <td
                      className={`py-2 px-2 font-semibold ${
                        b.status === "Delivered"
                          ? "text-green-400"
                          : b.status === "Pending"
                          ? "text-yellow-400"
                          : b.status === "Cancelled"
                          ? "text-red-400"
                          : "text-gray-300"
                      }`}
                    >
                      {b.status}
                    </td>
                    <td className="py-2 px-2">
                      {new Date(b.bookedAt || b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-2">
                      {b.status === "Pending" && (
                        <button
                          onClick={() => handleCancel(b._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs md:text-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Booking Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
            <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md border border-white/20">
              <h3 className="text-xl font-bold text-orange-400 mb-4 text-center">
                Book LPG Cylinder
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-medium">
                    Cylinder Type
                  </label>
                  <select
                    name="cylinderType"
                    value={formData.cylinderType}
                    onChange={(e) =>
                      setFormData({ ...formData, cylinderType: e.target.value })
                    }
                    className="w-full p-3 rounded bg-black/40 border border-gray-600 text-white"
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="quantity"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full p-3 rounded bg-black/40 border border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium">
                    Delivery Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full p-3 rounded bg-black/40 border border-gray-600 text-white"
                    rows="3"
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-gray-600 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 rounded text-white font-semibold"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
