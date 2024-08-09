// AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import { login as apiLogin, getUserData } from "../../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const response = await apiLogin(credentials);
    const userData = await getUserData(response.userId); // Récupérer les données utilisateur complètes
    console.log("User data after login:", userData);
    setUser({ ...userData, userId: response.userId, role: response.role });
    return response;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const updateUser = async (userId, userData) => {
    const updatedData = await apiUpdateUser(userId, userData);
    setUser({ ...user, ...updatedData }); // Met à jour les données utilisateur dans le contexte
    return updatedData;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
