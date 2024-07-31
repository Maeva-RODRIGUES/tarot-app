// CardAnimations/otherAnimations.js

// Animation pour diviser les cartes en deux paquets après les avoir regroupées// Animation pour diviser les cartes en deux paquets après les avoir regroupées

const cutAnimation = (cardCount) => {
  // ---- Mise à jour : Propriétés pour rassembler toutes les cartes au centre ----
  const stackProps = Array.from({ length: cardCount }, (_, index) => ({
    x: 0,
    y: 0,
    rotate: 0,
    opacity: 1, // Opacité normale pour la phase de rassemblement
    transition: { duration: 1, delay: index * 0.05 }, // Durée de l'animation de rassemblement
  }));

  // ---- Mise à jour : Propriétés pour diviser les cartes en deux paquets ----
  const splitProps = Array.from({ length: cardCount }, (_, index) => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: [1, 1.2, 1], // Ajout de l'effet d'échelle
    opacity: 1, // Opacité augmentée pour l'effet de coupe
    transition: { duration: 0.5 }, // Durée de l'animation de coupe
  }));

  console.log("stackProps:", stackProps); // Ajouté pour vérification
  console.log("splitProps:", splitProps); // Ajouté pour vérification

  // Fusionner les propriétés d'animation
  const animationProps = [...stackProps, ...splitProps];

  console.log("animationProps:", animationProps); // Ajouté pour vérification

  return animationProps;
};

export default cutAnimation;
