export const getToken = () => localStorage.getItem('access_token') || '';

export const setToken = (token) => {
  if (token) {
    localStorage.setItem('access_token', token);
  } else {
    localStorage.removeItem('access_token');
  }
};

export const removeToken = () => {
  localStorage.removeItem('access_token');
};

export const getTokenBearer = () => {
  const token = getToken();
  return token ? `Bearer ${token}` : '';
};
