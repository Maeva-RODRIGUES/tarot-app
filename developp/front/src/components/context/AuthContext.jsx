// src/components/context/AuthContext.jsx

import React, { createContext, useContext, useState } from "react";
import { login as apiLogin } from "../../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );

  const login = async (email, password) => {
    const response = await apiLogin({ email, password });
    const { token, userId, role } = response; // Assurez-vous que l'API renvoie le rôle de l'utilisateur
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    return { userId, role }; // Retourne l'ID utilisateur et le rôle
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
