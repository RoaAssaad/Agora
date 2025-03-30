// src/components/Tabs.jsx
import './Tabs.css';

const Tabs = ({ selected, onSelect }) => {
  const tabs = ['Popular', 'Trending', 'Recent', 'Top'];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={selected === tab ? 'tab active' : 'tab'}
          onClick={() => onSelect(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
