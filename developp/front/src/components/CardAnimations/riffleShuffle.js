// CardAnimations/riffleShuffle.js

/**
 * Génère des propriétés d'animation pour l'effet de mélange riffle shuffle.
 * @param {number} cardCount - Nombre total de cartes.
 * @returns {Array} - Propriétés d'animation pour chaque carte.
 */
const riffleShuffleAnimation = (cardCount) => {
  return Array.from({ length: cardCount }, (_, index) => ({
    // Réduisez les valeurs pour accélérer et réduire l'étendue de l'animation
    x: Math.sin((index / cardCount) * 2 * Math.PI) * 100, // Réduit l'amplitude
    y: Math.cos((index / cardCount) * 2 * Math.PI) * 100, // Réduit l'amplitude
    rotate: Math.random() * 180 - 90, // Réduit l'angle de rotation
    opacity: 1, // Opacité normale
    transition: { duration: 1 } // Durée de l'animation
  }));
};

export default riffleShuffleAnimation;
