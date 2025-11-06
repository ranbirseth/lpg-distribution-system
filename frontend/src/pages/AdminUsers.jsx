import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  Trash2,
  Shield,
  LogOut,
  LayoutDashboard,
  Package,
  Users,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function AdminUsers() {
  const { logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/auth/all");
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/auth/${id}`);
      setMessage("User deleted successfully.");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      setMessage("Failed to delete user.");
    }
  };

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "customer" : "admin";
    try {
      await API.put(`/auth/${id}/role`, { role: newRole });
      setMessage(`User role changed to ${newRole}.`);
      fetchUsers();
    } catch (err) {
      console.error("Error updating role:", err);
      setMessage("Failed to update user role.");
    }
  };

  const handleLogout = () => logout();

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/70" />

      {/* Mobile Navbar */}
      <header className="md:hidden relative z-20 flex items-center justify-between p-4 bg-black/50 backdrop-blur-xl border-b border-white/20">
        <h1 className="text-xl font-bold text-orange-400">🔥 Admin Panel</h1>
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
          🔥 Admin Panel
        </h1>
        <nav className="space-y-3">
          <Link
            to="/admin"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition"
          >
            <LayoutDashboard className="text-orange-400" size={18} /> Dashboard
          </Link>
          <Link
            to="/admin/orders"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-orange-500/20 transition"
          >
            <Package className="text-orange-400" size={18} /> Manage Orders
          </Link>
          <Link
            to="/admin/users"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 py-2 px-4 rounded-lg bg-orange-500/20 transition"
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
      <main className="relative z-10 flex-1 p-4 md:p-8 overflow-x-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-orange-400 mb-6 text-center md:text-left"
        >
          Manage Users
        </motion.h2>

        {message && (
          <div className="mb-4 text-center text-sm text-green-400 font-semibold">
            {message}
          </div>
        )}

        {loading ? (
          <p className="text-gray-400 text-center">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-400 text-center">No users found.</p>
        ) : (
          <div className="overflow-x-auto bg-white/10 border border-white/20 rounded-2xl shadow-lg">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="bg-white/10 text-orange-300">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-b border-gray-700 hover:bg-white/5 transition"
                  >
                    <td className="py-3 px-4 break-words">{u.name}</td>
                    <td className="py-3 px-4 break-words">{u.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          u.role === "admin"
                            ? "bg-blue-600/30 text-blue-300"
                            : "bg-yellow-600/30 text-yellow-300"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">{u.phone || "—"}</td>
                    <td className="py-3 px-4 max-w-[200px] truncate">
                      {u.address || "—"}
                    </td>
                    <td className="py-3 px-4 text-center flex gap-3 justify-center">
                      <button
                        onClick={() => toggleRole(u._id, u.role)}
                        className="text-blue-400 hover:text-blue-300"
                        title="Toggle Role"
                      >
                        <Shield size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="text-red-400 hover:text-red-300"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
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
