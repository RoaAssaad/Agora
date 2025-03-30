// src/components/Sidebar.jsx
import { FaHome, FaBell, FaGamepad, FaSmile, FaTv, FaQuestionCircle, FaAppStore } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Agora</div>
      <div className="email">Agora1@gmail.com</div>
      <input type="text" className="search" placeholder="Search" />

      <ul className="nav-links">
        <li><FaHome /> Home</li>
        <li><FaBell /> Notifications</li>
        <li><FaGamepad /> My Communities</li>
        <li><FaSmile /> Funny</li>
        <li><FaTv /> Series</li>
      </ul>

      <ul className="footer-links">
        <li><FaQuestionCircle /> Help</li>
        <li><FaAppStore /> Apps & Tools</li>
      </ul>
    </div>
  );
};

export default Sidebar;
