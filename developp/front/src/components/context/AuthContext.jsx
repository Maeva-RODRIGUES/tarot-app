// src/components/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Changer la logique d'authentification initiale si nécessaire
  const [user, setUser] = useState(null); // État pour stocker les informations de l'utilisateur
  const navigate = useNavigate();

  // Simulez une vérification d'authentification
  useEffect(() => {
    // Cette fonction pourrait vérifier un token ou des informations d'authentification
    // Pour cet exemple, nous définissons un utilisateur statique avec un avatar
    const fetchedUser = {
      name: "Alice Dupont",
      isAdmin: true, // Changer en fonction de l'utilisateur réel
      avatarUrl: "/src/assets/img/profile-pic (5).png" // URL de l'avatar par défaut
    };

    if (fetchedUser) {
      setIsAuthenticated(true);
      setUser(fetchedUser);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logout = () => {
    // Logique pour déconnecter l'utilisateur, comme la suppression du token d'authentification
    setIsAuthenticated(false); // Met à jour l'état d'authentification
    setUser(null); // Réinitialise les informations de l'utilisateur
    navigate("/login"); // Redirige l'utilisateur vers la page de connexion
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
