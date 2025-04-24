import axios from 'axios';
import { getToken } from '../utility/Utility';

const API_URL = 'http://localhost:3000/posts';
/** Attach JWT token */
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Create a new post (requires auth)
 * @param {Object} postData - { title, content, communityId, image? }
 */
export const createPost = async (postData) => {
  return axios.post(API_URL, postData, {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  });
};

/**
 * Fetch all posts with optional sorting method
 * @param {string} sort - 'Popular' | 'Trending' | 'Top' | 'Recent'
 */
export const fetchAllPosts = async (sort = 'Popular') => {
  return axios.get(`${API_URL}?sort=${sort}`);
};
