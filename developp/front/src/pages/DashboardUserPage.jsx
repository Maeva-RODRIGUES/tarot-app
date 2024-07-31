// DashboardUserPage.jsx

import React from "react";
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
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { FaUser, FaRegFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Routes, Route, Link as RouterLink, useNavigate } from "react-router-dom";
import Header from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { mockUserData } from "../utils/mockData";
import UserSettingPage from "./UserSettingPage";
import TarotHistoryPage from "./TarotHistoryPage";
import { useAuth } from "../components/context/AuthContext";

function DashboardUserPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleViewMoreClick = () => {
    navigate("/drawingsstory");
  };

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
            to="/profile"
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaUser} />
              <Text>Mon profil</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to="/drawingsstory"
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaRegFileAlt} />
              <Text>Mes tirages</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to="/settings"
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
        <Routes>
          <Route path="settings" element={<UserSettingPage />} />
          <Route path="drawingsstory" element={<TarotHistoryPage />} />
          <Route
            path="*"
            element={
              <>
                <Heading mb="4">
                  Bonjour {mockUserData.name}, bienvenue sur votre espace
                  utilisateur !
                </Heading>
                <Box mb="8" />

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
                      Date : {mockUserData.recentActivity}
                    </Text>
                  </HStack>
                  <HStack spacing="4">
                    <TimeIcon boxSize="6" color="customBlue" />
                    <Text fontSize="lg">Heure : {mockUserData.recentTime}</Text>
                  </HStack>
                </Box>

                <Flex direction="column" alignItems="center" mb="8">
                  <Heading size="lg" mb="16">
                    VOTRE DERNIER TIRAGE
                  </Heading>
                  <Flex mb="7" justifyContent="center">
                    {mockUserData.lastDraw.map((src, index) => (
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
                            : index === mockUserData.lastDraw.length - 1
                            ? "rotate(10deg)"
                            : "none"
                        }
                        mt={
                          index === Math.floor(mockUserData.lastDraw.length / 2)
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
              </>
            }
          />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}

export default DashboardUserPage;

