/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
// src/components/TarotDeck.jsx

import { Box, SimpleGrid, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TarotCard from "./TarotCard";
import useTarotDeck from "../hooks/useTarotDeck";
import useCards from "../hooks/useCards";
import { shuffleAnimation, cutAnimation } from "../animations/animations";
import { fetchThemes } from "../api/themesApi";

// Fonction utilitaire pour sélectionner une interprétation aléatoire
const getRandomInterpretation = (interpretations) => {
  const randomIndex = Math.floor(Math.random() * interpretations.length);
  return interpretations[randomIndex];
};

function TarotDeck({ theme, onDrawComplete }) {
  const { cards, isLoading, isError, error } = useCards();
  const { shuffleCards, backImage } = useTarotDeck();

  const [buttonText, setButtonText] = useState("Mélangez");
  const [flippedCards, setFlippedCards] = useState(
    Array(cards?.length || 0).fill(false),
  );
  const [selectedCards, setSelectedCards] = useState([]);
  const [canSelectCards, setCanSelectCards] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [themeInterpretation, setThemeInterpretation] = useState("");

  const handleShuffle = () => {
    shuffleCards();
    shuffleAnimation(".play-card");
    setTimeout(() => {
      setButtonText("Coupez");
    }, 1000);
  };

  const handleCut = () => {
    console.log("Déclenchement de l'animation de coupe");
    cutAnimation(".play-card");

    setTimeout(() => {
      console.log("Réinitialisation de l'état des cartes");
      setCanSelectCards(true);
      setShowButton(false);
    }, 2000);
  };

  const handleClick = async (index) => {
    if (canSelectCards && selectedCards.length < 3 && !flippedCards[index]) {
      const newFlippedCards = [...flippedCards];
      newFlippedCards[index] = true;
      setFlippedCards(newFlippedCards);
      const newSelectedCards = [...selectedCards, cards[index]];
      setSelectedCards(newSelectedCards);

      if (newSelectedCards.length === 3) {
        try {
          const themes = await fetchThemes();
          console.log("Thèmes récupérés :", themes);

          const themeMap = {
            love: "Amour",
            career: "Carrière",
            spiritual: "Spiritualité",
          };

          const selectedThemeTitle = themeMap[theme.toLowerCase()];

          const selectedTheme = themes.find(
            (t) => t.title_theme === selectedThemeTitle,
          );
          console.log("Thème sélectionné :", selectedTheme);

          if (selectedTheme) {
            const interpretations = JSON.parse(selectedTheme.meaning_theme);
            const randomInterpretation =
              getRandomInterpretation(interpretations);
            setThemeInterpretation(
              randomInterpretation || "Interprétation indisponible",
            );

            if (onDrawComplete) {
              onDrawComplete(newSelectedCards, randomInterpretation);
            }
          } else {
            console.error(`Thème ${theme} non trouvé.`);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'interprétation du thème",
            error,
          );
        }
      }
    }
  };

  useEffect(() => {
    console.log("Cartes mises à jour pour l'animation.");
  }, [cards]);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <SimpleGrid columns={[2, null, 11]} spacingX="2px" spacingY="10px">
        {cards.map((card, index) => (
          <Box
            key={card.id}
            className="play-card"
            onClick={() => handleClick(index)}
          >
            <TarotCard
              card={card}
              frontColor={card.keyword1}
              backImage={backImage}
              isFlipped={flippedCards[index]}
            />
          </Box>
        ))}
      </SimpleGrid>
      {showButton && (
        <Button
          mt={10}
          bg="#191970"
          color="white"
          size="lg"
          onClick={buttonText === "Mélangez" ? handleShuffle : handleCut}
        >
          {buttonText}
        </Button>
      )}
      {selectedCards.length === 3 && (
        <Box mt={10} textAlign="center">
          <Text fontSize="xl" fontWeight="bold">
            VOTRE AVENIR EN DÉTAIL
          </Text>
          <SimpleGrid columns={3} spacing={10} mt={5}>
            {selectedCards.map((card) => (
              <Box key={card.id} textAlign="center" position="relative">
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="200px"
                  position="relative"
                >
                  <TarotCard card={card} backImage={backImage} isFlipped />
                </Box>
                <Text
                  mt={2}
                  position="absolute"
                  bottom="-10"
                  left="50%"
                  transform="translateX(-50%)"
                >
                  {card.keyword1}, {card.keyword2}, {card.keyword3}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          <Box mb={5} mt={20}>
            <Text fontSize="lg" fontWeight="bold" mb={5}>
              Interprétation Générale
            </Text>
            <Text>{themeInterpretation}</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}

TarotDeck.propTypes = {
  theme: PropTypes.string.isRequired,
  onDrawComplete: PropTypes.func.isRequired,
};

export default TarotDeck;
