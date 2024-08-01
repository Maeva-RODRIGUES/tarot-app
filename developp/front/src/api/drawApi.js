// src/api/drawApi.js

import api from "./configAxios";

// Récupérer les tirages
export const fetchDraws = async () => {
  try {
    const response = await api.get("/draws");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des tirages :", error);
    throw error;
  }
};

// Créer un nouveau tirage
export const createDraw = async (drawData) => {
  try {
    const response = await api.post("/draws", drawData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du tirage :", error);
    throw error;
  }
};

// Mettre à jour un tirage existant
export const updateDraw = async (id, drawData) => {
  try {
    const response = await api.put(`/draws/${id}`, drawData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du tirage :", error);
    throw error;
  }
};

// Supprimer un tirage
export const deleteDraw = async (id) => {
  try {
    await api.delete(`/draws/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression du tirage :", error);
    throw error;
  }
};
