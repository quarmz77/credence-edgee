import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // <-- IMPORTANT
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle 401 — redirect to login
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authPages = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/verify-email",
        "/verify-otp",
      ];

      // Don't redirect from /auth/me — AuthContext handles that itself on mount
      const isAuthMeRequest = error.config?.url?.includes("/auth/me");

      if (
        !isAuthMeRequest &&
        !authPages.some((p) => window.location.pathname.startsWith(p))
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default API;
