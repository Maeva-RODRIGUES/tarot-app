// src/pages/TarotHistoryPage.jsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Icon,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { FaUser, FaRegFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Header from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { fetchUserDrawings } from "../api/drawApi";

function TarotHistoryPage() {
  // État pour stocker les tirages et l'état de chargement
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel API pour récupérer les tirages de l'utilisateur
        const data = await fetchUserDrawings(user.userId);
        setDrawings(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tirages :", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige vers la page d'accueil après la déconnexion
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />

      <Flex
        as="nav"
        p="4"
        bg="customBlue"
        color="white"
        direction="column"
        height="calc(100vh - 60px)"
        width="250px"
        position="fixed"
        top="100px"
        left="0"
        boxShadow="md"
      >
        <VStack align="start" spacing="4" w="full">
          <RouterLink
            to={`/profile/${user?.userId}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaUser} />
              <Text>Mon profil</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to={`/profile/${user?.userId}/drawingsstory`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaRegFileAlt} />
              <Text>Mes tirages</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to={`/profile/${user?.userId}/settings`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaCog} />
              <Text>Paramètres</Text>
            </HStack>
          </RouterLink>

          <Spacer />

          <Button
            onClick={handleLogout}
            variant="link"
            color="white"
            _hover={{ textDecoration: "none", color: "blue.400" }}
          >
            <HStack>
              <Icon as={FaSignOutAlt} />
              <Text>Déconnexion</Text>
            </HStack>
          </Button>
        </VStack>
      </Flex>

      <Box ml="250px" p="8" pt="8" flex="1">
        <Heading mb="4">Historique des tirages de tarot</Heading>
        {loading ? (
          <Text>Chargement...</Text>
        ) : (
          // ---------------------------------
          // Début de la partie mise à jour
          drawings.map((draw, index) => {
            // Analyse des cartes pour chaque tirage
            const cardsArray =
              typeof draw.cards === "string"
                ? JSON.parse(draw.cards).cards
                : draw.cards;
            return (
              <Box
                key={index}
                mb="8"
                p="4"
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.200"
                bg="white"
                boxShadow="md"
              >
                <Heading size="md" mb="4">
                  Tirage {index + 1} -{" "}
                  {new Date(draw.date).toLocaleDateString("fr-FR")}
                </Heading>
                <Text fontSize="lg" mb="4" fontWeight="bold">
                  Thème : {draw.Theme.title_theme} {/* Affichage du thème */}
                </Text>
                <VStack spacing="4" align="start">
                  {/* Affichage des cartes */}
                  {cardsArray.map((card, cardIndex) => (
                    <Box key={cardIndex} mb="4">
                      <Image
                        src={`http://localhost:8000/${card.image_url}`}
                        alt={`Card ${cardIndex + 1}`}
                        boxSize="100px"
                        objectFit="contain"
                        mb="2"
                      />
                      <Text fontSize="md">{card.name_card}</Text>
                    </Box>
                  ))}
                  <Box mt="4">
                    <Heading size="sm">Interprétation générale :</Heading>
                    <Text fontSize="md" mt="2">
                      {/* Affichage de l'interprétation */}
                      {typeof draw.cards === "string"
                        ? JSON.parse(draw.cards).interpretation
                        : draw.cards.interpretation}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            );
          })
          // Fin de la partie mise à jour
          // -------------------
        )}
      </Box>

      <Footer />
    </Box>
  );
}

export default TarotHistoryPage;
