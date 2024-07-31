// useTarotDeck.js (hook) : gère l'état et la logique du jeu de tarot.
// Importation du hook useState de React
import { useState } from "react";
// Importation de l'image du verso des cartes
import backImage from "../assets/img/backlove.png";

// Définition des couleurs pour le recto des cartes
const rectoColors = [
  "#FF6347", // Tomate
  "#4682B4", // Bleu acier
  "#32CD32", // Vert lime
  "#FFD700", // Or
  "#FF4500", // Orange rouge
  "#6A5ACD", // Bleu ardoise
  "#8A2BE2", // Bleu violet
  "#FF1493", // Rose profond
  "#00FFFF", // Aqua
  "#FFDAB9", // Pêche
  "#FF69B4", // Rose chaud
  "#8B4513", // Chêne
  "#D2691E", // Chocolat
  "#5F9EA0", // Cadet bleu
  "#FF8C00", // Orange foncé
  "#C71585", // Violet clair
  "#20B2AA", // Turquoise foncé
  "#800080", // Violet
  "#00FF7F", // Vert printemps
  "#B22222", // Rouge brique
  "#4B0082", // Indigo
  "#FF00FF", // Magenta
];

// Hook personnalisé pour gérer le jeu de tarot
const useTarotDeck = () => {
  // État pour stocker les cartes, initialisé avec les couleurs définies
  const [cards, setCards] = useState(rectoColors);

  // Fonction pour mélanger les cartes
  const shuffleCards = () => {
    // Création d'un nouveau tableau avec les cartes mélangées
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled); // Mise à jour de l'état des cartes
  };

  // Retourne les cartes, la fonction de mélange et l'image du verso
  return { cards, shuffleCards, backImage };
};

// Exportation du hook personnalisé
export default useTarotDeck;
