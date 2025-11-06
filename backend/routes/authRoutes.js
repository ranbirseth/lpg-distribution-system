import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// 🟢 Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🟡 Customer routes
router.get("/profile", protect, getProfile);

// 🟢 Update logged-in user's profile
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.address = req.body.address || user.address;
    user.phone = req.body.phone || user.phone;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      phone: updatedUser.phone,
      role: updatedUser.role,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// 🔴 Admin-only: Get all registered users
router.get("/all", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// 🔴 Admin-only: Delete a user
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "admin")
      return res.status(403).json({ message: "Cannot delete another admin" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// 🔴 Admin-only: Update a user role (optional)
router.put("/:id/role", protect, admin, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();
    res.json({ message: "User role updated successfully", user });
  } catch (err) {
    console.error("Update role error:", err);
    res.status(500).json({ message: "Failed to update role" });
  }
});

export default router;
