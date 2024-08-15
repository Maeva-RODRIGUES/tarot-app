/* eslint-disable react/no-array-index-key */
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

// Définition de la base URL pour les images des cartes
const IMAGE_BASE_URL = "http://localhost:8000";


function TarotHistoryPage() {
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

      {/* Menu latéral pour la navigation dans le profil de l'utilisateur */}
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
          drawings.map((draw, index) => {
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
                  {draw.cards.map((card, cardIndex) => (
                    <Box key={cardIndex} mb="4">
                      <Image
                        src={`${IMAGE_BASE_URL}${card.image_url}`} // URL de l'image de la carte
                        alt={`Card ${cardIndex + 1}`}
                        boxSize="100px"
                        objectFit="contain"
                        mb="2"
                      />
                      <Text fontSize="md" fontWeight="bold">
                        {card.name_card} {/* Nom de la carte */}
                      </Text>
                      <Text fontSize="sm">
                        {card.keyword1}, {card.keyword2}, {card.keyword3}
                        {/* Affichage des keywords */}
                      </Text>
                    </Box>
                  ))}
                  <Box mt="4">
                    <Heading size="sm">Interprétation générale :</Heading>
                    <Text fontSize="md" mt="2">
                      {/* Affichage de l'interprétation générale associée au tirage */}
                      {draw.selected_interpretation ||
                        "Interprétation non disponible"}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            );
          })
        )}
      </Box>

      <Footer />
    </Box>
  );
}

export default TarotHistoryPage;
