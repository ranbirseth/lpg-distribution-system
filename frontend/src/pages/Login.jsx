import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h1 className="text-4xl font-bold text-center text-orange-400 mb-6 tracking-wide">
            Gas Agency Login
          </h1>

          <form className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-orange-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-3 text-orange-400" />
              <input
                type="text"
                placeholder="Customer ID"
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-orange-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-black/40 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500 outline-none transition"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #f97316" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-semibold tracking-wide transition"
            >
              Login
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Forgot your password?{" "}
            <a href="#" className="text-orange-400 hover:underline">
              Reset here
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
