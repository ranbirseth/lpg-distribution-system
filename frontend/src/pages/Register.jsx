// src/pages/Register.jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Key } from "lucide-react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    adminCode: "", // 🧠 for secret code
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🧩 Prevent empty adminCode if role = admin
    if (form.role === "admin" && !form.adminCode) {
      return setError("Admin secret code is required.");
    }

    try {
      const { data } = await API.post("/auth/register", form);

      login(data);
      const userRole = data.role || data.user?.role;

      if (userRole === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-4xl font-bold text-center text-orange-400 mb-6 tracking-wide">
            Create Account
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="relative">
              <User className="absolute left-3 top-3 text-orange-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-orange-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-orange-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
                required
              />
            </div>

            {/* 🧠 Role dropdown */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-orange-400" />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
              >
                <option value="customer" className="text-black">
                  Customer
                </option>
                <option value="admin" className="text-black">
                  Admin
                </option>
              </select>
            </div>

            {/* 🧩 Show secret code field only when role=admin */}
            {form.role === "admin" && (
              <div className="relative">
                <Key className="absolute left-3 top-3 text-orange-400" />
                <input
                  type="text"
                  name="adminCode"
                  placeholder="Enter Admin Secret Code"
                  value={form.adminCode}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
                  required={form.role === "admin"}
                />
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #f97316" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-semibold tracking-wide transition"
            >
              Register
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/" className="text-orange-400 hover:underline">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
