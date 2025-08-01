# LPG Distribution System 🚚🔥

A modern web-based system that allows users to book LPG cylinders online, track their delivery status, and manage bookings. Built with the MERN stack and designed for scalability, security, and user convenience.

---

## 📌 Project Overview

- Customers can book LPG cylinders and track their delivery status.
- Admins manage bookings, cylinder stock, delivery updates, and upload receipts/documents.

---

## 👥 User Roles & Features

### Customer
- Register/Login
- Book LPG Cylinder
- Track Booking Status
- View Order History

### Admin
- Manage All Bookings
- Update Delivery Status
- Manage Cylinder Stock
- Upload/View Receipts
- View Booking Dashboard Stats

---

## 🧱 Tech Stack

### 🔹 Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- React Icons
- React Toastify
- Chart.js or Recharts
- Formik + Yup (optional)

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT or express-session
- Multer (file uploads)
- bcryptjs
- dotenv
- cors
- Postman (for API testing)

---

## 🧩 System Architecture

1. React frontend interacts with backend via Axios
2. Express.js handles business logic and API routing
3. MongoDB stores user, booking, and stock data
4. JWT/session used for role-based authentication
5. Multer handles file uploads (PDF/image receipts)
6. Admin dashboard visualizes data using charts and summaries

---

## 🧾 Core MongoDB Models

### User
```js
{
  name, email, password, role, phone, address
}
