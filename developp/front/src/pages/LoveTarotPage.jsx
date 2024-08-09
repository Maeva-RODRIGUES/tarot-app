// src/pages/LoveTarotPage.jsx

import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Icon } from "@chakra-ui/react";
import { TbCardsFilled } from "react-icons/tb";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import TarotDeck from "../components/TarotDeck";
import CommentSection from "../components/CommentSection.jsx";
import { fetchCards } from "../api/cardsApi"; 
import { useAuth } from "../components/context/AuthContext"; 

function LoveTarotPage() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const data = await fetchCards();
        setCards(data);
      } catch (error) {
        console.error('Erreur de récupération des cartes:', error);
        setError('Erreur de récupération des cartes. Veuillez réessayer plus tard.');
      }
    };

    fetchCardsData();
  }, []);

  return (
    <>
      <Box>
        <Header
          bannerSrc="../../src/assets/img/LoveTarotPageBanner.jpg"
          bannerAlt="Bannière d'accueil"
          bannerHeight="300px"
          backgroundPosition="50% 20%" // Exemple de positionnement
        />
        <Box p={4} textAlign="center">
          <Heading as="h1" size="xl" mb={10}>
            VOTRE TIRAGE AMOUR
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
            <TarotDeck cards={cards} userId={user?.id} />
          )}
          <CommentSection />
        </Box>
      </Box>
      <Footer
        bannerSrc="../../src/assets/img/footerlovebanner.jpg"
        bannerAlt="Bannière de pied de page"
        bannerHeight="300px"
      />
    </>
  );
}

export default LoveTarotPage;
