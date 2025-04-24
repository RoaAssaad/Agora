// src/services/UserService.js
import api from './api'; // Axios instance with baseURL and auth token

/**
 * Register a new user.
 * @param {string} username - Unique username
 * @param {string} email - Email address
 * @param {string} password - Plain-text password
 */
export const registerUser = (username, email, password) => {
  return api.post('/auth/register', { username, email, password });
};

/**
 * Log in a user and receive access token + user info.
 * @param {string} username
 * @param {string} password
 */
export const loginUser = (username, password) => {
  return api.post('/auth/login', { username, password });
};

/** Fetch all users (admin/dev/debug purpose) */
export const getAllUsers = () => {
  return api.get('/users');
};

/**
 * Upload a new profile image in base64 format.
 * @param {string} imageBase64
 */
export const uploadProfileImage = (imageBase64) => {
  return api.patch('/users/profile-photo', { image: imageBase64 });
};
