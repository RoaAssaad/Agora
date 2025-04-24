import { useEffect, useState } from 'react';
import { fetchAllPosts } from '../services/PostService';

/**
 * Custom hook to fetch posts sorted by the given method.
 * @param {string} sort - Sort method: 'Popular', 'Recent', 'Top'
 * @returns posts list and loading state
 */
export const usePosts = (sort = 'Popular') => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllPosts(sort)
      .then(res => {
                // Ensure 'votes' is always present
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
