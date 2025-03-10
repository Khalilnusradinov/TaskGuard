export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      const isExpired = payload.exp * 1000 < Date.now();
      if (isExpired) {
          logout();
          return false;
      }
      return true;
  } catch (error) {
      logout();
      return false;
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
