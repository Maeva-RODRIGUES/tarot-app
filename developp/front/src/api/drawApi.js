// src/api/drawApi.js

import api from "./configAxios";
import { DRAWINGS_ENDPOINT } from "./apiEndpoints";

// Récupérer tous les tirages
export const fetchDrawings = async () => {
  const response = await api.get(DRAWINGS_ENDPOINT);
  return response.data;
};

// Récupérer les tirages d'un utilisateur spécifique
export const fetchUserDrawings = async (userId) => {
  const response = await api.get(`${DRAWINGS_ENDPOINT}/user/${userId}`);
  return response.data;
};

// Créer un nouveau tirage
export const createDrawing = async (drawingData) => {
  const response = await api.post(DRAWINGS_ENDPOINT, drawingData);
  return response.data;
};

// Mettre à jour un tirage existant
export const updateDrawing = async (id, drawingData) => {
  const response = await api.put(`${DRAWINGS_ENDPOINT}/${id}`, drawingData);
  return response.data;
};

// Supprimer un tirage
export const deleteDrawing = async (id) => {
  await api.delete(`${DRAWINGS_ENDPOINT}/${id}`);
};
