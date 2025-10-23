import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Package, LayoutDashboard, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/70" />

      <aside className="relative z-10 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6">
        <h1 className="text-2xl font-bold text-orange-400 mb-6">🔥 Admin Panel</h1>
        <nav className="space-y-3">
          <Link className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition">
            <LayoutDashboard className="text-orange-400" size={18} /> Dashboard
          </Link>
          <Link className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition">
            <Users className="text-orange-400" size={18} /> Manage Users
          </Link>
          <Link className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition">
            <Package className="text-orange-400" size={18} /> Manage Orders
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 py-2 px-4 rounded-lg text-red-400 hover:bg-red-500/20 transition w-full text-left"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      <main className="relative z-10 flex-1 p-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl font-bold text-orange-400 mb-8">
          Admin Dashboard
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg">
            <h3 className="text-gray-300">Total Customers</h3>
            <p className="text-2xl font-bold text-orange-400">150</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg">
            <h3 className="text-gray-300">Active Orders</h3>
            <p className="text-2xl font-bold text-yellow-400">20</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg">
            <h3 className="text-gray-300">Revenue</h3>
            <p className="text-2xl font-bold text-green-400">₹ 85,000</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
