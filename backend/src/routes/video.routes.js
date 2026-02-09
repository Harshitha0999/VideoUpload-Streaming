const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const authMiddleware = require("../middleware/auth.middleware");
const Video = require("../models/video");

const router = express.Router();

/* ================= MULTER SETUP ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= GET USER VIDEOS ================= */
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ videos });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
});

/* ================= STREAM VIDEO (PUBLIC) ================= */
// ❗ NO authMiddleware here
router.get("/stream/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).end();

    const videoPath = path.join(__dirname, "../../uploads", video.path);
    if (!fs.existsSync(videoPath)) return res.status(404).end();

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": end - start + 1,
        "Content-Type": "video/mp4",
      });

      fs.createReadStream(videoPath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      });

      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (err) {
    console.error("STREAM ERROR:", err);
    res.sendStatus(500);
  }
});

/* ================= DELETE VIDEO ================= */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!video) return res.status(404).json({ message: "Video not found" });

    const videoPath = path.join(__dirname, "../../uploads", video.path);
    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);

    await video.deleteOne();
    res.json({ message: "Video deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

/* ================= UPLOAD VIDEO ================= */
router.post(
  "/upload",
  authMiddleware,
  upload.single("video"),
  async (req, res) => {
    const io = req.app.get("io");

    const video = await Video.create({
      user: req.user.id,
      path: req.file.filename,
      originalName: req.file.originalname,
      status: "processing",
      progress: 0,
    });

    let progress = 0;

    const interval = setInterval(async () => {
      progress += 20;

      if (progress >= 100) {
        clearInterval(interval);
        video.progress = 100;
        video.status = Math.random() > 0.2 ? "safe" : "flagged";
      } else {
        video.progress = progress;
      }

      await video.save();

      io.emit("videoUpdate", {
        videoId: video._id,
        progress: video.progress,
        status: video.status,
      });
    }, 1000);

    res.json({ message: "Upload started", video });
  }
);

module.exports = router;
