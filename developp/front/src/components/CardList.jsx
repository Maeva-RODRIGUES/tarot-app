// CardList.jsx

import React from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import TarotCard from "./TarotCard";

function CardList({ cards }) {
  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Liste des Cartes
      </Heading>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }} // Disposition en grille responsive
        spacing={4} // Espacement entre les éléments
      >
        {cards.map((card) => (
          <TarotCard
            key={card.id} // Clé unique pour chaque carte
            card={card}
            frontColor="white" // Couleur de fond de la face avant
            backImage="/path/to/back-image.jpg" // Chemin vers l'image de dos de la carte
            height={{ base: "150px", md: "200px" }} // Hauteur responsive
            width={{ base: "100px", md: "150px" }} // Largeur responsive
            isFlipped // Détermine si la carte est retournée
            animateProps={{ rotateY: 180 }} // Exemple d'animation
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default CardList;
