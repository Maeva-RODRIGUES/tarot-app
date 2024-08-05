// src/api/authApi.js

import api from "./configAxios";
import { AUTH_ENDPOINT } from "./apiEndpoints";

// Connexion utilisateur
export const login = async (credentials) => {
  console.log("Tentative de connexion avec les identifiants :", credentials);
  const response = await api.post(AUTH_ENDPOINT.LOGIN, credentials);
  const { token, userId, role } = response.data;
  console.log("Réponse de l'API de connexion :", response.data);
  if (token) {
    localStorage.setItem("token", token);
    console.log("Jeton d'authentification stocké dans localStorage");
  } else {
    console.error("Erreur : Le jeton est manquant dans la réponse de l'API");
  }
  return { token, userId, role };
};

// Créer un nouvel utilisateur
export const signup = async (userData) => {
  console.log("Tentative de création d'un nouvel utilisateur avec les données :", userData);
  const response = await api.post(AUTH_ENDPOINT.SIGNUP, userData);
  console.log("Réponse de l'API de création d'utilisateur :", response.data);
  return response.data;
};