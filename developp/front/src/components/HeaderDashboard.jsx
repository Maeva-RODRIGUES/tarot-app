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
      height={{ base: "auto", md: "100px" }} // Hauteur responsive
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }} // Disposition responsive : colonne sur mobile, ligne sur écran moyen et plus
      >
        {/* ------------------------------------------------------------------- */}
        {/* Affichage du logo avec un positionnement personnalisé */}
        <Image
          src="/src/assets/img/logo-transparent noir.png" // Chemin vers le logo
          alt="Logo"
          height={{ base: "150px", md: "200px", lg: "300px" }} // Taille responsive du logo
          objectFit="contain" // Assure que le logo garde ses proportions
          marginTop={{ base: "-60px", md: "-80px", lg: "-120px" }} // Déplacement vertical du logo en fonction de l'écran
          marginLeft={{ base: "0px", md: "-20px", lg: "-40px" }} // Déplacement horizontal du logo
        />
        {/* ------------------------------------------------------------------- */}

        <Flex
          alignItems="center"
          mt={{ base: "0px", md: "-50px", lg: "-100px" }} // Marge responsive en haut
          flexDirection={{ base: "column", md: "row" }} // Disposition en colonne sur mobile, en ligne sur plus grand écran
        >
          {/* ------------------------------------------------------------------- */}
          {/* Affiche un message de bienvenue avec le nom de l'utilisateur */}
          <Text
            fontSize={{ base: "md", md: "lg" }} // Taille de police responsive
            color="customBlue"
            fontWeight="bold"
            mb={{ base: 2, md: 0 }} // Marge inférieure sur mobile
          >
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
            mr={{ base: 0, md: 4 }} // Marge à droite sur écran moyen et plus
            mb={{ base: 2, md: 0 }} // Marge en bas sur mobile
          />
          {/* ------------------------------------------------------------------- */}

          {/* ------------------------------------------------------------------- */}
          {/* Affiche l'avatar de l'utilisateur avec son nom et un lien vers son profil */}
          <Flex direction="column" alignItems="center">
            <Avatar
              name={user?.name}
              // Mise à jour: utiliser le chemin complet pour l'URL de l'avatar
              src={
                user?.avatar_url
                  ? `http://localhost:8000${user.avatar_url}`
                  : undefined
              }
              // URL complète de l'avatar de l'utilisateur, récupérée depuis les données utilisateur
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
              mt="1" // Espace entre l'avatar et le lien
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
