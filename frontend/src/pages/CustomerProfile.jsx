import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, LogOut } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function CustomerProfile() {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/auth/profile");
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put("/auth/profile", profile);
      setMessage("✅ Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      setMessage("❌ Failed to update profile");
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
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 px-4 rounded-lg text-red-400 hover:bg-red-500/20 transition w-full text-left"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="relative z-10 flex-1 p-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-orange-400 mb-6"
        >
          My Profile
        </motion.h2>

        {message && (
          <p className="text-center text-green-400 mb-4 font-semibold">{message}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg space-y-4"
        >
          <div>
            <label className="block text-gray-300 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-black/40 border border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full p-3 rounded bg-black/40 border border-gray-600 text-white"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full p-3 rounded bg-black/40 border border-gray-600 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg"
          >
            Update Profile
          </button>
        </form>
      </main>
    </div>
  );
}
