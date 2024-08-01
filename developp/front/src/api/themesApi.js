// src/api/themesApi.js

import api from "./configAxios";

// Récupérer tous les thèmes
export const fetchThemes = async () => {
  try {
    const response = await api.get("/themes");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des thèmes :", error);
    throw error;
  }
};

// Créer un nouveau thème
export const createTheme = async (themeData) => {
  try {
    const response = await api.post("/themes", themeData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du thème :", error);
    throw error;
  }
};

// Mettre à jour un thème existant
export const updateTheme = async (id, themeData) => {
  try {
    const response = await api.put(`/themes/${id}`, themeData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du thème :", error);
    throw error;
  }
};

// Supprimer un thème
export const deleteTheme = async (id) => {
  try {
    await api.delete(`/themes/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression du thème :", error);
    throw error;
  }
};
