import axios from 'axios';
import { getToken } from '../utility/Utility';

const API_URL = 'http://localhost:3000/posts';

const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createPost = async (postData) => {
  return axios.post(API_URL, postData, {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  });
};

export const fetchAllPosts = async () => {
  return axios.get(API_URL);
};
