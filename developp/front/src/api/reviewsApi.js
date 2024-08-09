// src/api/reviewsApi.js

import api from "./configAxios";
import { REVIEWS_ENDPOINT } from "./apiEndpoints";

// Récupérer tous les commentaires ou les commentaires d'un utilisateur spécifique
export const fetchReviews = async (userId = null) => {
  const url = userId
    ? `${REVIEWS_ENDPOINT}?userId=${userId}`
    : REVIEWS_ENDPOINT;
  const response = await api.get(url);
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
