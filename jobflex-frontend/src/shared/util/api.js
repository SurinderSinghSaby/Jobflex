import axiosInstance from "./axios";

// Generic GET request
export const fetchData = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching :", error);
    throw error;
  }
};

// Generic POST request
export const postData = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

// Add other methods (PUT, DELETE, etc.)
export const updateData = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const deleteData = async (url, payload) => {
  try {
    const response = await axiosInstance.delete(url, {
      data: payload,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
