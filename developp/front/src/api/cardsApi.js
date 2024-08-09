/// src/api/cardsApi.js

import api from "./configAxios";
import { CARDS_ENDPOINT } from "./apiEndpoints";

// Récupérer toutes les cartes
export const fetchCards = async () => {
  const response = await api.get(CARDS_ENDPOINT);
  return response.data;
};

// Créer une nouvelle carte
export const createCard = async (cardData) => {
  const response = await api.post(CARDS_ENDPOINT, cardData);
  return response.data;
};

// Mettre à jour une carte existante
export const updateCard = async (id, cardData) => {
  try {
    const response = await api.put(`${CARDS_ENDPOINT}/${id}`, cardData);
    console.log(`URL de mise à jour: ${CARDS_ENDPOINT}/${id}`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour de la carte avec ID: ${id}`,
      error,
    );
    throw error;
  }
};

// Supprimer une carte
export const deleteCard = async (id) => {
  await api.delete(`${CARDS_ENDPOINT}/${id}`);
};
