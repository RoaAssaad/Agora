// src/services/api.js
import axios from 'axios';
import { getTokenBearer } from '../utility/Utility';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token
api.interceptors.request.use((config) => {
  const token = getTokenBearer();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
