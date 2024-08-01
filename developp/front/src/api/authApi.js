// src/api/authApi.js

import api from "./configAxios";

// Authentifier un utilisateur
export const authenticateUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'authentification :", error);
    throw error;
  }
};

// Déconnexion de l'utilisateur
export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
};
