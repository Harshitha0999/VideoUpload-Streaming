const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  path: {
    type: String,
    required: true,
  },

  originalName: {
    type: String,
    required: true,
  },

  // ✅ NEW: processing status
  status: {
    type: String,
    enum: ["processing", "safe", "flagged"],
    default: "processing",
  },

  // ✅ NEW: processing progress (0–100)
  progress: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Video", videoSchema);


