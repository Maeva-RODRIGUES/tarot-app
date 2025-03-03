/* eslint-disable no-console */
/* eslint-disable no-shadow */
// src/pages/TarotDrawPage.jsx

import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Icon, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { TbCardsFilled } from "react-icons/tb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TarotDeck from "../components/TarotDeck";
import CommentSection from "../components/CommentSection";
import { fetchCards } from "../api/cardsApi";
import { fetchThemes } from "../api/themesApi"; // Importation de l'API des thèmes
import { useDrawings } from "../components/context/DrawingsContext";
import { useAuth } from "../components/context/AuthContext";

const themeImages = {
  amour: {
    header: "../../src/assets/img/LoveTarotPageBanner.jpg",
    footer: "../../src/assets/img/footerlovebanner.jpg",
  },
  carrière: {
    header: "../../src/assets/img/careerheaderbanner.jpg",
    footer: "../../src/assets/img/careerfooterbanner.jpg",
  },
  spiritualité: {
    header: "../../src/assets/img/spiritheaderbanner.jpg",
    footer: "../../src/assets/img/spiritfooterbanner.jpg",
  },
};

function TarotDrawPage() {
  const { theme } = useParams();
  const [cards, setCards] = useState([]);
  const [themes, setThemes] = useState([]); // État pour stocker les thèmes
  const [error, setError] = useState(null);
  const { addDrawing } = useDrawings();
  const { user } = useAuth();
  const toast = useToast(); // Hook pour afficher les notifications

  const themeMap = {
    love: "amour",
    career: "carrière",
    spiritual: "spiritualité",
  };
  const frenchTheme = themeMap[theme] || theme;

  const images = themeImages[frenchTheme] || themeImages.default;

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const data = await fetchCards();
        setCards(data);
      } catch (error) {
        console.error("Erreur de récupération des cartes:", error);
        setError(
          "Erreur de récupération des cartes. Veuillez réessayer plus tard.",
        );
      }
    };

    const fetchThemeData = async () => {
      try {
        const themeData = await fetchThemes(); // Récupération des thèmes via l'API
        setThemes(themeData);
      } catch (error) {
        console.error("Erreur de récupération des thèmes:", error);
        setError(
          "Erreur de récupération des thèmes. Veuillez réessayer plus tard.",
        );
      }
    };

    fetchCardsData();
    fetchThemeData(); // Appeler la fonction pour charger les thèmes au montage du composant
  
    // Afficher la notification après le chargement de la page
  toast({
    title: "Astuce",
    description: "N'oubliez pas de mélanger les cartes avant de faire un tirage.",
    status: "info",
    duration: 8000,
    isClosable: true,
  });
}, [theme, toast]);

  // Fonction pour convertir le nom du thème en ID
  const getThemeIdByName = (themeName) => {
    const theme = themes.find(
      (t) => t.title_theme.toLowerCase() === themeName.toLowerCase(),
    );
    return theme ? theme.id : null; // Retourne l'ID si trouvé, sinon null
  };

  // Fonction pour gérer l'enregistrement du tirage après la sélection des cartes
  const handleDrawComplete = async (selectedCards, interpretation) => {
    if (!user || !user.userId) {
      console.error("User ID is undefined. Cannot create drawing.");
      return;
    }

    const themeId = getThemeIdByName(frenchTheme); // Convertir le nom du thème en ID
    if (!themeId) {
      console.error("Invalid theme name. Cannot find theme ID.");
      return;
    }

    console.log("handleDrawComplete called with cards:", selectedCards);

    try {
      console.log("User ID:", user.userId);
      console.log("Theme ID:", themeId); // Utiliser l'ID du thème
      console.log("Selected Cards:", selectedCards);
      console.log("Selected Interpretation:", interpretation);

      await addDrawing(themeId, user.userId, selectedCards, interpretation); // Utiliser l'ID du thème ici

      console.log("Tirage créé avec succès");
    } catch (error) {
      console.error("Erreur lors de la création du tirage:", error);
    }
  };

  return (
    <>
      <Box>
        <Header
          bannerSrc={images.header}
          bannerAlt={`Bannière d'accueil pour le thème ${theme}`}
          bannerHeight={{ base: "200px", md: "300px" }} // Hauteur responsive de la bannière
          backgroundPosition="50% 20%"
        />
        <Box p={4} textAlign="center">
          <Heading as="h1" size={{ base: "lg", md: "xl" }} mb={10}>
            VOTRE TIRAGE {frenchTheme.toUpperCase()}
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} mb={8}>
            <Icon as={TbCardsFilled} mr={2} transform="translateY(3px)"/>
            <Text as="span" fontWeight="bold">
              Tirez 3 cartes
            </Text>{" "}
            - Vous pouvez tirer plusieurs cartes simultanément.
            <br />
            Il est important d&#39;être au calme lors d&#39;une séance.
          </Text>
          {error ? (
            <Box color="red.500">{error}</Box>
          ) : (
            <Box>
            <TarotDeck
              cards={cards}
              theme={theme}
              onDrawComplete={handleDrawComplete}
            />
            </Box>
          )}
          <Box mt="40" padding={2}>
          <CommentSection />
          </Box>
        </Box>
      </Box>
      <Footer
        bannerSrc={images.footer}
        bannerAlt={`Bannière de pied de page pour le thème ${theme}`}
        bannerHeight={{ base: "200px", md: "300px" }} // Hauteur responsive du pied de page
        footerStyle={{ backgroundColor: "#f8f9fa" }}
      />
    </>
  );
}

export default TarotDrawPage;
