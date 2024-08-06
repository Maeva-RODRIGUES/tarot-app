// src/pages/DashboardUserPage.jsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  VStack,
  HStack,
  Icon,
  Spacer,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { FaUser, FaRegFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import {
  Outlet,
  Link as RouterLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import Header from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { getUserData } from "../api/usersApi";

function DashboardUserPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { userId } = useParams();
  const toast = useToast();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData(userId);
        setUserData(data);
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

  const handleViewMoreClick = () => {
    navigate(`/profile/${userId}/drawingsstory`);
  };

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
            to={`/profile/${userId}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaUser} />
              <Text>Mon profil</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to={`/profile/${userId}/drawingsstory`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaRegFileAlt} />
              <Text>Mes tirages</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to={`/profile/${userId}/settings`} // Utilisation du bon chemin pour les paramètres
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
        {/* Activité Récente */}
        <Box
          p="4"
          borderWidth="1px"
          borderRadius="md"
          borderColor="gray.200"
          bg="white"
          boxShadow="md"
          mb="8"
          maxWidth="300px"
        >
          <Heading size="md" mb="4">
            Activité Récente :
          </Heading>
          <HStack spacing="4" mb="4">
            <CalendarIcon boxSize="6" color="customBlue" />
            <Text fontSize="lg">
              Date :{" "}
              {userData.recentActivity?.date || "Aucune activité récente"}
            </Text>
          </HStack>
          <HStack spacing="4">
            <TimeIcon boxSize="6" color="customBlue" />
            <Text fontSize="lg">
              Heure :{" "}
              {userData.recentActivity?.time || "Aucune activité récente"}
            </Text>
          </HStack>
        </Box>
        {/* Dernier Tirage */}
        <Flex direction="column" alignItems="center" mb="8">
          <Heading size="lg" mb="16">
            VOTRE DERNIER TIRAGE
          </Heading>
          <Flex mb="7" justifyContent="center">
            {userData.lastDraw?.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Tarot Card ${index + 1}`}
                width="120px"
                height="180px"
                borderRadius="10px"
                mx="7"
                transform={
                  index === 0
                    ? "rotate(-10deg)"
                    : index === userData.lastDraw.length - 1
                      ? "rotate(10deg)"
                      : "none"
                }
                mt={
                  index === Math.floor(userData.lastDraw.length / 2)
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

      <Footer />
    </Box>
  );
}

export default DashboardUserPage;
