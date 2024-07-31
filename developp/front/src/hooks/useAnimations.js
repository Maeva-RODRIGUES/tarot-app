// hooks/useAnimations.js : hook personnalisé qui gère les animations des cartes.

import { useState } from "react";
import riffleShuffleAnimation from "../components/CardAnimations/riffleShuffle";
import cutAnimation from "../components/CardAnimations/otherAnimations";

/**
 * Hook personnalisé pour gérer les animations des cartes.
 * @returns {Object} - Propriétés d'animation et fonctions associées.
 */
const useAnimations = () => {
  const [animateProps, setAnimateProps] = useState([]);


  const triggerRiffleShuffle = (cardCount) => {
    // ---- Mise à jour : Ajout de logs pour vérifier les props d'animation ----
    const animationProps = riffleShuffleAnimation(cardCount);
    console.log("Riffle Shuffle Animation Props:", animationProps); // Ajouté pour vérification
    setAnimateProps(animationProps);
  };

  const triggerCutAnimation = (cardCount) => {
    // ---- Mise à jour : Ajout de logs pour vérifier les props d'animation ----
    console.log(`Triggering cut animation with ${cardCount} cards`); // Ajouté pour vérification
    const animationProps = cutAnimation(cardCount);
    console.log("Cut Animation Props:", animationProps); // Ajouté pour vérification
    setAnimateProps(animationProps);
  };
  

  return { animateProps, triggerRiffleShuffle, triggerCutAnimation, setAnimateProps };
};

export default useAnimations;
