// CardsMenu.jsx

import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { usePopup } from "./context/PopupContext";

const MotionBox = motion(Box);

function CardsMenu() {
  const { isAuthenticated } = useAuth();
  const { openPopup } = usePopup();
  const navigate = useNavigate();

  const handleNavigation = (path, theme) => {
    if (isAuthenticated()) {
      navigate(path);
    } else {
      localStorage.setItem("selectedTheme", theme); // Sauvegarde le thème sélectionné
      openPopup("login"); // Ouvre la popup de connexion
    }
  };

  return (
    <Box as="main" p={20}>
      <Flex justify="center" align="center">
        <MotionBox
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          m={2}
          onClick={() => handleNavigation("/tarot-draw/love", "love")}
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
          onClick={() => handleNavigation("/tarot-draw/career", "career")}
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
          onClick={() => handleNavigation("/tarot-draw/spiritual", "spiritual")}
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
