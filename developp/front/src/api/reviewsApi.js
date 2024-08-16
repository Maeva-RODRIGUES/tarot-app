// src/api/reviewsApi.js

import api from "./configAxios";
import { REVIEWS_ENDPOINT } from "./apiEndpoints";

// Récupérer tous les commentaires
export const fetchAllReviews = async () => {
  const response = await api.get(REVIEWS_ENDPOINT);
  return response.data;
};

// Récupérer les commentaires d'un utilisateur spécifique
export const fetchReviews = async (userId) => {
  const response = await api.get(`${REVIEWS_ENDPOINT}/user/${userId}`);
  return response.data;
};

// Créer un nouveau commentaire pour un utilisateur spécifique
export const createReview = async (userId, reviewData) => {
  const response = await api.post(
    `${REVIEWS_ENDPOINT}/user/${userId}`,
    reviewData,
  );
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
