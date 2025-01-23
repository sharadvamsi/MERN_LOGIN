const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
 // Load environment variables


const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [process.env.CLIENT_URL],
  methods: ["GET", "POST"], // Allowed methods
}))


// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
