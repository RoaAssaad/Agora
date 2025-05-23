import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Tabs from '../components/Tabs';
import PostCard from '../components/PostCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPosts } from '../features/posts/postSlice';
import './HomePage.css';

const HomePage = () => {
  const [tab, setTab] = useState('Popular');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts(tab));
  }, [dispatch, tab]);

  return (
    <div className="homepage-container">
      <Sidebar />
      <main className="main-content">
        <h4>All Communities</h4>
        <Tabs selected={tab} onSelect={setTab} />

        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-purple" onClick={() => navigate('/create-post')}>
            + Create Post
          </button>
        </div>

        <h5 className="section-heading">Find something interesting to discuss</h5>

        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={{
                  id: post.id,
                  title: post.title,
                  content: post.content,
                  image: post.image || null,
                  time: new Date(post.created_at).toLocaleString(),
                  user: post.creator?.username || 'Unknown',
                  community: `/c/${post.community?.name || 'general'}`,
                  votes: post.votes || 0,
                  userVote: post.userVote || 0,
                  commentCount: post.commentCount || 0, // ✅ Pass Redux value
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
