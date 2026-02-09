const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);

/* ================= SOCKET.IO (FIXED) ================= */
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

// Make io available in routes
app.set("io", io);

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

/* ================= STATIC UPLOADS ================= */
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* ================= ROUTES ================= */
const authRoutes = require("./routes/auth.routes");
const videoRoutes = require("./routes/video.routes");

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

/* ================= SOCKET EVENTS ================= */
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

/* ================= MONGODB ================= */
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/videoApp";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
