
// import { useState, useEffect } from "react";
// import API from "./api/api";
// import UploadVideo from "./components/UploadVideo";
// import VideoList from "./components/VideoList";
// import "./App.css";

// function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [token, setToken] = useState(null);
//   const [message, setMessage] = useState("");
//   const [refreshVideos, setRefreshVideos] = useState(0);

//   // Initialize token from localStorage
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) setToken(savedToken);
//   }, []);

//   // Login handler
//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", { email, password });
//       const jwt = res.data.token;
//       localStorage.setItem("token", jwt);
//       setToken(jwt);
//       setMessage("Login successful!");
//       setEmail("");
//       setPassword("");
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Login failed");
//     }
//   };

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setMessage("");
//   };

//   // Login form
//   if (!token) {
//     return (
//       <div className="app-wrapper">
//         <div className="container login-container">
//           <h1>Login</h1>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button onClick={handleLogin}>Login</button>
//           {message && <p className="message">{message}</p>}
//         </div>
//       </div>
//     );
//   }

//   // Dashboard
//   return (
//     <div className="app-wrapper">
//       <div className="container dashboard-container">
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//         <h1>Video Dashboard</h1>
//         <UploadVideo onUploadSuccess={() => setRefreshVideos((prev) => prev + 1)} />
//         <VideoList refreshTrigger={refreshVideos} />
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import API from "./api/api";
import UploadVideo from "./components/UploadVideo";
import VideoList from "./components/VideoList";
import "./App.css";

function App() {
  const [isRegister, setIsRegister] = useState(false); // toggle
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState("");
  const [refreshVideos, setRefreshVideos] = useState(0);

  // Initialize token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // Login/Register handler
  const handleSubmit = async () => {
    try {
      let res;
      if (isRegister) {
        res = await API.post("/auth/register", { name, email, password });
      } else {
        res = await API.post("/auth/login", { email, password });
      }

      const jwt = res.data.token;
      localStorage.setItem("token", jwt);
      setToken(jwt);
      setMessage(`${isRegister ? "Registration" : "Login"} successful!`);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setMessage("");
  };

  // If not logged in → show login/register form
  if (!token) {
    return (
      <div className="app-wrapper">
        <div className="container login-container">
          <h1>{isRegister ? "Register" : "Login"}</h1>
          {isRegister && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleSubmit}>{isRegister ? "Register" : "Login"}</button>
          {message && <p className="message">{message}</p>}

          <p style={{ marginTop: "15px" }}>
            {isRegister ? "Already have an account?" : "New user?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setMessage("");
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#4f46e5",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="app-wrapper">
      <div className="container dashboard-container">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <h1>Video Dashboard</h1>
        <UploadVideo onUploadSuccess={() => setRefreshVideos((prev) => prev + 1)} />
        <VideoList refreshTrigger={refreshVideos} />
      </div>
    </div>
  );
}

export default App;
