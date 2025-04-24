// src/pages/ProfilePage.jsx
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { fetchAllPosts } from '../services/PostService';
import { uploadProfileImage } from '../services/UserService';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import './ProfilePage.css';
import { FaPlus } from 'react-icons/fa';
/**
 * Displays user profile and their posts.
 * Allows profile image upload (base64).
 * Filters posts from all posts by user ID.
 */


const ProfilePage = () => {
  const { user, updateProfileImage } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);

  useEffect(() => {
    if (user) {
      fetchAllPosts().then((res) => {
        const myPosts = res.data.filter((post) => post.creator?.id === user.id);
        setUserPosts(myPosts);
      });
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      setProfileImage(base64);
      updateProfileImage(base64);
      await uploadProfileImage(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-page-wrapper">
      <Sidebar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image-wrapper">
            <img
              src={profileImage || '/default-profile.png'}
              alt="Profile"
              className="profile-image"
            />
            <label className="upload-icon">
              <FaPlus />
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
          </div>
          <div className="profile-info">
            <h2 className="profile-title">My Profile</h2>
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            {user?.created_at && (
  <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
)}

          </div>
        </div>

        <h3 className="section-title">My Posts</h3>
        <div className="post-grid">
          {userPosts.length === 0 ? (
            <p className="no-posts">No posts yet.</p>
          ) : (
            userPosts.map((post) => (
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
                  comments: 0,
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
