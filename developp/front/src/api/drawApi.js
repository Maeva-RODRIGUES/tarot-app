// drawApi.js

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

  // S'assurer que la réponse contient bien les cartes associées et l'interprétation sélectionnée via la table de jointure
  return response.data.map((drawing) => ({
    ...drawing,
    cards: drawing.Cards, // Utiliser le champ "Cards" qui est inclus dans la réponse du backend
    selected_interpretation: drawing.selected_interpretation, // Inclure l'interprétation sélectionnée dans le retour
  }));
};

// Créer un nouveau tirage pour un utilisateur et un thème spécifique
export const createDrawingForUser = async (
  userId,
  themeId,
  selectedCards,
  interpretation,
) => {
  // Appel API pour créer un nouveau tirage pour un utilisateur avec des cartes sélectionnées
  const response = await api.post(
    `${DRAWINGS_ENDPOINT}/user/${userId}/${encodeURIComponent(themeId)}`, // Construit l'URL de l'API en utilisant l'ID utilisateur et le thème (encodé pour gérer les caractères spéciaux)
    {
      cards: selectedCards,
      selected_interpretation: interpretation, // Inclure l'interprétation sélectionnée dans le corps de la requête
    },
  );

  // Retourne les données de la réponse (le nouveau tirage créé)
  return response.data;
};

// Créer un nouveau tirage aléatoire basé sur le thème choisi
export const createRandomDrawingByTheme = async (theme) => {
  const response = await api.post(`${DRAWINGS_ENDPOINT}/random/${theme}`);
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
