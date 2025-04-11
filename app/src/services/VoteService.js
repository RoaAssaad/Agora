// src/services/VoteService.js
import api from './api';

/**
 * Vote on a post (1 = upvote, -1 = downvote, 0 = remove vote)
 * @param {string} postId
 * @param {number} value
 */
export const voteOnPost = async (postId, value) => {
  try {
    console.log('Sending vote payload:', { postId, value });

    const response = await api.post('/votes', { postId, value });
    return response.data;
  } catch (error) {
    console.error('Vote error:', error.response?.data || error.message);
    throw error;
  }
};
