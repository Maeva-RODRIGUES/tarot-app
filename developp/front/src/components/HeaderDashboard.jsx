//HeaderDashboard.jsx

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
import { FaUserCircle } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Assurez-vous que ce chemin est correct

function HeaderDashboard() {
  const { user } = useAuth(); // Supposer que vous avez un utilisateur dans votre contexte d'authentification

  // Déterminer le lien en fonction du type d'utilisateur
  const profileLink = user?.isAdmin ? "/admin" : "/profile/*"; // Modifiez selon vos routes

  return (
    <Box
      bg="white"
      borderBottom="1px"
      borderColor="customBlue"
      p="4"
      height="100px"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Image
          src="/src/assets/img/logo-transparent noir.png" // Chemin vers le logo
          alt="Logo"
          height="300px"
          width="300px"
          objectFit="contain" // Assure que le logo garde ses proportions
          marginTop="-120px" // Déplace le logo vers le haut
          marginLeft="-40px" // Déplace le logo vers la gauche
        />

        <Flex alignItems="center" mt="-100">
          <Text fontSize="lg" color="customBlue" fontWeight="bold">
            Bienvenue {user?.name} !
          </Text>
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
          <Flex direction="column" alignItems="center">
            <Avatar
              name={user?.name}
              src={user?.avatarUrl} // URL de l'avatar de l'utilisateur
              size="sm" // Ajustez la taille selon vos besoins
              color="customBlue"
              borderColor="customBlue"
              borderWidth="2px"
            />
            <Link
              as={RouterLink}
              to={profileLink}
              fontSize="sm"
              color="blue.500"
              mt="1" // Ajoute de l'espace entre l'avatar et le lien
              _hover={{ textDecoration: "underline" }}
            >
              Mon profil
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default HeaderDashboard;
