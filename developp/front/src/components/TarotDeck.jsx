// src/components/TarotDeck.jsx

import { Box, SimpleGrid, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import TarotCard from "./TarotCard";
import useTarotDeck from "../hooks/useTarotDeck"; // Logique du jeu
import useCards from "../hooks/useCards"; // Gestion des données des cartes
import useAnimations from "../hooks/useAnimations"; // Animations
import { fetchThemes } from "../api/themesApi"; // Importer l'API pour récupérer les thèmes

function TarotDeck({ theme }) { // Recevoir le thème en tant que prop
  const { cards, isLoading, isError, error } = useCards();
  const { shuffleCards, backImage } = useTarotDeck(); // Fonction de mélange des cartes et image du dos
  const {
    animateProps,
    triggerRiffleShuffle,
    triggerCutAnimation,
    setAnimateProps,
  } = useAnimations();

  const [buttonText, setButtonText] = useState("Mélangez");
  const [flippedCards, setFlippedCards] = useState(
    Array(cards?.length || 0).fill(false),
  );
  const [selectedCards, setSelectedCards] = useState([]);
  const [isCutting, setIsCutting] = useState(false);
  const [canSelectCards, setCanSelectCards] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [themeInterpretation, setThemeInterpretation] = useState(""); // État pour stocker l'interprétation du thème

  const resetState = () => {
    const defaultProps = Array(cards.length).fill({
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
    });
    setAnimateProps(defaultProps);
  };

  const handleShuffle = () => {
    shuffleCards(); // Mélange les cartes via useTarotDeck
    triggerRiffleShuffle(cards.length);
    setTimeout(() => {
      resetState();
      setButtonText("Coupez");
    }, 1000);
  };

  const handleCut = () => {
    setIsCutting(true);
    triggerCutAnimation(cards.length); // Appel à l'animation de coupe personnalisée
    setTimeout(() => {
      resetState();
      setIsCutting(false);
      setCanSelectCards(true);
      setShowButton(false);
    }, 2000);
  };

  const getRandomInterpretation = (interpretations) => {
    const randomIndex = Math.floor(Math.random() * interpretations.length);
    return interpretations[randomIndex];
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
          const themes = await fetchThemes(); // Récupérer les thèmes
          console.log("Thèmes récupérés :", themes);

          // Correspondance entre les noms dans l'URL et les titres des thèmes dans la base de données
          const themeMap = {
            love: "Amour",
            career: "Carrière",
            spiritual: "Spiritualité",
          };

          const selectedThemeTitle = themeMap[theme.toLowerCase()];

          const selectedTheme = themes.find(
            (t) => t.title_theme === selectedThemeTitle
          );
          console.log("Thème sélectionné :", selectedTheme);

          if (selectedTheme) {
            const interpretations = JSON.parse(selectedTheme.meaning_theme);
            const randomInterpretation = getRandomInterpretation(interpretations);
            setThemeInterpretation(randomInterpretation || "Interprétation indisponible");
          } else {
            console.error(`Thème ${theme} non trouvé.`);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération de l'interprétation du thème", error);
        }
      }
    }
  };

  useEffect(() => {
    console.log("Updated animateProps:", animateProps);
  }, [animateProps]);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <SimpleGrid columns={[2, null, 11]} spacingX="2px" spacingY="10px">
        {cards.map((card, index) => (
          <Box key={card.id} onClick={() => handleClick(index)}>
            <TarotCard
              card={card}
              frontColor={card.keyword1}
              backImage={backImage} // Passez ici l'image du dos du deck depuis useTarotDeck
              animateProps={animateProps[index]}
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
            {selectedCards.map((card, index) => (
              <Box key={card.id}>
                <TarotCard
                  card={card}
                  backImage={backImage} // Affiche aussi le dos du deck pour les cartes sélectionnées
                  frontColor={card.keyword1}
                  isFlipped
                />
                <Text mt={2}>Interprétation de la carte {index + 1}</Text>
              </Box>
            ))}
          </SimpleGrid>
          <Box mt={10}>
            <Text fontSize="lg" fontWeight="bold">
              Interprétation Générale
            </Text>
            <Text>{themeInterpretation}</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TarotDeck;
