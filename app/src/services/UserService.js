// src/services/UserService.js
import api from './api';

export const registerUser = (username, email, password) => {
  return api.post('/auth/register', { username, email, password });
};

export const loginUser = (username, password) => {
  return api.post('/auth/login', { username, password });
};

export const getAllUsers = () => {
  return api.get('/users');
};
