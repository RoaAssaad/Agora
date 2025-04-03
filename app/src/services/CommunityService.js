// src/services/CommunityService.js
import axios from 'axios';
import { getToken } from '../utility/Utility';

const API_URL = 'http://localhost:3000/communities';

const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch all communities
export const fetchCommunities = async () => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

// Create a new community
export const createCommunity = async (data) => {
  return axios.post(API_URL, data, { headers: getAuthHeaders() });
};
