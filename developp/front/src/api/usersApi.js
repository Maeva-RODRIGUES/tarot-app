/* eslint-disable no-console */
// src/api/usersApi.js

import api from "./configAxios";
import { USERS_ENDPOINT } from "./apiEndpoints";

// Récupérer tous les utilisateurs
export const fetchUsers = async () => {
  try {
    const response = await api.get(USERS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    throw error;
  }
};

// Créer un nouvel utilisateur
export const createUser = async (userData) => {
  try {
    console.log("Données utilisateur à envoyer :", userData);
    if (!userData.id_Roles) {
      console.error("Erreur: id_Roles est indéfini dans userData");
    }
    const response = await api.post(USERS_ENDPOINT, userData);
    console.log("Réponse de l'API de création d'utilisateur :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
};


// Mettre à jour un utilisateur existant
export const updateUser = async (id, userData) => {
  try {
    console.log(
      "Mise à jour des données utilisateur pour ID:",
      id,
      "avec les données:",
      userData,
    );
    const response = await api.put(`${USERS_ENDPOINT}/${id}`, userData);
    console.log("Réponse de l'API après mise à jour:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    throw error;
  }
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
  try {
    await api.delete(`${USERS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    throw error;
  }
};

// Récupérer les données d'un utilisateur spécifique
export const getUserData = async (id) => {
  try {
    const response = await api.get(`${USERS_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données utilisateur :",
      error,
    );
    throw error;
  }
};
