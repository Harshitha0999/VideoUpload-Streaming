function VideoPlayer({ videoId }) {
  if (!videoId) return null;

  return (
    <video
      id={`video-${videoId}`}
      controls
      preload="metadata"
      src={`http://localhost:5002/api/videos/stream/${videoId}`}
      style={{
        width: "100%",
        borderRadius: "12px",
        background: "#000",
        marginTop: "10px",
      }}
    />
  );
}

export default VideoPlayer;

// function VideoPlayer({ videoId }) {
//   if (!videoId) return null;

//   return (
//     <video
//       controls
//       preload="metadata"
//       src={`http://localhost:5002/api/videos/stream/${videoId}`}
//       style={{
//         width: "100%",
//         borderRadius: "10px",
//         background: "#000",
//       }}
//     />
//   );
// }

// export default VideoPlayer;

