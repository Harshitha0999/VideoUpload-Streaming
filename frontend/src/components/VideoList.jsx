import VideoPlayer from "./VideoPlayer";

export default function VideoList({ videos, onDelete }) {
  if (!videos.length) {
    return <p style={{ opacity: 0.6 }}>No videos found.</p>;
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <div key={video._id} className="video-card">
          <div className="video-info">
            <h3>{video.originalName}</h3>

            <span className={`status-badge ${video.status}`}>
              {video.status}
            </span>
          </div>

          <VideoPlayer videoId={video._id} />

          <div className="video-actions">
            <button
              className="delete-btn"
              onClick={() => onDelete(video._id)}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import API from "../api/api";
// import VideoPlayer from "./VideoPlayer";

// export default function VideoList({ refreshTrigger, search }) {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     API.get("/videos/user").then((res) => {
//       setVideos(res.data.videos || []);
//     });
//   }, [refreshTrigger]);

//   const handleDelete = async (id) => {
//     try {
//       await API.delete(`/videos/${id}`);
//       setVideos((prev) => prev.filter((v) => v._id !== id));
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   const filtered = videos.filter((v) =>
//     v.originalName.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="video-grid">
//       {filtered.map((video) => (
//         <div key={video._id} className="video-card">
//           <h3>{video.originalName}</h3>

//           {video.status === "processing" ? (
//             <p>Processing... {video.progress}%</p>
//           ) : (
//             <span className={`status-badge ${video.status}`}>
//               {video.status}
//             </span>
//           )}

//           <VideoPlayer videoId={video._id} />

//           <div className="video-actions">
//             <button className="delete-btn" onClick={() => handleDelete(video._id)}>
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
