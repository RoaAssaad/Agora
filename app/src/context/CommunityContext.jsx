import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCommunities } from '../services/CommunityService';

const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetchCommunities()
      .then((res) => setCommunities(res.data))
      .catch((err) => console.error('Error fetching communities:', err));
  }, []);

  return (
    <CommunityContext.Provider value={{ communities, setCommunities }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunities = () => {
  const context = useContext(CommunityContext);
  if (!context) throw new Error('useCommunities must be used inside CommunityProvider');
  return context;
};
