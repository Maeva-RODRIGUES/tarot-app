// src/api/authApi.js

import api from "./configAxios";
import { AUTH_ENDPOINT, USERS_ENDPOINT } from "./apiEndpoints"; 

// Connexion utilisateur
export const login = async (credentials) => {
  console.log("Tentative de connexion avec les identifiants :", credentials);
  const response = await api.post(AUTH_ENDPOINT.LOGIN, credentials);
  const { token, userId, role } = response.data;
  if (token) {
    localStorage.setItem("token", token);
  }
  console.log("Réponse de l'API de connexion :", response.data);
  return { userId, role };
};

// Créer un nouvel utilisateur
export const signup = async (userData) => {
  console.log("Tentative de création d'un nouvel utilisateur avec les données :", userData);
  const response = await api.post(AUTH_ENDPOINT.SIGNUP, userData);
  console.log("Réponse de l'API de création d'utilisateur :", response.data);
  return response.data;
};

// Récupérer les données d'un utilisateur spécifique
export const getUserData = async (userId) => {
  console.log("Tentative de récupération des données utilisateur pour l'ID :", userId);
  const response = await api.get(`${USERS_ENDPOINT}/${userId}`);
  console.log("Données utilisateur récupérées :", response.data);
  return response.data;
};
