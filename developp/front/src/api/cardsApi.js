// src/api/cardsApi.js : CRUD pour les cartes - Appels d'API avec axios

import api from "./axios";

// CRUD cards

// Récupérer toutes les cartes
export const fetchCards = async () => {
  const response = await api.get("/cards");
  return response.data;
};

// Créer une nouvelle carte
export const createCard = async (cardData) => {
  const response = await api.post("/cards", cardData);
  return response.data;
};

// Mettre à jour une carte existante
export const updateCard = async (id, cardData) => {
  const response = await api.put(`/cards/${id}`, cardData);
  return response.data;
};

// Supprimer une carte
export const deleteCard = async (id) => {
  await api.delete(`/cards/${id}`);
};
