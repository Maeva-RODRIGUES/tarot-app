// src/api/rolesApi.js

import api from "./configAxios";
import { ROLES_ENDPOINT } from "./apiEndpoints";

// Récupérer tous les rôles
export const fetchRoles = async () => {
  const response = await api.get(ROLES_ENDPOINT);
  return response.data;
};

// Créer un nouveau rôle
export const createRole = async (roleData) => {
  const response = await api.post(ROLES_ENDPOINT, roleData);
  return response.data;
};

// Mettre à jour un rôle existant
export const updateRole = async (id, roleData) => {
  const response = await api.put(`${ROLES_ENDPOINT}/${id}`, roleData);
  return response.data;
};

// Supprimer un rôle
export const deleteRole = async (id) => {
  await api.delete(`${ROLES_ENDPOINT}/${id}`);
};
