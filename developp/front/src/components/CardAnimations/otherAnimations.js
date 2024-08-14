// CardAnimations/otherAnimations.js

const cutAnimation = (cardCount) => {
  const half = Math.floor(cardCount / 2);

  // Propriétés pour rassembler toutes les cartes au centre
  const stackProps = Array.from({ length: cardCount }, (_, index) => ({
    x: 0,
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: { duration: 1, delay: index * 0.05 }, // Durée de l'animation de rassemblement
  }));

  // Propriétés pour diviser les cartes en deux paquets
  const splitProps = Array.from({ length: cardCount }, (_, index) => ({
    x: index < half ? -50 : 50, // Déplace les cartes de la première moitié à gauche et les autres à droite
    y: 0,
    rotate: 0,
    scale: 1.1, // Légère augmentation de l'échelle pendant la coupe
    opacity: 1,
    transition: { duration: 0.5 }, // Durée de l'animation de coupe
  }));

  // Retourner d'abord les animations de rassemblement, puis celles de coupe
  const animationProps = [...stackProps, ...splitProps];

  return animationProps;
};

export default cutAnimation;
