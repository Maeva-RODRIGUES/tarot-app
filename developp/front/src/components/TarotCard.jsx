/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
// TarotCard.jsx

import { Box, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Définition de la base URL pour les images des cartes
const IMAGE_BASE_URL = "http://localhost:8000";

function TarotCard({ card, isFlipped, backImage }) {
  return (
    <Box
      as={motion.div} // Utilisation de motion.div pour animer la carte
      style={{ position: "relative" }} // Styles de base pour la position
      animate={{ x: 100 }} // Animation simple pour tester le mouvement
      // -----------------------------------------------------------------------
      // Tailles réactives pour la carte en fonction de la taille de l'écran
      // Réduite pour s'assurer qu'elles tiennent toutes sur l'écran sans scrolling
      // Les tailles changent en fonction de la largeur de l'écran :
      // - Petit écran : 80x120px
      // - Écran moyen : 100x150px
      // - Grand écran : 110x180px
      // -----------------------------------------------------------------------
      height={{ base: "120px", md: "150px", lg: "180px" }} // Hauteur réactive
      width={{ base: "80px", md: "100px", lg: "110px" }} // Largeur réactive
    >
      {isFlipped ? ( // Si la carte est retournée
        <Box
          height="100%"
          width="100%"
          borderRadius="md" // Bords arrondis pour un aspect plus doux
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding="4"
        >
          <Image
            src={`${IMAGE_BASE_URL}${card.image_url}`} // Construction de l'URL de l'image
            alt={card.name_card || "Carte Inconnue"} // Fallback pour l'attribut alt
            // -------------------------------------------------------------------
            // BoxSize est utilisé ici pour s'assurer que l'image couvre toute
            // la surface de la carte tout en respectant la bordure.
            // -------------------------------------------------------------------
            boxSize="110%"
            border="2px solid black" // Ajout d'une bordure noire
            borderRadius="md" // Conserver les bords arrondis pour correspondre à la Box
          />
        </Box>
      ) : (
        // Si la carte n'est pas retournée
        <Box
          height="100%"
          width="100%"
          bgImage={`url(${backImage})`} // Utilisation de l'image du dos de la carte
          bgSize="cover" // Couvrir toute la surface
          borderRadius="md" // Bords arrondis pour le dos de la carte aussi
          border="4px solid black" // Bordure noire plus épaisse pour l'arrière
        />
      )}
    </Box>
  );
}

// Exportation du composant TarotCard
export default TarotCard;
