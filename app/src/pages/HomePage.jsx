// src/pages/HomePage.jsx
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Tabs from '../components/Tabs';
import PostCard from '../components/PostCard';
import './HomePage.css';

const dummyPosts = [
  {
    title: 'Should You Hold NVIDIA Stock or Trade It?',
    image: 'https://via.placeholder.com/250x140.png?text=NVIDIA',
    user: 'the_big_mothergoose',
    community: '/r/Tech',
    time: '6 hours ago',
    votes: '13k',
    comments: '214',
  },
  {
    title: 'Playing the guitar!',
    image: 'https://via.placeholder.com/250x140.png?text=Guitar',
    user: 'bwa_ahki',
    community: '/r/Music',
    time: '45 minutes ago',
    votes: '11.7k',
    comments: '850',
  },
  // Add more post objects as needed
];

const HomePage = () => {
  const [tab, setTab] = useState('Popular');

  return (
    <div className="homepage-container">
      <Sidebar />
      <main className="main-content">
        <h4>All Communities</h4>
        <Tabs selected={tab} onSelect={setTab} />
        <h5 className="section-heading">Find something interesting to discuss</h5>
        <div className="post-grid">
          {dummyPosts.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
