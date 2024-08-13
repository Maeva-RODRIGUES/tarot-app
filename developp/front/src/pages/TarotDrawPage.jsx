// src/pages/TarotDrawPage.jsx : pour afficher les tirages en fonction du thème sélectionné

import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Icon } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { TbCardsFilled } from "react-icons/tb";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import TarotDeck from "../components/TarotDeck";
import CommentSection from "../components/CommentSection.jsx";
import { fetchCards } from "../api/cardsApi"; // Importation de l'appel API

const themeImages = {
  love: {
    header: "../../src/assets/img/LoveTarotPageBanner.jpg",
    footer: "../../src/assets/img/footerlovebanner.jpg",
  },
  career: {
    header: "../../src/assets/img/careerheaderbanner.jpg",
    footer: "../../src/assets/img/careerfooterbanner.jpg",
  },
  spiritual: {
    header: "../../src/assets/img/spiritheaderbanner.jpg",
    footer: "../../src/assets/img/spiritfooterbanner.jpg",
  },
};



function TarotDrawPage() {
  const { theme } = useParams();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  const images = themeImages[theme] || themeImages["default"]; // Utiliser des images par défaut si le thème n'existe pas

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const data = await fetchCards();
        setCards(data);
      } catch (error) {
        console.error("Erreur de récupération des cartes:", error);
        setError(
          "Erreur de récupération des cartes. Veuillez réessayer plus tard.",
        );
      }
    };

    fetchCardsData();
  }, [theme]);

  return (
    <>
      <Box>
        <Header
          bannerSrc={images.header}
          bannerAlt={`Bannière d'accueil pour le thème ${theme}`}
          bannerHeight="300px"
          backgroundPosition="50% 20%" // Exemple de positionnement
        />
        <Box p={4} textAlign="center">
          <Heading as="h1" size="xl" mb={10}>
            VOTRE TIRAGE {theme.toUpperCase()}
          </Heading>
          <Text fontSize="lg" mb={8}>
            <Icon as={TbCardsFilled} mr={2} />
            <Text as="span" fontWeight="bold">
              Tirez 3 cartes
            </Text>{" "}
            - Vous pouvez tirer plusieurs cartes simultanément.
            <br />
            Il est important d'être au calme lors d'une séance.
          </Text>
          {error ? (
            <Box color="red.500">{error}</Box>
          ) : (
            <TarotDeck cards={cards} />
          )}
          <CommentSection />
        </Box>
      </Box>
      <Footer
        bannerSrc={images.footer}
        bannerAlt={`Bannière de pied de page pour le thème ${theme}`}
        bannerHeight="300px"
        footerStyle={{ backgroundColor: "#f8f9fa" }} // Exemple de style supplémentaire pour le footer
      />
    </>
  );
}

export default TarotDrawPage;
