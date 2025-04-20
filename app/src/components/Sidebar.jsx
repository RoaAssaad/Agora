// src/components/Sidebar.jsx
import {
  FaHome,
  FaGamepad,
  FaPlusCircle,
  FaSearch,
  FaUserCircle,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCommunities } from '../context/CommunityContext';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const { communities } = useCommunities();
  const { user } = useUser();

  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredCommunities = communities.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (name) => {
    setSearchQuery('');
    setShowResults(false);
    navigate(`/community/${name}`);
  };

  return (
    <div className="sidebar">
      <div className="logo">Agora</div>
      <div className="username">Hello, {user?.username || 'User'}</div>

      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-bar"
          placeholder="Search communities..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(true);
          }}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          onFocus={() => setShowResults(true)}
        />
        {showResults && searchQuery.length > 0 && (
          <ul className="search-results">
            {filteredCommunities.length > 0 ? (
              filteredCommunities.map((c) => (
                <li key={c.id} onClick={() => handleSelect(c.name)}>
                  /c/{c.name}
                </li>
              ))
            ) : (
              <li className="no-results">No matches</li>
            )}
          </ul>
        )}
      </div>

      <ul className="nav-links">
        <li onClick={() => navigate('/home')}>
          <FaHome /> Home
        </li>
        <li onClick={() => navigate('/profile')}>
          <FaUserCircle /> My Profile
        </li>
        <li>
          <FaGamepad /> My Communities
        </li>

        {communities.map((c) => (
          <li key={c.id} onClick={() => navigate(`/community/${c.name}`)}>
            /c/{c.name}
          </li>
        ))}

        <li onClick={() => navigate('/create-community')}>
          <FaPlusCircle /> Create Community
        </li>
      </ul>

      <ul className="footer-links"></ul>
    </div>
  );
};

export default Sidebar;
