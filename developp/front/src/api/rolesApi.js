// src/api/rolesApi.js : 

import api from "./configAxios";

// Récupérer tous les rôles
export const fetchRoles = async () => {
  try {
    const response = await api.get("/roles");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles :", error);
    throw error;
  }
};

// Créer un nouveau rôle
export const createRole = async (roleData) => {
  try {
    const response = await api.post("/roles", roleData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du rôle :", error);
    throw error;
  }
};

// Mettre à jour un rôle existant
export const updateRole = async (id, roleData) => {
  try {
    const response = await api.put(`/roles/${id}`, roleData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle :", error);
    throw error;
  }
};

// Supprimer un rôle
export const deleteRole = async (id) => {
  try {
    await api.delete(`/roles/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression du rôle :", error);
    throw error;
  }
};
