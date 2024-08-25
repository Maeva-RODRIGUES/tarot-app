// src/pages/TarotThemesPage.jsx

import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import CardsMenu from "../components/CardsMenu";

function TarotThemesPage() {
  return (
    <Box
      maxW="1200px" // Limite la largeur maximale pour éviter que le contenu ne s'étale trop sur les grands écrans
      mx="auto" // Centre la boîte horizontalement sur la page
      px={{ base: "4", md: "8" }} // Ajoute un padding horizontal : 4 pour les petits écrans, 8 pour les écrans moyens et plus
    >
      <Heading
        as="h1"
        size={{ base: "lg", md: "xl" }} // Taille du titre : "lg" pour petits écrans, "xl" pour moyens et grands écrans
        textAlign="center" // Centre le texte pour une meilleure lisibilité
        my={{ base: "6", md: "8" }} // Marge verticale : 6 pour les petits écrans, 8 pour les écrans moyens et plus
      >
        Sélectionnez un thème
      </Heading>
      <CardsMenu />
    </Box>
  );
}

export default TarotThemesPage;
