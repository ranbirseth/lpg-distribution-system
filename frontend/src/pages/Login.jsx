// src/pages/Login.jsx
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      login(data);

      const userRole = data.role || data.user?.role;
      if (userRole === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  // Auto redirect if already logged in
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const role = savedUser?.role || savedUser?.user?.role;
    if (role === "admin") navigate("/admin");
    else if (role === "customer") navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl mx-auto py-8">
        
        {/* Optional illustration / text (hidden on mobile) */}
        <div className="hidden md:flex flex-col items-start text-left text-white w-1/2 space-y-4">
          <h1 className="text-3xl lg:text-5xl font-bold text-orange-400">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
            Log in to your account to manage your LPG bookings, deliveries, 
            and customer details with ease.
          </p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-orange-400 mb-6 tracking-wide">
            Gas Agency Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-orange-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-orange-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
                required
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #f97316" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-semibold tracking-wide transition"
              type="submit"
            >
              Login
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-orange-400 hover:underline">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
