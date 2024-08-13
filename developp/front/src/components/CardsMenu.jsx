// CardsMenu.jsx

import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAuth } from "./context/AuthContext"; // Importation du contexte d'authentification
import { usePopup } from "./context/PopupContext"; // Importation du contexte de popup

const MotionBox = motion(Box);

function CardsMenu() {
  const { isAuthenticated } = useAuth(); // Vérifier si l'utilisateur est authentifié
  const { openPopup } = usePopup(); // Accéder à la fonction pour ouvrir la popup

  const handleNavigation = (path) => {
    if (isAuthenticated()) {
      window.location.href = path; // Redirection vers la page de tirage si l'utilisateur est connecté
    } else {
      openPopup("login"); // Ouvrir la popup de connexion si l'utilisateur n'est pas connecté
    }
  };

  return (
    <Box as="main" p={20}>
      <Flex justify="center" align="center">
        <MotionBox
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          m={2}
          onClick={() => handleNavigation("/tarot-draw/love")}
        >
          <Image
            src="/src/assets/icons/cardiconlove.png"
            alt="Love"
            boxSize="400px"
            objectFit="cover"
          />
        </MotionBox>

        <MotionBox
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          m={2}
          onClick={() => handleNavigation("/tarot-draw/career")}
        >
          <Image
            src="/src/assets/icons/cardiconwork.png"
            alt="Work"
            boxSize="400px"
            objectFit="cover"
          />
        </MotionBox>

        <MotionBox
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          m={2}
          onClick={() => handleNavigation("/tarot-draw/spiritual")}
        >
          <Image
            src="/src/assets/icons/cardiconspirituel.png"
            alt="Spirit"
            boxSize="400px"
            objectFit="cover"
          />
        </MotionBox>
      </Flex>
    </Box>
  );
}

export default CardsMenu;
