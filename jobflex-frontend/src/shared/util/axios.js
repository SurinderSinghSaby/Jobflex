import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Set your base URL from environment variables
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Interceptors for adding Authorization token dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace with your token retrieval logic
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., show a toast or redirect on 401)
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
