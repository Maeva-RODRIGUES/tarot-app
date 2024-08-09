// src/api/reviewsApi.js

import api from "./configAxios";
import { REVIEWS_ENDPOINT } from "./apiEndpoints";

// Récupérer tous les commentaires
export const fetchReviews = async (userId) => {
  const response = await api.get(REVIEWS_ENDPOINT, {
    params: { userId }, // Ajoutez les paramètres si nécessaire
  });
  return response.data;
};

// Créer un nouveau commentaire
export const createReview = async (reviewData) => {
  const response = await api.post(REVIEWS_ENDPOINT, reviewData);
  return response.data;
};

// Mettre à jour un commentaire existant
export const updateReview = async (id, reviewData) => {
  const response = await api.put(`${REVIEWS_ENDPOINT}/${id}`, reviewData);
  return response.data;
};

// Supprimer un commentaire
export const deleteReview = async (id) => {
  await api.delete(`${REVIEWS_ENDPOINT}/${id}`);
};