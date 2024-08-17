/* eslint-disable react-hooks/exhaustive-deps */
// useTarotDeck.js : gère l'état et la logique du jeu de tarot.
import { useState, useEffect } from "react";
import useCards from "./useCards"; // Importer le hook pour récupérer les cartes
import backImage from "../assets/img/backlove.png"; // Importation de l'image du verso des cartes

// Hook personnalisé pour gérer le jeu de tarot
const useTarotDeck = () => {
  // Utilisation du hook useCards pour récupérer les cartes depuis le backend
  const { cards: fetchedCards, isLoading, isError, error } = useCards();
  const [cards, setCards] = useState([]);

  // Fonction pour mélanger les cartes
  const shuffleCards = () => {
    if (fetchedCards && fetchedCards.length > 0) {
      // Mélange les cartes récupérées du backend
      const shuffled = [...fetchedCards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
    }
  };

  // Utiliser useEffect pour initialiser l'état lorsque les cartes sont chargées
  useEffect(() => {
    if (fetchedCards && fetchedCards.length > 0) {
      shuffleCards(); // Mélange automatiquement les cartes au chargement
    }
  }, [fetchedCards]);

  return { cards, shuffleCards, backImage, isLoading, isError, error };
};

// Exportation du hook personnalisé
export default useTarotDeck;
