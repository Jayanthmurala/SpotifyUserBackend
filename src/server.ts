// IMPORTS
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/config/db.connetion.js";
import UserRoutes from "./routes/route.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();
// Initialize Express app
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Import Routes
app.use("/api/v1", UserRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to Spotify🎧 User Server🫡.");
});
//  Serever Setup and Database Connection
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Import database connection
  connectDB();
});
