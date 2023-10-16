// auth.js
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async (userData) => {
  try {
    const reqUrl = `${backendUrl}/register`;
    const response = await axios.post(reqUrl, userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const reqUrl = `${backendUrl}/login`; // Replace with your login endpoint
    const response = await axios.post(reqUrl, credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
