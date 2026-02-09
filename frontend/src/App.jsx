import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import API from "./api/api";
import UploadVideo from "./components/UploadVideo";
import VideoList from "./components/VideoList";
import "./App.css";

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("User");

  const [activeTab, setActiveTab] = useState("home");
  const [settingsTab, setSettingsTab] = useState("dashboard");

  const [search, setSearch] = useState("");        // input value
  const [searchQuery, setSearchQuery] = useState(""); // applied search
  const [refreshVideos, setRefreshVideos] = useState(0);
  const [videos, setVideos] = useState([]);

  /* ================= SOCKET ================= */
  useEffect(() => {
    const socket = io("http://localhost:5002", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("videoUpdate", () => setRefreshVideos((p) => p + 1));

    return () => socket.disconnect();
  }, []);

  /* ================= INIT ================= */
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    const savedRole = localStorage.getItem("role") || "User";

    if (savedToken) setToken(savedToken);
    if (savedEmail) setEmail(savedEmail);
    setRole(savedRole);
  }, []);

  /* ================= FETCH VIDEOS ================= */
  useEffect(() => {
    if (!token) return;
    API.get("/videos/user").then((res) => {
      setVideos(res.data.videos || []);
    });
  }, [token, refreshVideos]);

  /* ================= AUTH ================= */
  const handleSubmit = async () => {
    try {
      const res = isRegister
        ? await API.post("/auth/register", { name, email, password })
        : await API.post("/auth/login", { email, password });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);

      setToken(token);
      setEmail(user.email);
      setRole(user.role);
      setMessage("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
  };

  /* ================= LOGIN ================= */
  /* ...keep the rest of the code above as-is... */

/* ================= LOGIN ================= */
if (!token) {
  return (
    <div className="app-wrapper auth-bg">
      <div className="login-container">
        <div className="login-left">
          <h1>Welcome to Video Upload & Streaming Platform</h1>
          <p>Upload, watch, and manage your videos seamlessly.</p>
          <img
            src="/login-image.png" // Put your background or illustration image in public folder
            alt="Video streaming"
            className="login-image"
          />
        </div>

        <div className="login-right">
          <h2>{isRegister ? "Register" : "Login"}</h2>

          {isRegister && (
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleSubmit}>
            {isRegister ? "Register" : "Login"}
          </button>

          {message && <p className="message">{message}</p>}

          <span
            className="toggle-auth"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "New user? Register"}
          </span>
        </div>
      </div>
    </div>
  );
}


  /* ================= DATA ================= */
  const safeCount = videos.filter((v) => v.status === "safe").length;
  const flaggedCount = videos.filter((v) => v.status === "flagged").length;
  const processingCount = videos.filter((v) => v.status === "processing").length;
  const recentVideos = [...videos].slice(-5).reverse();

  /* ================= SEARCH ================= */
  const handleSearch = () => setSearchQuery(search.trim().toLowerCase());

  const filteredVideos = videos.filter((v) => {
    const q = searchQuery;
    return (
      v.originalName.toLowerCase().includes(q) ||
      v.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="app-wrapper">
      <div className="dashboard-shell">
        {/* ===== SIDEBAR ===== */}
        <aside className="sidebar">
          <h2>🎥 Video App</h2>

          <div className="search-box">
            <input
              placeholder="Search by name or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button className="search-btn" onClick={handleSearch}>
              🔍
            </button>
          </div>

          <button onClick={() => setActiveTab("home")}>🏠 Home</button>
          <button className="btn-blue" onClick={() => setActiveTab("uploads")}>
            ⬆ Upload
          </button>
          <button onClick={() => setActiveTab("videos")}>🎬 My Videos</button>
          <button onClick={() => setActiveTab("settings")}>⚙ Settings</button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="main-content">
          {/* HOME */}
          {activeTab === "home" && (
            <>
              <h2 className="page-title">Home</h2>

              <div className="dashboard-cards">
                <div className="dash-card">
                  <p>Total Videos</p>
                  <h1>{videos.length}</h1>
                </div>
                <div className="dash-card">
                  <p>Safe</p>
                  <h1 className="safe">{safeCount}</h1>
                </div>
                <div className="dash-card">
                  <p>Flagged</p>
                  <h1 className="flagged">{flaggedCount}</h1>
                </div>
                <div className="dash-card">
                  <p>Processing</p>
                  <h1 className="processing">{processingCount}</h1>
                </div>
              </div>

              <h3 className="section-title">Recent Uploads</h3>
              <div className="recent-list">
                {recentVideos.map((v) => (
                  <div key={v._id} className="recent-item">
                    <span>{v.originalName}</span>
                    <span className={`status-badge ${v.status}`}>
                      {v.status}
                    </span>
                  </div>
                ))}
              </div>

              {searchQuery && (
                <>
                  <h3 className="section-title">Search Results</h3>
                  <VideoList
                    videos={filteredVideos}
                    onDelete={async (id) => {
                      await API.delete(`/videos/${id}`);
                      setVideos((prev) => prev.filter((v) => v._id !== id));
                    }}
                  />
                </>
              )}
            </>
          )}

          {/* UPLOAD */}
          {activeTab === "uploads" && (
            <>
              <button className="back-btn" onClick={() => setActiveTab("home")}>
                ⬅ Back to Home
              </button>
              <UploadVideo onUploadSuccess={() => setRefreshVideos((p) => p + 1)} />
            </>
          )}

          {/* VIDEOS */}
          {activeTab === "videos" && (
            <>
              <button className="back-btn" onClick={() => setActiveTab("home")}>
                ⬅ Back to Home
              </button>
              <VideoList
                videos={filteredVideos}
                onDelete={async (id) => {
                  await API.delete(`/videos/${id}`);
                  setVideos((prev) => prev.filter((v) => v._id !== id));
                }}
              />
            </>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <>
              <button className="back-btn" onClick={() => setActiveTab("home")}>
                ⬅ Back to Home
              </button>

              <div className="settings-layout">
                <div className="settings-menu">
                  <button onClick={() => setSettingsTab("dashboard")}>📊 Dashboard</button>
                  <button onClick={() => setSettingsTab("account")}>🔒 Account</button>
                </div>

                <div className="settings-box">
                  {settingsTab === "dashboard" && <p>Dashboard preferences coming soon</p>}

                  {settingsTab === "account" && (
                    <>
                      <h3>Account Security</h3>
                      <p><b>Email:</b> {email}</p>
                      <p><b>Role:</b> {email === "test@example.com" ? "Admin" : role}</p>
                      <p><b>Password:</b> ••••••</p>

                      <input
                        type="password"
                        placeholder="Current password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        onChange={(e) => setName(e.target.value)}
                      />

                      <button
                        className="btn-blue"
                        onClick={() => {
                          if (!password || !name) return alert("Fill all fields");
                          alert("Password changed (frontend mock)");
                          setPassword("");
                          setName("");
                        }}
                      >
                        Change Password
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
