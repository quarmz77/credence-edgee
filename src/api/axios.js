import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send cookies with every request
  headers: {
    "Content-Type": "application/json",
  },
});

// ── CSRF: attach the double-submit token for state-changing requests ──────────
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

API.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase();
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const csrfToken = getCookie("csrfToken");
    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken;
    }
  }
  return config;
});

// ── 401 handler: attempt silent refresh, then give up ────────────────────────
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Only intercept 401s that haven't already been retried
    // and are not coming from the login / refresh / register endpoints
    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !original.url?.includes("/auth/login") &&
      !original.url?.includes("/auth/refresh") &&
      !original.url?.includes("/auth/register")
    ) {
      // Queue requests that arrive while a refresh is already in flight
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => API(original))
          .catch((err) => Promise.reject(err));
      }

      original._retry = true;
      isRefreshing = true;

      try {
        await API.post("/auth/refresh");
        isRefreshing = false;
        processQueue(null);
        return API(original); // retry the original request
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);

        // Don't redirect when on auth pages or when /auth/me fails on startup
        const authPages = [
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/verify-email",
          "/verify-otp",
        ];
        const isAuthMeRequest = original.url?.includes("/auth/me");

        if (
          !isAuthMeRequest &&
          !authPages.some((p) => window.location.pathname.startsWith(p))
        ) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
