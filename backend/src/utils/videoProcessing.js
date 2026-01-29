const processVideo = (videoId, filePath, io) => {
  let progress = 0;

  const interval = setInterval(() => {
    progress += 10;

    io.emit("video-progress", {
      videoId,
      progress,
    });

    if (progress >= 100) {
      clearInterval(interval);

      io.emit("video-completed", {
        videoId,
        status: Math.random() > 0.3 ? "safe" : "flagged",
      });
    }
  }, 500);
};

module.exports = { processVideo };
