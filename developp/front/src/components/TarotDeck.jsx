/* eslint-disable no-shadow */
// src/components/TarotDeck.jsx

import { Box, SimpleGrid, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TarotCard from "./TarotCard";
import useTarotDeck from "../hooks/useTarotDeck";
import useCards from "../hooks/useCards";
import { shuffleAnimation } from "../animations/animations";
import { fetchThemes } from "../api/themesApi";

// Fonction utilitaire pour sélectionner une interprétation aléatoire
const getRandomInterpretation = (interpretations) => {
  const randomIndex = Math.floor(Math.random() * interpretations.length);
  return interpretations[randomIndex];
};

function TarotDeck({ theme, onDrawComplete }) {
  // Récupère les cartes et les états associés via les hooks personnalisés
  const { cards, isLoading, isError, error } = useCards();
  const { shuffleCards, backImage } = useTarotDeck();

  // État pour suivre les cartes retournées (flippées)
  const [flippedCards, setFlippedCards] = useState(
    Array(cards?.length || 0).fill(false),
  );

  // État pour suivre les cartes sélectionnées par l'utilisateur
  const [selectedCards, setSelectedCards] = useState([]);

  // État pour savoir si l'utilisateur peut sélectionner des cartes
  const [canSelectCards, setCanSelectCards] = useState(false);

  // État pour contrôler l'affichage du bouton de mélange
  const [showButton, setShowButton] = useState(true);

  // État pour stocker l'interprétation thématique choisie
  const [themeInterpretation, setThemeInterpretation] = useState("");

  // Fonction déclenchée lorsque l'utilisateur clique sur "Mélangez"
  const handleShuffle = () => {
    shuffleCards(); // Mélange les cartes
    shuffleAnimation(".play-card"); // Lance l'animation de mélange

    // Après un court délai, permet à l'utilisateur de sélectionner des cartes et cache le bouton
    setTimeout(() => {
      setCanSelectCards(true);
      setShowButton(false); // Cache le bouton une fois que les cartes sont mélangées
    }, 1000);
  };

  // Fonction déclenchée lorsque l'utilisateur clique sur une carte
  const handleClick = async (index) => {
    // Vérifie que l'utilisateur peut sélectionner des cartes et qu'il n'a pas déjà sélectionné trois cartes
    if (canSelectCards && selectedCards.length < 3 && !flippedCards[index]) {
      const newFlippedCards = [...flippedCards];
      newFlippedCards[index] = true; // Retourne la carte cliquée
      setFlippedCards(newFlippedCards);

      const newSelectedCards = [...selectedCards, cards[index]];
      setSelectedCards(newSelectedCards); // Ajoute la carte sélectionnée à l'état

      // Si l'utilisateur a sélectionné trois cartes, on procède à l'interprétation
      if (newSelectedCards.length === 3) {
        try {
          const themes = await fetchThemes(); // Récupère les thèmes depuis l'API
          console.log("Thèmes récupérés :", themes);

          // Associe le nom du thème passé en prop avec le nom correspondant en base de données
          const themeMap = {
            love: "Amour",
            career: "Carrière",
            spiritual: "Spiritualité",
          };

          const selectedThemeTitle = themeMap[theme.toLowerCase()];

          // Trouve le thème correspondant dans les données récupérées
          const selectedTheme = themes.find(
            (t) => t.title_theme === selectedThemeTitle,
          );
          console.log("Thème sélectionné :", selectedTheme);

          if (selectedTheme) {
            // Récupère une interprétation aléatoire parmi les interprétations possibles du thème
            const interpretations = JSON.parse(selectedTheme.meaning_theme);
            const randomInterpretation =
              getRandomInterpretation(interpretations);
            setThemeInterpretation(
              randomInterpretation || "Interprétation indisponible",
            );

            // Appelle la fonction `onDrawComplete` passée en prop avec les cartes et l'interprétation
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

  // Effet pour vérifier les cartes lors de la mise à jour
  useEffect(() => {
    console.log("Cartes mises à jour pour l'animation.");
  }, [cards]);

  // Gestion des états de chargement ou d'erreur
  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;

  // Rendu principal du composant
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <SimpleGrid
        columns={[2, null, 11]} // Grille de cartes responsive : 2 colonnes sur petits écrans, 11 sur grands écrans
        spacingX="2px"
        spacingY="10px"
        ml={{ base: 0, lg: "-200px" }} // Marge à gauche responsive, aucune sur mobile, négative sur grands écrans
      >
        {cards.map((card, index) => (
          <Box
            key={card.id} // Utilisation de l'ID de la carte comme clé
            className="play-card"
            onClick={() => handleClick(index)} // Gestion du clic sur une carte
          >
            <TarotCard
              card={card}
              frontColor={card.keyword1}
              backImage={backImage}
              isFlipped={flippedCards[index]} // Indique si la carte est retournée
            />
          </Box>
        ))}
      </SimpleGrid>

      {/* Affiche le bouton "Mélangez" si `showButton` est vrai */}
      {showButton && (
        <Button
          mt={10}
          bg="#191970"
          color="white"
          size="lg"
          onClick={handleShuffle} // Appelle la fonction `handleShuffle` au clic
        >
          Mélangez
        </Button>
      )}

      {/* Si trois cartes ont été sélectionnées, affiche l'interprétation */}
      {selectedCards.length === 3 && (
        <Box mt={10} textAlign="center">
          <Text fontSize="xl" fontWeight="bold">
            VOTRE AVENIR EN DÉTAIL
          </Text>
          <SimpleGrid
            columns={{ base: 1, md: 3 }} // Affiche les cartes sélectionnées en colonne sur mobile, en ligne sur écran moyen et plus
            spacing={10}
            mt={5}
          >
            {selectedCards.map((card) => (
              <Box key={card.id} textAlign="center" position="relative">
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="200px"
                  position="relative"
                  mr={{ base: 0, lg: "200px" }} // Marge à droite responsive
                >
                  <TarotCard card={card} backImage={backImage} isFlipped />
                </Box>
                <Text
                  mt={2}
                  position="absolute"
                  bottom="-10"
                  ml="50%"
                  transform="translateX(-50%)"
                >
                  {card.keyword1}, {card.keyword2}, {card.keyword3}{" "}
                  {/* Affiche les mots-clés de la carte */}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          {/* Affiche l'interprétation générale du thème */}
          <Box mb={5} mt={20}>
            <Text fontSize="lg" fontWeight="bold" mb={5}>
              Interprétation Générale
            </Text>
            <Text>{themeInterpretation}</Text>{" "}
            {/* Affiche l'interprétation du thème */}
          </Box>
        </Box>
      )}
    </Box>
  );
}

// Définit les types des props attendues
TarotDeck.propTypes = {
  theme: PropTypes.string.isRequired, // Le thème du tirage est requis
  onDrawComplete: PropTypes.func.isRequired, // La fonction à appeler à la fin du tirage est requise
};

export default TarotDeck;
