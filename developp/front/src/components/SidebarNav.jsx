// src/components/SidebarNav.jsx

import React from "react";
import { VStack, HStack, Icon, Button, Spacer, Box, Text, useToast } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaUser, FaRegFileAlt, FaCog, FaSignOutAlt, FaUsers, FaFileAlt } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";

const SidebarNav = () => {
  const { user, logout } = useAuth();

  const toast = useToast(); 


  console.log("Données utilisateur dans SidebarNav:", user);

  const handleLogout = () => {
    logout(); // Appelle la fonction logout pour déconnecter l'utilisateur
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    
  };

  if (!user) {
    return null; // Si l'utilisateur n'est pas encore défini, ne pas afficher la barre latérale
  }

  const isAdmin = user.role?.role_name === "Admin"; // Vérification du rôle

  // Liens pour les utilisateurs standard
  const userLinks = (
    <>
      <RouterLink to={`/profile/${user.userId}`} style={{ textDecoration: "none", color: "white" }}>
        <HStack>
          <Icon as={FaUser} />
          <Text>Mon profil</Text>
        </HStack>
      </RouterLink>
      <RouterLink to={`/profile/${user.userId}/drawingsstory`} style={{ textDecoration: "none", color: "white" }}>
        <HStack>
          <Icon as={FaRegFileAlt} />
          <Text>Mes tirages</Text>
        </HStack>
      </RouterLink>
      <RouterLink to={`/profile/${user.userId}/settings`} style={{ textDecoration: "none", color: "white" }}>
        <HStack>
          <Icon as={FaCog} />
          <Text>Paramètres</Text>
        </HStack>
      </RouterLink>
    </>
  );

  // Liens pour les administrateurs
  const adminLinks = (
    <>
      <RouterLink to="/admin/users" style={{ textDecoration: "none", color: "white" }}>
        <HStack>
          <Icon as={FaUsers} />
          <Text>Gestion des utilisateurs</Text>
        </HStack>
      </RouterLink>
      <RouterLink to="/admin/content" style={{ textDecoration: "none", color: "white" }}>
        <HStack>
          <Icon as={FaFileAlt} />
          <Text>Gestion du contenu</Text>
        </HStack>
      </RouterLink>
      <RouterLink to="/admin/settings" style={{ textDecoration: "none", color: "white" }}>
        <HStack>
          <Icon as={FaCog} />
          <Text>Paramètres</Text>
        </HStack>
      </RouterLink>
    </>
  );

  return (
    <Box
      as="nav"
      p="4"
      bg="customBlue"
      color="white"
      direction="column"
      height={{ base: "auto", md: "calc(100vh - 60px)" }}
      width={{ base: "100%", md: "250px" }}
      position={{ base: "relative", md: "fixed" }}
      top={{ base: "0", md: "100px" }}
      left="0"
      boxShadow="md"
    >
      <VStack align="start" spacing="4" w="full">
        {/* Affiche les liens basés sur le rôle de l'utilisateur */}
        {isAdmin ? adminLinks : userLinks}

        <Spacer />

        <Button onClick={handleLogout} variant="link" color="white">
          <HStack>
            <Icon as={FaSignOutAlt} />
            <span>Déconnexion</span>
          </HStack>
        </Button>
      </VStack>
    </Box>
  );
};


export default SidebarNav;




