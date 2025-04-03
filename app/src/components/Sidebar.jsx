// src/components/Sidebar.jsx
import { FaHome, FaBell, FaGamepad, FaSmile, FaTv, FaPlusCircle, FaQuestionCircle, FaAppStore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCommunities } from '../context/CommunityContext';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const { communities } = useCommunities();

  return (
    <div className="sidebar">
      <div className="logo">Agora</div>
      <div className="email">Agora1@gmail.com</div>
      <input type="text" className="search" placeholder="Search" />

      <ul className="nav-links">
        <li onClick={() => navigate('/home')}><FaHome /> Home</li>
        <li><FaBell /> Notifications</li>
        <li><FaGamepad /> My Communities</li>
        {communities.map((c) => (
          <li key={c.id}>/r/{c.name}</li>
        ))}
        <li><FaSmile /> Funny</li>
        <li><FaTv /> Series</li>
        <li onClick={() => navigate('/create-community')}>
          <FaPlusCircle /> Create Community
        </li>
      </ul>

      <ul className="footer-links">
        <li><FaQuestionCircle /> Help</li>
        <li><FaAppStore /> Apps & Tools</li>
      </ul>
    </div>
  );
};

export default Sidebar;
