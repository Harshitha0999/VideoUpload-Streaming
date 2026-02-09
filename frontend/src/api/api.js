import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api", // backend port
});

// Attach token automatically to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle invalid/expired tokens
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.reload(); // force login page
    }
    return Promise.reject(err);
  }
);

export default API;
