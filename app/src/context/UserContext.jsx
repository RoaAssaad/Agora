// src/context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api'; // Make sure this is your axios instance

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/users/me');
        const fetchedUser = res.data;

        localStorage.setItem('user_id', fetchedUser.id);
        localStorage.setItem('username', fetchedUser.username);
        localStorage.setItem('email', fetchedUser.email);
        localStorage.setItem('created_at', fetchedUser.created_at);
        localStorage.setItem('profileImage', fetchedUser.profileImage || '');

        setUser(fetchedUser);
      } catch (err) {
        console.warn('Failed to fetch user from backend, falling back to localStorage.');
        const storedUser = {
          id: localStorage.getItem('user_id'),
          username: localStorage.getItem('username'),
          email: localStorage.getItem('email'),
          created_at: localStorage.getItem('created_at'),
          profileImage: localStorage.getItem('profileImage'),
        };
        if (storedUser.id && storedUser.username && storedUser.email) {
          setUser(storedUser);
        } else {
          setUser(null);
        }
      }
    };

    fetchUser();
  }, []);

  const updateProfileImage = (base64) => {
    if (user) {
      const updatedUser = { ...user, profileImage: base64 };
      localStorage.setItem('profileImage', base64);
      setUser(updatedUser);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateProfileImage, logout }}>
      {children}
    </UserContext.Provider>
  );
};
