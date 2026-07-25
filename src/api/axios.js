import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("ce_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 — clear session and redirect to login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("ce_token");
      localStorage.removeItem("ce_user");
      // Only redirect if not already on auth pages
      const authPages = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];
      if (!authPages.some((p) => window.location.pathname.startsWith(p))) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;