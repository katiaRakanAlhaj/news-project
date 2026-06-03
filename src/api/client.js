// src/api/axios.js or axios.ts
import axios from "axios";
import i18n from "../component/i18n";

const api = axios.create({
    baseURL: "http://s5.hostorr.net/api", // Should be your real API base URL
});

// Add the lang header dynamically to every request
api.interceptors.request.use((config) => {
    config.headers["lang"] = i18n.language || "ar"; // or "ar"
    return config;
});

export default api;