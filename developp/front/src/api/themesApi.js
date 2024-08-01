// src/api/themesApi.js

import api from "./configAxios";
import { THEMES_ENDPOINT } from "./apiEndpoints";

// Récupérer tous les thèmes
export const fetchThemes = async () => {
  const response = await api.get(THEMES_ENDPOINT);
  return response.data;
};

// Créer un nouveau thème
export const createTheme = async (themeData) => {
  const response = await api.post(THEMES_ENDPOINT, themeData);
  return response.data;
};

// Mettre à jour un thème existant
export const updateTheme = async (id, themeData) => {
  const response = await api.put(`${THEMES_ENDPOINT}/${id}`, themeData);
  return response.data;
};

// Supprimer un thème
export const deleteTheme = async (id) => {
  await api.delete(`${THEMES_ENDPOINT}/${id}`);
};
