// backend/routes/bookingRoutes.js
import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ POST /api/bookings  →  Create new booking (Customer)
router.post("/", protect, async (req, res) => {
  try {
    const { cylinderType, quantity, address } = req.body;

    if (!cylinderType || !address) {
      return res.status(400).json({ message: "Cylinder type and address required." });
    }

    const booking = await Booking.create({
      customer: req.user.id,
      cylinderType,
      quantity: quantity || 1,
      address,
      status: "Pending",
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking failed, please try again." });
  }
});

// ✅ GET /api/bookings/my  →  Get bookings of logged-in user
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Fetch customer bookings error:", error);
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
});

// ✅ GET /api/bookings/all  →  Get all bookings (Admin only)
router.get("/all", protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "name email address phone")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Admin fetch bookings error:", error);
    res.status(500).json({ message: "Failed to fetch all bookings." });
  }
});

// ✅ PUT /api/bookings/:id/status  →  Update booking status (Admin only)
router.put("/:id/status", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: "Status updated successfully", booking });
  } catch (error) {
    console.error("Update booking status error:", error);
    res.status(500).json({ message: "Failed to update booking status." });
  }
});

// ✅ PUT /api/bookings/:id/cancel → Cancel a booking (Customer)
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Make sure the logged-in user owns this booking
    if (booking.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only cancel your own bookings" });
    }

    // Only pending bookings can be cancelled
    if (booking.status !== "Pending") {
      return res.status(400).json({ message: "Only pending bookings can be cancelled" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});


export default router;
