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
        const data = await getUserData(userId); // Utilisez userId ici
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
      navigate("/login"); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
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
            to={`/profile/${userId}/settings`}
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
        <Outlet /> {/* Pour afficher les routes enfants */}
      </Box>

      <Footer />
    </Box>
  );
}

export default DashboardUserPage;

