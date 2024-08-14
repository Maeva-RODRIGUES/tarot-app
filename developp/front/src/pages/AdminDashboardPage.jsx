// AdminDashboardPage.jsx : Vue d'ensemble des statistiques et des options administratives

import React from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  HStack,
  Icon,
  Text,
  Button,
  Spacer,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import {
  FaUser,
  FaRegFileAlt,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaFileAlt,
  FaChartLine,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import Header from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";

function AdminDashboardPage() {
  const { logout } = useAuth();

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
            to="/admin/users"
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaUsers} />
              <Text>Gestion des utilisateurs</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to="/admin/content"
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaFileAlt} />
              <Text>Gestion du contenu</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to="/admin/settings"
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

      <Box ml="250px" p="8" pt="2" flex="1">
        <Heading mb="12">Tableau de bord administrateur</Heading>
        {/* Ajout des statistiques */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          <Stat
            p="4"
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.200"
            bg="white"
            boxShadow="md"
          >
            <StatLabel>Utilisateurs actifs</StatLabel>
            <StatNumber>1,200</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              5.5%
            </StatHelpText>
          </Stat>

          <Stat
            p="4"
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.200"
            bg="white"
            boxShadow="md"
          >
            <StatLabel>Contenus publiés</StatLabel>
            <StatNumber>350</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              3.2%
            </StatHelpText>
          </Stat>

          <Stat
            p="4"
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.200"
            bg="white"
            boxShadow="md"
          >
            <StatLabel>Nouvelles inscriptions</StatLabel>
            <StatNumber>120</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              1.8%
            </StatHelpText>
          </Stat>
        </SimpleGrid>
      </Box>

      <Footer />
    </Box>
  );
}

export default AdminDashboardPage;
