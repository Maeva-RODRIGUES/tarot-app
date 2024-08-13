// TarotCard.jsx

import { Box, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

function TarotCard({
  card,
  frontColor,
  backImage,
  isFlipped,
  animateProps,
}) {
  return (
    <Box
      as={motion.div} // Utilisation de motion.div pour animer la carte
      animate={animateProps} // Propriétés d'animation
      style={{ position: "relative" }} // Styles de base
      height={["120px", "150px", "200px"]} // Tailles réactives pour la hauteur
      width={["80px", "100px", "130px"]}  // Tailles réactives pour la largeur
    >
      {isFlipped ? ( // Si la carte est retournée
        <Box
          height="100%"
          width="100%"
          bgColor={frontColor || "gray.200"} // Ajout de frontColor fallback
          borderRadius="md" // Bords arrondis
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding="4"
        >
          <Text fontSize={["sm", "md", "lg"]} fontWeight="bold" mb={2}>
            {card.name_card || "Carte Inconnue"} {/* Ajout de fallback pour card.name_card */}
          </Text>
          <Image 
            src={card.image_url || "/path/to/default/image.png"} // Ajout de fallback pour card.image_url
            alt={card.name_card || "Carte Inconnue"} // Ajout de fallback pour alt
            boxSize="80%" 
          />
          <Text mt={2} fontSize={["xs", "sm", "md"]}>
            {card.keyword1}, {card.keyword2}, {card.keyword3}
          </Text>
        </Box>
      ) : (
        // Si la carte n'est pas retournée
        <Box
          height="100%"
          width="100%"
          bgImage={`url(${backImage || "/path/to/default/backimage.png"})`} // Ajout de fallback pour backImage
          bgSize="cover" // Couvrir toute la surface
          borderRadius="md" // Bords arrondis
        />
      )}
    </Box>
  );
}

// Exportation du composant TarotCard
export default TarotCard;
