// backend/routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // ✅ Fixed import
import User from "../models/User.js";

const router = express.Router();

// 🟢 Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🟡 Protected routes
router.get("/profile", protect, getProfile);

// 🔴 Admin-only: Get all registered users
router.get("/all", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;
