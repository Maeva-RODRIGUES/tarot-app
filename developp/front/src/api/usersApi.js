// src/api/usersApi.js

import api from "./configAxios";
import { USERS_ENDPOINT } from "./apiEndpoints";

// Récupérer tous les utilisateurs
export const fetchUsers = async () => {
  const response = await api.get(USERS_ENDPOINT);
  return response.data;
};

// Créer un nouvel utilisateur
export const createUser = async (userData) => {
  const response = await api.post(USERS_ENDPOINT, userData);
  return response.data;
};

// Mettre à jour un utilisateur existant
export const updateUser = async (id, userData) => {
  const response = await api.put(`${USERS_ENDPOINT}/${id}`, userData);
  return response.data;
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
  await api.delete(`${USERS_ENDPOINT}/${id}`);
};
