
import { useState } from "react";
import API from "../api/api";

function UploadVideo({ onUploadSuccess }) {
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => setVideo(e.target.files[0]);

  const handleUpload = async () => {
    if (!video) return alert("Select a video first");

    const formData = new FormData();
    formData.append("video", video);

    try {
      const res = await API.post("/videos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Upload successful");

      setVideo(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="section">
      <h2>Upload Video</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadVideo;
