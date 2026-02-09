

const Video = require("../models/video");

const processVideo = async (videoId, io) => {
  let progress = 0;

  const interval = setInterval(async () => {
    progress += 10;

    // ✅ Update DB
    await Video.findByIdAndUpdate(videoId, {
      progress,
      status: "processing",
    });

    // ✅ Emit progress
    io.emit("video-progress", {
      videoId,
      progress,
    });

    if (progress >= 100) {
      clearInterval(interval);

      const finalStatus = Math.random() > 0.3 ? "safe" : "flagged";

      await Video.findByIdAndUpdate(videoId, {
        progress: 100,
        status: finalStatus,
      });

      io.emit("video-completed", {
        videoId,
        status: finalStatus,
      });
    }
  }, 500);
};

module.exports = { processVideo };


// const processVideo = (videoId, filePath, io) => {
//   let progress = 0;

//   const interval = setInterval(() => {
//     progress += 10;

//     io.emit("video-progress", {
//       videoId,
//       progress
//     });

//     if (progress >= 100) {
//       clearInterval(interval);

//       io.emit("video-completed", {
//         videoId,
//         status: Math.random() > 0.3 ? "safe" : "flagged",
//       });
//     }
//   }, 500);
// };

// module.exports = { processVideo };
