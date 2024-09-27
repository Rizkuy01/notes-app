import axios from 'axios';

const API_URL = 'http://notes-api-knacademy.vercel.app/api';

// Register
export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Login
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Get user data
export const getUser = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
  return null;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
};
