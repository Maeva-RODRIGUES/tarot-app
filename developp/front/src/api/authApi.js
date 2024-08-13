// src/api/authApi.js

import api from "./configAxios";
import { AUTH_ENDPOINT, USERS_ENDPOINT } from "./apiEndpoints";

// Connexion utilisateur
export const login = async (credentials) => {
  console.log("Tentative de connexion avec les identifiants :", credentials);
  const response = await api.post(AUTH_ENDPOINT.LOGIN, credentials);
  
  // Extraction des données de la réponse
  const { token, userId, role } = response.data;

  // Vérification de la présence du token
  if (token) {
    // Stockage du token dans localStorage
    localStorage.setItem("token", token);
    console.log("Token stocké dans localStorage :", token);
  } else {
    console.error("Le token est manquant dans la réponse de l'API.");
    throw new Error("Le token est manquant dans la réponse de l'API.");
  }

  console.log("Réponse de l'API de connexion :", response.data);

  // Retour du token, userId et role pour utilisation ultérieure
  return { token, userId, role };
};

// Créer un nouvel utilisateur
export const signup = async (userData) => {
  console.log(
    "Tentative de création d'un nouvel utilisateur avec les données :",
    userData,
  );
  const response = await api.post(AUTH_ENDPOINT.SIGNUP, userData);
  console.log("Réponse de l'API de création d'utilisateur :", response.data);
  return response.data;
};

// Récupérer les données d'un utilisateur spécifique
export const getUserData = async (userId) => {
  console.log(
    "Tentative de récupération des données utilisateur pour l'ID :",
    userId,
  );

  // Effectuer la requête pour récupérer les données utilisateur
  try {
    const response = await api.get(`${USERS_ENDPOINT}/${userId}`);
    console.log("Données utilisateur récupérées :", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données utilisateur :",
      error,
    );
    throw error; // Rejeter l'erreur pour qu'elle soit gérée dans AuthContext ou ailleurs
  }
};

// Mettre à jour les informations d'un utilisateur existant
export const updateUserData = async (userId, userData) => {
  console.log(
    `Tentative de mise à jour des données utilisateur pour l'ID : ${userId} avec les données :`,
    userData,
  );
  const response = await api.put(`${USERS_ENDPOINT}/${userId}`, userData);
  console.log("Données utilisateur mises à jour :", response.data);
  return response.data;
};
