// TarotCard.jsx

// Importation des composants nécessaires de Chakra UI et de framer-motion
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Composant TarotCard pour afficher une carte de tarot
function TarotCard({
  frontColor,
  backImage,
  height,
  width,
  isFlipped,
  animateProps,
}) {
  return (
    <Box
      as={motion.div} // Utilisation de motion.div pour animer la carte
      animate={animateProps} // Propriétés d'animation
      style={{ height, width, position: "relative" }} // Styles de base
    >
      {isFlipped ? ( // Si la carte est retournée
        <Box
          height={height}
          width={width}
          bgColor={frontColor} // Couleur du recto
          borderRadius="md" // Bords arrondis
        />
      ) : (
        // Si la carte n'est pas retournée
        <Box
          height={height}
          width={width}
          bgImage={`url(${backImage})`} // Image du verso
          bgSize="cover" // Couvrir toute la surface
          borderRadius="md" // Bords arrondis
        />
      )}
    </Box>
  );
}

// Exportation du composant TarotCard
export default TarotCard;
