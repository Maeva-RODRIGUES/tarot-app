// src/api/reviewsApi.js

import api from "./configAxios";

// Récupérer tous les avis
export const fetchReviews = async () => {
  try {
    const response = await api.get("/reviews");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des avis :", error);
    throw error;
  }
};

// Créer un nouvel avis
export const createReview = async (reviewData) => {
  try {
    const response = await api.post("/reviews", reviewData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'avis :", error);
    throw error;
  }
};

// Mettre à jour un avis existant
export const updateReview = async (id, reviewData) => {
  try {
    const response = await api.put(`/reviews/${id}`, reviewData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'avis :", error);
    throw error;
  }
};

// Supprimer un avis
export const deleteReview = async (id) => {
  try {
    await api.delete(`/reviews/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'avis :", error);
    throw error;
  }
};
