// AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { login as apiLogin, getUserData } from '../../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const response = await apiLogin(credentials);
    const userData = await getUserData(response.userId); // Récupérer les données utilisateur complètes
    setUser({ ...userData, role: response.role });
    return response;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
