/// src/api/cardsApi.js

import api from "./configAxios";
import { CARDS_ENDPOINT, UPLOAD_ENDPOINT } from "./apiEndpoints";

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

// Télécharger une image pour une carte (PATCH)
export const uploadCardImage = async (filename, formData) => {
  try {
    const response = await api.patch(
      `${UPLOAD_ENDPOINT}/${filename}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour de l'image pour le fichier: ${filename}`,
      error,
    );
    throw error;
  }
};
