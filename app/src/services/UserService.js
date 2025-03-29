import axios from 'axios';
import { getTokenBearer } from '../utility/Utility';

const API_BASE_URL = 'http://localhost:3000'; // change to env variable later if needed

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token automatically for protected requests
api.interceptors.request.use((config) => {
  const token = getTokenBearer();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Register new user
export const registerUser = (username, email, password) => {
  return api.post('/auth/register', { username, email, password });
};

//Login existing user
export const loginUser = (username, password) => {
  return api.post('/auth/login', { username, password });
};

// Get all users (protected)
export const getAllUsers = () => {
  return api.get('/users');
};

export default {
  registerUser,
  loginUser,
  getAllUsers,
};
