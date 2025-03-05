import axios from "axios";
import { showLoading, hideLoading } from "../utils/loadingState"; // Utility functions for loading state

const api = axios.create({
  baseURL: "https://dakshhousing.com/satsambhav/websiteapi", // Set your base API URL
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    showLoading(); // Start loading before request
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";
    const userId = localStorage.getItem("idToken");
    const formData = JSON.parse(localStorage.getItem("formData") || "{}");

    config.headers["language"] = selectedLanguage;
    config.headers["User_id"] = userId;
    config.headers["User_type"] = userId ? "user" : "guest"; // Set user_type dynamically
    config.headers["Device_id"] = "upen";
    config.headers["Longitude"] = formData.Longitude;
    config.headers["Latitude"] = formData.Latitude;
    config.headers["Ip_address"] = formData.Ip_address;
    config.headers["web_token"] = localStorage.getItem("authToken");

    return config;
  },
  (error) => {
    hideLoading(); // Hide loading on error
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    hideLoading(); // Hide loading after response

    // Check if the response contains an invalid token error
    if (response.data.status === "0" && response.data.message === "Invalid token") {
      handleLogout();
    }

    return response;
  },
  (error) => {
    hideLoading(); // Hide loading on error

    // Handle API errors and invalid token errors
    if (error.response && error.response.data) {
      const { status, message } = error.response.data;
      if (status === "0" && message === "Invalid token") {
        handleLogout();
      }
    }

    return Promise.reject(error);
  }
);

// Logout Function
const handleLogout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("authToken");
  localStorage.removeItem("formData");
  window.location.href = "/login"; // Redirect to login page
};

export default api;
