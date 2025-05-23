// src/services/CommunityService.js
import axios from 'axios';
import { getToken } from '../utility/Utility';

const API_URL = 'http://localhost:3000/communities';

/** Attach JWT token */
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Fetch all available communities
 */
export const fetchCommunities = async () => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

/**
 * Create a new community (requires auth)
 * @param {Object} data - { name, title, description }
 */
export const createCommunity = async (data) => {
  return axios.post(API_URL, data, { headers: getAuthHeaders() });
};

/**
 * Fetch a single community by name (for CommunityPage)
 * @param {string} name - Community name used in URL
 */
export const getCommunityByName = async (name) => {
  return axios.get(`${API_URL}/name/${name}`);
};
