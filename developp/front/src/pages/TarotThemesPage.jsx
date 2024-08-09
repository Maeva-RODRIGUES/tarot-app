// TarotThemesPage.jsx : permettre aux utilisateurs de choisir un thème de tirage.

// src/pages/TarotThemesPage.jsx

import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import CardsMenu from "../components/CardsMenu";

function TarotThemesPage() {
  return (
    <Box>
      <Heading as="h1" size="xl" textAlign="center" my={8}>
        Sélectionnez un thème 
      </Heading>
      <CardsMenu />
    </Box>
  );
}

export default TarotThemesPage;
