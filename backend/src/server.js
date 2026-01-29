// const express = require("express");
// const path = require("path");
// const cors = require("cors");
// require("dotenv").config();

// const connectDB = require("./config/db");

// const authRoutes = require("./routes/auth.routes");
// const videoRoutes = require("./routes/video.routes");

// const app = express();

// // DB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Static uploads
// app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/videos", videoRoutes);

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: err.message || "Server Error" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config(); // load .env file
const app = express();

// Middleware

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // serve uploaded videos

// Routes
const authRoutes = require("./routes/auth.routes");
const videoRoutes = require("./routes/video.routes");

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/videoApp";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use port from .env or fallback to 5001
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
