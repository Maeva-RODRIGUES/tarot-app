/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
// src/pages/DashboardUserPage.jsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  HStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { useNavigate, useParams, Outlet  } from "react-router-dom";
import HeaderDashboard from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { getUserData } from "../api/usersApi";
import { fetchLastDrawingForUser } from "../api/drawApi";
import SidebarNav from "../components/SidebarNav"; // Importer le composant SidebarNav

function DashboardUserPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { userId } = useParams();
  const toast = useToast();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastDrawing, setLastDrawing] = useState(null);

  // Chargement des données utilisateur et du dernier tirage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(userId);
        setUserData(data);

        const lastDrawingData = await fetchLastDrawingForUser(userId);
        setLastDrawing(lastDrawingData);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les données utilisateur.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [userId, toast, navigate]);

  // Gestion de la déconnexion
  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/"); // Redirige vers la page d'accueil après la déconnexion
  };

  // Gestion du bouton "Voir plus"
  const handleViewMoreClick = () => {
    navigate(`/profile/${userId}/drawingsstory`);
  };

  // Affichage d'un spinner pendant le chargement
  if (loading) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  // Gestion des erreurs de chargement des données utilisateur
  if (!userData) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Erreur de chargement des données utilisateur.</Text>
      </Box>
    );
  }

  // Formater la date et l'heure pour l'affichage
  const formattedDate = lastDrawing?.date
    ? new Date(lastDrawing.date).toLocaleDateString("fr-FR")
    : "Aucune activité récente";

  const formattedTime = lastDrawing?.date
    ? new Date(lastDrawing.date).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Aucune activité récente";

    return (
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <HeaderDashboard />
        <Flex>
          <SidebarNav /> {/* Remplacer la barre de navigation latérale par SidebarNav */}
          <Box ml={{ base: "0", md: "250px" }} p="8" pt="8" flex="1">
            {/* Activité Récente */}
            <Box
              p="4"
              borderWidth="1px"
              borderRadius="md"
              borderColor="gray.200"
              bg="white"
              boxShadow="md"
              mb="8"
              maxWidth={{ base: "100%", sm: "300px" }} // Responsivité de la largeur du box
            >
              <Heading size="md" mb="4" fontFamily="Urbanist">
                Activité Récente :
              </Heading>
              <HStack spacing="2">
                <CalendarIcon boxSize="4" color="customBlue" mt="-4" />
                <Text fontSize="lg">Date : {formattedDate}</Text>
              </HStack>
              <HStack spacing="2" mt="-6">
                <TimeIcon boxSize="4" color="customBlue" mt="-4"/>
                <Text fontSize="lg">Heure : {formattedTime}</Text>
              </HStack>
            </Box>
            {/* Dernier Tirage */}
            <Flex direction="column" alignItems="center" mb="8">
              <Heading size="lg" mb="16" textAlign="center">
                Votre dernier tirage
              </Heading>
              <Flex mb="7" justifyContent="center" flexWrap="wrap">
                {lastDrawing?.Cards?.map((card, index) => (
                  <Image
                    key={index}
                    src={`http://localhost:8000${card.image_url}`}
                    alt={`Tarot Card ${index + 1}`}
                    width="120px"
                    height="180px"
                    borderRadius="10px"
                    mx="7"
                    my="3"
                    border="2px solid black"
                    transform={
                      index === 0
                        ? "rotate(-10deg)"
                        : index === lastDrawing.Cards.length - 1
                        ? "rotate(10deg)"
                        : "none"
                    }
                    mt={
                      index === Math.floor(lastDrawing.Cards.length / 2)
                        ? "-10px"
                        : "0"
                    }
                  />
                ))}
              </Flex>
              <Button
                mt="4"
                bg="customBlue"
                color="white"
                onClick={handleViewMoreClick}
              >
                Voir plus
              </Button>
            </Flex>
            <Outlet /> {/* Pour afficher les routes enfants */}
          </Box>
        </Flex>
        <Footer />
      </Box>
    );
  }

export default DashboardUserPage;
