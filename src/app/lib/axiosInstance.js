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
    config.headers["user_id"] = userId;
    config.headers["user_type"] = userId ? "user" : "guest"; // Set user_type dynamically
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
    return response;
  },
  (error) => {
    hideLoading(); // Hide loading on error
    return Promise.reject(error);
  }
);

export default api;
