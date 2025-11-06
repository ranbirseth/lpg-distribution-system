// backend/controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, address, phone } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required." });
    }

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // ✅ Restrict admin registration
    if (role === "admin") {
      if (
        email !== process.env.ADMIN_EMAIL ||
        adminCode !== process.env.ADMIN_SECRET
      ) {
        return res.status(403).json({ message: "Invalid admin credentials." });
      }
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Create user with role
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "customer", // default to customer if role not provided
      address,
      phone,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("registerUser error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// Login existing user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials." });

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("loginUser error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};

// Get profile for logged-in user
export const getProfile = async (req, res) => {
  try {
    // authMiddleware should set req.user
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });

    res.json(user);
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ message: "Server error." });
  }
};
