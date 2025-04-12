import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/PostCard';
import axios from 'axios';
import './HomePage.css'; // Reuse layout styles

const CommunityPage = () => {
  const { name } = useParams();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunityData();
  }, [name]);

  const fetchCommunityData = async () => {
    try {
      const communityRes = await axios.get(`http://localhost:3000/communities`);
      const matched = communityRes.data.find((c) => c.name === name);
      setCommunity(matched || null);

      if (matched) {
        const postsRes = await axios.get(`http://localhost:3000/posts`);
        const filteredPosts = postsRes.data.filter(
          (post) => post.community?.name === name
        );
        setPosts(filteredPosts);
      }
    } catch (err) {
      console.error('Failed to fetch community or posts', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage-container">
      <Sidebar />
      <main className="main-content">
        {community ? (
          <>
            <div className="community-header">
              <h2 className="community-title">/c/{community.name}</h2>
              <p className="community-description">{community.description}</p>
            </div>

            <h5 className="section-heading">Posts in this community</h5>

            {loading ? (
              <p>Loading...</p>
            ) : posts.length === 0 ? (
              <p>No posts yet in this community.</p>
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
                      community: `/c/${name}`,
                      votes: post.votes || 0,
                      comments: 0,
                    }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <h4>Community not found</h4>
        )}
      </main>
    </div>
  );
};

export default CommunityPage;
