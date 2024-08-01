// src/api/authApi.js

import api from "./configAxios";
import { AUTH_ENDPOINT } from "./apiEndpoints";

// Connexion utilisateur
export const login = async (credentials) => {
  const response = await api.post(AUTH_ENDPOINT.LOGIN, credentials);
  return response.data;
};

// Déconnexion utilisateur
export const logout = async () => {
  const response = await api.post("/auth/logout"); // Si logout a une URL différente
  return response.data;
};
