// const express = require("express");
// const upload = require("../utils/upload");
// const Video = require("../models/video");
// const authMiddleware = require("../middleware/auth.middleware");

// const router = express.Router();

// router.post(
//   "/upload",
//   authMiddleware,
//   upload.single("video"),
//   async (req, res) => {
//     if (!req.file)
//       return res.status(400).json({ message: "No file uploaded" });

//     const video = await Video.create({
//       filename: req.file.filename,
//       originalName: req.file.originalname,
//       path: req.file.path,
//       userId: req.user._id,
//     });

//     res.status(201).json({
//       message: "Video uploaded successfully",
//       video,
//     });
//   }
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/auth.middleware.js"); // ✅ updated
const Video = require("../models/video");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload video
router.post("/upload", authMiddleware, upload.single("video"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

   const video = new Video({
  user: req.user.id,
  path: `/uploads/${req.file.filename}`,   // ✅ now schema supports it
  originalName: req.file.originalname,
});


    await video.save();
    res.json({ message: "Video uploaded successfully", video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all videos for logged-in user
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ videos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


