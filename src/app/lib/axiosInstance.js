import axios from "axios";
import { showLoading, hideLoading } from "../utils/loadingState"; // Utility functions for loading state

const api = axios.create({
  baseURL: "https://dakshhousing.com/satsambhav/websiteapi",
});

// Logout Function
const handleLogout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("authToken");
  localStorage.removeItem("formData");
  window.location.href = "/login"; // Redirect to login page
};

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    showLoading(); // Show loader on request start
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";
    const userId = localStorage.getItem("idToken");
    const formData = JSON.parse(localStorage.getItem("formData") || "{}");

    config.headers["language"] = selectedLanguage;
    config.headers["User_id"] = userId;
    config.headers["User_type"] = userId ? "user" : "guest";
    config.headers["Device_id"] = "upen";
    config.headers["Longitude"] = formData.Longitude || "";
    config.headers["Latitude"] = formData.Latitude || "";
    config.headers["Ip_address"] = formData.Ip_address || "";
    config.headers["web_token"] = localStorage.getItem("authToken");

    return config;
  },
  (error) => {
    hideLoading(); // Hide loader on request error
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    hideLoading(); // Hide loader on response success
    if (response.data.status === "0" && response.data.message === "Invalid token") {
      handleLogout();
    }
    return response;
  },
  (error) => {
    // Do not log network errors; keep loading screen active
    if (!error.response) {
      showLoading(); // Keep showing the loader in case of a network issue
      return new Promise(() => {}); // Prevent further execution
    }

    hideLoading(); // Hide loader if there is a valid response
    const { status, message } = error.response.data || {};
    if (status === "0" && message === "Invalid token") {
      handleLogout();
    }

    return Promise.reject(error);
  }
);

export default api;