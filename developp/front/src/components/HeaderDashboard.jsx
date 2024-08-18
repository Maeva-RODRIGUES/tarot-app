// HeaderDashboard.jsx

import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Text,
  Link,
  Avatar,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Utilisation du contexte d'authentification

function HeaderDashboard() {
  // Récupère les informations de l'utilisateur via le contexte d'authentification
  const { user } = useAuth();

  // Détermine le lien vers le profil en fonction du rôle de l'utilisateur
  const profileLink =
    user?.role === "Admin" ? "/admin" : `/profile/${user?.id}`;

  return (
    <Box
      bg="white"
      borderBottom="1px"
      borderColor="customBlue"
      p="4"
      height="100px"
    >
      <Flex justifyContent="space-between" alignItems="center">
        {/* ------------------------------------------------------------------- */}
        {/* Affichage du logo avec un positionnement personnalisé */}
        <Image
          src="/src/assets/img/logo-transparent noir.png" // Chemin vers le logo
          alt="Logo"
          height="300px"
          width="300px"
          objectFit="contain" // Assure que le logo garde ses proportions
          marginTop="-120px" // Déplace le logo vers le haut
          marginLeft="-40px" // Déplace le logo vers la gauche
        />
        {/* ------------------------------------------------------------------- */}

        <Flex alignItems="center" mt="-100">
          {/* ------------------------------------------------------------------- */}
          {/* Affiche un message de bienvenue avec le nom de l'utilisateur */}
          <Text fontSize="lg" color="customBlue" fontWeight="bold">
            Bienvenue {user?.name} !
          </Text>

          {/* Bouton d'icône avec une salutation */}
          <IconButton
            icon={
              <span role="img" aria-label="Wave">
                👋
              </span>
            }
            variant="ghost"
            color="customBlue"
            aria-label="Salutation"
            mr="4" // Ajoute de l'espace entre l'icône de salutation et les autres icônes
          />
          {/* ------------------------------------------------------------------- */}

          {/* ------------------------------------------------------------------- */}
          {/* Affiche l'avatar de l'utilisateur avec son nom et un lien vers son profil */}
          <Flex direction="column" alignItems="center">
            <Avatar
              name={user?.name}
              // -------------------------------------------------------------------
              // Mise à jour: utiliser le chemin complet pour l'URL de l'avatar
              src={
                user?.avatar_url
                  ? `http://localhost:8000${user.avatar_url}`
                  : undefined
              }
              // URL complète de l'avatar de l'utilisateur, récupérée depuis les données utilisateur
              // -------------------------------------------------------------------
              size="sm" // Ajuster la taille
              color="customBlue"
              borderColor="customBlue"
              borderWidth="2px"
            />
            <Link
              as={RouterLink}
              to={profileLink}
              fontSize="sm"
              color="blue.500"
              mt="1" // espace entre l'avatar et le lien
              _hover={{ textDecoration: "underline" }}
            >
              Mon profil
            </Link>
          </Flex>
          {/* ------------------------------------------------------------------- */}
        </Flex>
      </Flex>
    </Box>
  );
}

export default HeaderDashboard;
