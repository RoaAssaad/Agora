import axios from 'axios';
import { getToken } from '../utility/Utility';

const API_URL = 'http://localhost:3000/comments';
/** Attach JWT token*/
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create a new comment
/**
 * Create a new comment under a post (requires auth)
 * @param {string} postId
 * @param {string} content - The comment text
 */
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
/**
 * Fetch all comments under a specific post
 * @param {string} postId
 */
export const fetchCommentsByPost = async (postId) => {
  return axios.get(`${API_URL}/post/${postId}`);
};
