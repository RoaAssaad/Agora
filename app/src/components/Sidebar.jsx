import {
  FaHome,
  FaBell,
  FaGamepad,
  FaSmile,
  FaTv,
  FaPlusCircle,
  FaQuestionCircle,
  FaAppStore,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCommunities } from '../context/CommunityContext';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const { communities } = useCommunities();
  const username = localStorage.getItem('username') || 'User';

  return (
    <div className="sidebar">
      <div className="logo">Agora</div>
      <div className="username">Hello, {username}</div>

      <input type="text" className="search-bar" placeholder="Search communities..." />

      <ul className="nav-links">
        <li onClick={() => navigate('/home')}><FaHome /> Home</li>
        <li><FaBell /> Notifications</li>
        <li><FaGamepad /> My Communities</li>

        {communities.map((c) => (
          <li key={c.id} onClick={() => navigate(`/community/${c.name}`)}>
            /c/{c.name}
          </li>
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
