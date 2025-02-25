import axios from "axios";

const api = axios.create({
  baseURL: "https://dakshhousing.com/satsambhav/websiteapi", // Set your base API URL
});

// Add request interceptor to modify headers dynamically
api.interceptors.request.use((config) => {
  const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";

  config.headers["language"] = selectedLanguage;
  config.headers["userId"] = "2";
  config.headers["user_type"] = "guest";
  config.headers["Device_id"] = "upen";
  config.headers["Longitude"] = JSON.parse(localStorage.getItem("formData") || "{}").Longitude;
  config.headers["Latitude"] = JSON.parse(localStorage.getItem("formData") || "{}").Latitude;
  config.headers["Ip_address"] = JSON.parse(localStorage.getItem("formData") || "{}").Ip_address;
  config.headers["web_token"] = localStorage.getItem("authToken");

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
