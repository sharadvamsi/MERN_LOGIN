import axios from "axios";

// Set the base URL for the backend API
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});



export const registerUser = async (data) => {
  try {
    const response = await API.post(
      `/api/auth/register`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return { success: true, message: response.data.message };
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Registration failed.";
    return { success: false, message: errorMessage };
  }
};




// Login API call
export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/api/auth/login", { email, password });
    return response.data; // Return token or OTP message from the server
  } catch (error) {
    throw error.response?.data?.message || "Login failed.";
  }
};


export const verifyOTP = async (email, otp) => {
    try {
      const response = await API.post("/api/auth/verify-otp", { email, otp });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "OTP verification failed.";
    }
};


