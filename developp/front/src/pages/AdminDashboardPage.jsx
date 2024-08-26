/* eslint-disable no-undef */
// AdminDashboardPage.jsx : Vue d'ensemble des statistiques et des options administratives

import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import Header from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import SidebarNav from "../components/SidebarNav"; // Ajout MAJ

function AdminDashboardPage() {
  const { logout } = useAuth();

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige vers la page d'accueil après la déconnexion
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      {/* Inclusion de l'en-tête du tableau de bord */}
      <Header />

      {/* Menu de navigation latéral */}
      <SidebarNav /> {/* Ajout MAJ */}

      {/* Contenu principal du tableau de bord */}
      <Box
        ml={{ base: "0", md: "250px" }} // Ajustement de la marge gauche pour les petits écrans
        p="8"
        pt="2"
        flex="1"
      >
        <Heading mb="12">Tableau de bord administrateur</Heading>

        {/* Section des statistiques, avec une grille responsive */}
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

      {/* Inclusion du pied de page */}
      <Footer />
    </Box>
  );
}

export default AdminDashboardPage;
