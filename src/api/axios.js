import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const API = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Attach token automatically
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("ce_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API