// src/hooks/usePosts.js
import { useEffect, useState } from 'react';
import { fetchAllPosts } from '../services/PostService';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts()
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch posts:', err);
        setLoading(false);
      });
  }, []);

  return { posts, loading };
};
