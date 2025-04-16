import { useEffect, useState } from 'react';
import { fetchAllPosts } from '../services/PostService';

export const usePosts = (sort = 'Popular') => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllPosts(sort)
      .then(res => {
        const formattedPosts = res.data.map(post => ({
          ...post,
          votes: post.votes || 0,
        }));
        setPosts(formattedPosts);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch posts:', err);
        setLoading(false);
      });
  }, [sort]);

  return { posts, loading };
};
