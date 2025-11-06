import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, User, LogOut, Flame } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function CustomerDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cylinderType: "Domestic",
    quantity: 1,
    address: "",
  });
  const [message, setMessage] = useState("");

  // Fetch customer bookings
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

  // Submit booking form
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

  const handleLogout = () => logout();

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white overflow-hidden">
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

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition w-full text-left"
          >
            <Flame className="text-orange-400" size={18} /> Book Cylinder
          </button>

          <Link
            to="/profile"
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
      <main className="relative z-10 flex-1 p-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-orange-400 mb-8"
        >
          Welcome, {user?.name}
        </motion.h2>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-gray-300">Total Orders</h3>
            <p className="text-2xl font-bold text-orange-400">
              {bookings.length}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-gray-300">Pending</h3>
            <p className="text-2xl font-bold text-yellow-400">
              {bookings.filter((b) => b.status === "Pending").length}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg"
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

        {/* Booking History Table */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-orange-400 mb-4">
            My Bookings
          </h3>
          {bookings.length === 0 ? (
            <p className="text-gray-400">No bookings yet.</p>
          ) : (
            <table className="w-full text-left text-gray-200">
              <thead>
                <tr className="border-b border-gray-600 text-orange-300">
                  <th className="py-2">Type</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Address</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Booked On</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b border-gray-700">
                    <td className="py-2">{b.cylinderType}</td>
                    <td className="py-2">{b.quantity}</td>
                    <td className="py-2">{b.address}</td>
                    <td
                      className={`py-2 font-semibold ${
                        b.status === "Delivered"
                          ? "text-green-400"
                          : b.status === "Pending"
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      {b.status}
                    </td>
                    <td className="py-2">
                      {new Date(b.bookedAt || b.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Booking Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md border border-white/20">
              <h3 className="text-xl font-bold text-orange-400 mb-4">
                Book LPG Cylinder
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                  required
                >
                  <option value="Domestic">Domestic</option>
                  <option value="Commercial">Commercial</option>
                </select>

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
                  placeholder="Quantity"
                  required
                />

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
                  placeholder="Delivery Address"
                  required
                />

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
                    Confirm Booking
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
