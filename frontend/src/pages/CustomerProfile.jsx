import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, LogOut, Menu } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function CustomerProfile() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/70" />

      {/* Mobile Top Bar */}
      <div className="relative z-20 md:hidden flex items-center justify-between p-4 bg-black/40 backdrop-blur-md border-b border-white/20">
        <h1 className="text-xl font-bold text-orange-400">🔥 LPG System</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-orange-400 focus:outline-none"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`relative z-10 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 w-64 transform transition-transform duration-300 md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:block md:translate-x-0 fixed top-0 left-0 h-full`}
      >
        <h1 className="hidden md:block text-2xl font-bold text-orange-400 mb-6">
          🔥 LPG System
        </h1>
        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition"
            onClick={() => setMenuOpen(false)}
          >
            <LayoutDashboard className="text-orange-400" size={18} /> Dashboard
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 py-2 px-4 rounded-lg text-red-400 hover:bg-red-500/20 transition w-full text-left"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-6 sm:p-8 mt-4 md:mt-0">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-orange-400 mb-6 text-center md:text-left"
        >
          My Profile
        </motion.h2>

        {message && (
          <p
            className={`text-center mb-4 font-semibold ${
              message.includes("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg space-y-4"
        >
          <div>
            <label className="block text-gray-300 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #f97316" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-semibold tracking-wide transition"
            type="submit"
          >
            Update Profile
          </motion.button>
        </form>
      </main>
    </div>
  );
}
