import Booking from "../models/Booking.js";

// @desc Create new booking
// @route POST /api/bookings
// @access Private (Customer)
export const createBooking = async (req, res) => {
  try {
    const { cylinderType, quantity, address } = req.body;
    const booking = await Booking.create({
      customer: req.user.id,
      cylinderType,
      quantity,
      address,
    });
    res.status(201).json(booking);
  } catch (err) {
    console.error("Create booking error:", err);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

// @desc Get all bookings of logged-in customer
// @route GET /api/bookings/my
// @access Private (Customer)
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Get bookings error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// @desc Admin: get all bookings
// @route GET /api/bookings
// @access Private (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("customer", "name email");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all bookings" });
  }
};

// @desc Admin: update booking status
// @route PUT /api/bookings/:id/status
// @access Private (Admin)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: "Status updated successfully", booking });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ message: "Failed to update booking status" });
  }
};
