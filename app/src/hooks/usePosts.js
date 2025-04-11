// src/hooks/usePosts.js
import { useEffect, useState } from 'react';
import { fetchAllPosts } from '../services/PostService';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts()
      .then(res => {
        // Ensure each post includes the 'votes' field
        const formattedPosts = res.data.map(post => ({
          ...post,
          votes: post.votes || 0, // fallback if backend doesn't return it
        }));
        setPosts(formattedPosts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch posts:', err);
        setLoading(false);
      });
  }, []);

  return { posts, loading };
};
