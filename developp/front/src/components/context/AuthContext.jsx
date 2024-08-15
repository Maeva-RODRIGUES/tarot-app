/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
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
          const { id: userId } = JSON.parse(atob(token.split(".")[1]));
          const userData = await getUserData(userId);
          setUser({ ...userData, userId }); // S'assurer que userId est bien dans l'état utilisateur
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données utilisateur :",
            error,
          );
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
      const { token } = await apiLogin(credentials); // Supposons que votre backend retourne un token JWT contenant l'id de l'utilisateur
      console.log("Token reçu après connexion :", token);
      localStorage.setItem("token", token); // Stocker le token

      const { id: userId } = JSON.parse(atob(token.split(".")[1])); // Extraire l'userId du token
      console.log("User ID extrait du token:", userId);

      const userData = await getUserData(userId); // Récupérer les données utilisateur complètes
      setUser({ ...userData, userId }); // S'assurer que userId est bien dans l'état utilisateur
      return { userId, role: userData.role };
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
