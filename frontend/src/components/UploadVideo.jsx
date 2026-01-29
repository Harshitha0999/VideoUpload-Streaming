// import { useState } from "react";
// import api from "../api/api";

// function UploadVideo() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a video first");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("video", file);

//     try {
//       const res = await api.post("/videos/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setMessage(res.data.message);
//     } catch (err) {
//       console.error(err);
//       setMessage("Upload failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Video</h2>
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <button onClick={handleUpload}>Upload</button>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default UploadVideo;

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
      setMessage(res.data.message);
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
