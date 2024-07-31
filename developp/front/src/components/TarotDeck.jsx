// components/TarotDeck.jsx

import { Box, SimpleGrid, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import TarotCard from "./TarotCard";
import useTarotDeck from "../hooks/useTarotDeck";
import useAnimations from "../hooks/useAnimations"; // Import du hook d'animations

function TarotDeck() {
  const { cards, shuffleCards, backImage } = useTarotDeck();
  const {
    animateProps,
    triggerRiffleShuffle,
    triggerCutAnimation,
    setAnimateProps,
  } = useAnimations(); // Utilisation du hook d'animations

  const [buttonText, setButtonText] = useState("Mélangez");
  const [flippedCards, setFlippedCards] = useState(
    Array(cards.length).fill(false),
  );
  const [selectedCards, setSelectedCards] = useState([]);
  const [isCutting, setIsCutting] = useState(false);
  const [canSelectCards, setCanSelectCards] = useState(false);
  const [showButton, setShowButton] = useState(true); // État pour afficher ou masquer le bouton

  const resetState = () => {
    const defaultProps = Array(cards.length).fill({
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
    });
    console.log("Resetting animation props to:", defaultProps);
    setAnimateProps(defaultProps);
  };

  const handleShuffle = () => {
    shuffleCards();
    console.log("Shuffled cards:", cards);

    // Déclencher l'animation de mélange
    triggerRiffleShuffle(cards.length);
    console.log("Button Text After Shuffle:", buttonText);

    setTimeout(() => {
      resetState(); // Utiliser la fonction correcte pour réinitialiser les animations
      setButtonText("Coupez");
    }, 1000); // Temps pour l'animation de mélange
  };

  const handleCut = () => {
    setIsCutting(true);
    console.log("Button Text Before Cut:", buttonText);
    // Déclencher l'animation de coupe
    triggerCutAnimation(cards.length);
    console.log("Triggering cut animation with cards:", cards.length);
    setTimeout(() => {
      resetState(); // Réinitialiser l'état après l'animation de coupe
      setIsCutting(false);
      setCanSelectCards(true);
      setShowButton(false); // Masquer le bouton après la coupe
    }, 2000); // Temps pour l'animation de coupe
  };

  const handleClick = (index) => {
    if (canSelectCards && selectedCards.length < 3 && !flippedCards[index]) {
      const newFlippedCards = [...flippedCards];
      newFlippedCards[index] = true;
      setFlippedCards(newFlippedCards);
      setSelectedCards([...selectedCards, cards[index]]);
    }
  };

  // Vérifie les propriétés d'animation à chaque mise à jour
  useEffect(() => {
    console.log("Updated animateProps:", animateProps);
  }, [animateProps]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <SimpleGrid columns={[2, null, 11]} spacingX="2px" spacingY="10px">
        {cards.map((color, index) => {
          // Déplacer le console.log ici pour vérifier l'index de chaque carte
          console.log(
            "Card Index:",
            index,
            "Animation Props:",
            animateProps[index],
          );
          return (
            <Box key={index} onClick={() => handleClick(index)}>
              <TarotCard
                frontColor={color}
                backImage={backImage}
                height="150px"
                width="100px"
                animateProps={animateProps[index]}
                isFlipped={flippedCards[index]}
              />
            </Box>
          );
        })}
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
            {selectedCards.map((color, index) => (
              <Box key={index}>
                <TarotCard
                  backImage={backImage}
                  frontColor={color}
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
