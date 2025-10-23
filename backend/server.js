import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Sample route
app.get("/", (req, res) => {
  res.send("LPG Backend is running... on port " + PORT);
 
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
