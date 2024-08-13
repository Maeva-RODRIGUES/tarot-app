// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, getUserData } from "../../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        console.log("Token trouvé lors de l'initialisation :", token);
        try {
          const { id: userId } = JSON.parse(atob(token.split('.')[1])); 
          const userData = await getUserData(userId);
          setUser(userData);
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur :", error);
          logout(); // Déconnexion en cas d'erreur
        }
      } else {
        console.log("Aucun token trouvé lors de l'initialisation.");
      }
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const { token, userId, role } = await apiLogin(credentials);

      console.log("Token reçu après connexion :", token);
      localStorage.setItem("token", token); // Stocker le token
      console.log("Token après stockage dans localStorage :", localStorage.getItem("token"));

      const userData = await getUserData(userId);
      setUser({ ...userData, userId, role });
      return { userId, role };
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


