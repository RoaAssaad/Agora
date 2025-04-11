import axios from 'axios';
import { getToken } from '../utility/Utility';

const API_URL = 'http://localhost:3000/comments';

const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create a new comment
export const createComment = async (postId, content) => {
  return axios.post(
    API_URL,
    { postId, content },
    {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    }
  );
};

// Fetch all comments for a post
export const fetchCommentsByPost = async (postId) => {
  return axios.get(`${API_URL}/post/${postId}`);
};
