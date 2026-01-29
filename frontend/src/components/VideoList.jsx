

import { useEffect, useState } from "react";
import API from "../api/api";
import VideoPlayer from "./VideoPlayer";

function VideoList({ refreshTrigger }) {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await API.get("/videos/user");
      setVideos(res.data.videos);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [refreshTrigger]); // refresh when new video uploaded

  return (
    <div className="section">
      <h2>Your Videos</h2>
      {videos.length === 0 && <p>No videos uploaded yet.</p>}
      {videos.map((v) => (
        <div key={v._id} className="video-row">
          <VideoPlayer video={v} />
        </div>
      ))}
    </div>
  );
}

export default VideoList;

