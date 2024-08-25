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
  SimpleGrid,
  Collapse,
} from "@chakra-ui/react";
import {
  FaUser,
  FaRegFileAlt,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Header from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { fetchUserDrawings } from "../api/drawApi";

const IMAGE_BASE_URL = "http://localhost:8000";

function TarotHistoryPage() {
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsedSections, setCollapsedSections] = useState({});
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    navigate("/");
  };

  const toggleSection = (month) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
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
        height={{ base: "auto", md: "calc(100vh - 60px)" }} // Hauteur responsive
        width={{ base: "100%", md: "250px" }} // Largeur responsive
        position={{ base: "relative", md: "fixed" }} // Position responsive
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

      <Box
        ml={{ base: "0", md: "250px" }} // Marge à gauche responsive
        p="8"
        pt="8"
        flex="1"
      >
        <Heading mb="4">Historique des tirages de tarot</Heading>
        {loading ? (
          <Text>Chargement...</Text>
        ) : (
          Object.entries(
            drawings.reduce((acc, draw) => {
              const month = new Date(draw.date).toLocaleString("fr-FR", {
                month: "long",
                year: "numeric",
              });
              acc[month] = acc[month] || [];
              acc[month].push(draw);
              return acc;
            }, {}),
          ).map(([month, draws]) => (
            <Box key={month} mb="8">
              <HStack
                onClick={() => toggleSection(month)}
                cursor="pointer"
                _hover={{ color: "blue.500" }}
              >
                <Icon
                  as={collapsedSections[month] ? FaChevronRight : FaChevronDown}
                />
                <Heading size="md">{month}</Heading>
              </HStack>
              <Collapse in={!collapsedSections[month]}>
                {draws.map((draw, index) => (
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
                    <VStack spacing="6" align="start">
                      <Heading size="md" mb="4">
                        Tirage {index + 1} -{" "}
                        {new Date(draw.date).toLocaleDateString("fr-FR")}
                      </Heading>
                      <Text fontSize="lg" mb="4" fontWeight="bold">
                        Thème : {draw.Theme.title_theme}
                      </Text>

                      <Flex justifyContent="center">
                        <SimpleGrid
                          columns={{ base: 1, sm: 2, md: 3 }} // Colonnes responsives
                          spacing={10}
                          mb={8}
                        >
                          {draw.cards.map((card, cardIndex) => (
                            <Box key={cardIndex} textAlign="center">
                              <Image
                                src={`${IMAGE_BASE_URL}${card.image_url}`}
                                alt={`Card ${cardIndex + 1}`}
                                boxSize="200px"
                                height="350px"
                                objectFit="cover"
                                mb="2"
                                border="2px solid black"
                                borderRadius="15px"
                              />
                              <Text fontSize="md" fontWeight="bold">
                                {card.name_card}
                              </Text>
                              <Text fontSize="sm">
                                {card.keyword1}, {card.keyword2},{" "}
                                {card.keyword3}
                              </Text>
                            </Box>
                          ))}
                        </SimpleGrid>
                      </Flex>

                      <Box mt="4">
                        <Heading size="sm" color="purple.700">
                          Interprétation générale :
                        </Heading>
                        <Text fontSize="md" mt="2">
                          {draw.selected_interpretation ||
                            "Interprétation non disponible"}
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                ))}
              </Collapse>
            </Box>
          ))
        )}
      </Box>

      <Footer />
    </Box>
  );
}

export default TarotHistoryPage;
