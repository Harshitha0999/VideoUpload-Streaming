function VideoPlayer({ video }) {
  const videoUrl = `http://localhost:5002${video.path}`;

  return (
    <div className="video-player">
      <h4>{video.originalName}</h4>
      <video
        width="100%"
        height="360"
        controls
        preload="metadata"
        src={videoUrl}
      />
    </div>
  );
}

export default VideoPlayer;

