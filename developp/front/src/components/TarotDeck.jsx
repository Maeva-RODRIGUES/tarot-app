// src/components/TarotDeck.jsx

import { Box, SimpleGrid, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import TarotCard from "./TarotCard";
import useTarotDeck from "../hooks/useTarotDeck"; // Logique du jeu
import useCards from "../hooks/useCards"; // Gestion des données des cartes
import useAnimations from "../hooks/useAnimations"; // Animations

function TarotDeck() {
  const { cards, isLoading, isError, error, mutateDeleteCard } = useCards();
  const { shuffleCards } = useTarotDeck(); // Fonction de mélange des cartes
  const { animateProps, triggerRiffleShuffle, triggerCutAnimation, setAnimateProps } = useAnimations();

  const [buttonText, setButtonText] = useState("Mélangez");
  const [flippedCards, setFlippedCards] = useState(Array(cards?.length || 0).fill(false));
  const [selectedCards, setSelectedCards] = useState([]);
  const [isCutting, setIsCutting] = useState(false);
  const [canSelectCards, setCanSelectCards] = useState(false);
  const [showButton, setShowButton] = useState(true);

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
    triggerCutAnimation(cards.length);
    setTimeout(() => {
      resetState();
      setIsCutting(false);
      setCanSelectCards(true);
      setShowButton(false);
    }, 2000);
  };

  const handleClick = (index) => {
    if (canSelectCards && selectedCards.length < 3 && !flippedCards[index]) {
      const newFlippedCards = [...flippedCards];
      newFlippedCards[index] = true;
      setFlippedCards(newFlippedCards);
      setSelectedCards([...selectedCards, cards[index]]);
    }
  };

  const handleDelete = (id) => {
    mutateDeleteCard(id);
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
              frontColor={card.keyword1}
              backImage={card.image_url}
              height="150px"
              width="100px"
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
            VOTRE AVENIR EN DETAIL
          </Text>
          <SimpleGrid columns={3} spacing={10} mt={5}>
            {selectedCards.map((card, index) => (
              <Box key={card.id}>
                <TarotCard
                  backImage={card.image_url}
                  frontColor={card.keyword1}
                  height="150px"
                  width="100px"
                  isFlipped
                />
                <Text mt={2}>Interprétation de la carte {index + 1}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
}

export default TarotDeck;