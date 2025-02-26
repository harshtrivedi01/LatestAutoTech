import axios from "axios";

const api = axios.create({
  baseURL: "https://dakshhousing.com/satsambhav/websiteapi", // Set your base API URL
});

// Add request interceptor to modify headers dynamically
api.interceptors.request.use((config) => {
  const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";
  const userId = localStorage.getItem("idToken");
  const formData = JSON.parse(localStorage.getItem("formData") || "{}");

  config.headers["language"] = selectedLanguage;
  config.headers["userId"] = userId;
  config.headers["user_type"] = userId ? "user" : "guest"; // Set user_type dynamically
  config.headers["Device_id"] = "upen";
  config.headers["Longitude"] = formData.Longitude;
  config.headers["Latitude"] = formData.Latitude;
  config.headers["Ip_address"] = formData.Ip_address;
  config.headers["web_token"] = localStorage.getItem("authToken");

  console.log(userId,"ter")
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
