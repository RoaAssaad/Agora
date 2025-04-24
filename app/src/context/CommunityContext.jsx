import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCommunities } from '../services/CommunityService';

/** Global context for managing list of available communities */
const CommunityContext = createContext();

/**
 * CommunityProvider fetches community list once and provides it to all children.
 */
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

/**
 * Custom hook to consume community context
 * Ensures usage only within <CommunityProvider>
 */
export const useCommunities = () => {
  const context = useContext(CommunityContext);
  if (!context) throw new Error('useCommunities must be used inside CommunityProvider');
  return context;
};
