/* eslint-disable import/extensions */
/* eslint-disable react/jsx-no-undef */
// Navbar.jsx

import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom"; // Importer Link de react-router-dom
import { usePopup } from "./context/PopupContext"; // Importation du hook usePopup

function Navbar({ logo }) {
  const { openPopup } = usePopup(); // Utilisation du hook usePopup

  return (
    <Box
      bg="black"
      color="white"
      fontFamily="Urbanist"
      p={2}
      w="100vw"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
    >
      <Flex align="center" maxW="1200px" mx="auto" w="100%">
        <Flex align="center">
          <RouterLink to="/" style={{ marginRight: "20px", color: "white" }}>
            Accueil
          </RouterLink>
          <RouterLink
            to="/#tirages"
            style={{ marginRight: "20px", color: "white" }}
          >
            Tirages
          </RouterLink>
          <RouterLink
            to="/about"
            style={{ marginRight: "20px", color: "white" }}
          >
            À propos
          </RouterLink>
          <span
            onClick={() => openPopup("contact")} // Ouvrir la popup de contact
            style={{ marginRight: "20px", color: "white", cursor: "pointer" }}
          >
            Contact
          </span>
        </Flex>
        <Spacer />
        <Flex align="center" fontWeight="bold">
          <span
            onClick={() => openPopup("login")} // Ouvrir la popup de login
            style={{ marginRight: "20px", color: "white", cursor: "pointer" }}
          >
            Connexion
          </span>
          <span
            onClick={() => openPopup("signup")}
            style={{ marginRight: "20px", color: "white", cursor: "pointer" }}
          >
            Inscription
          </span>
          <Box as="img" src={logo} alt="Logo" height="70px" />
        </Flex>
      </Flex>
    </Box>
  );
}

Navbar.propTypes = {
  logo: PropTypes.string.isRequired,
};

export default Navbar;
