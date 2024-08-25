/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// Navbar.jsx

import React from "react";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom"; // Importer Link de react-router-dom pour la navigation
import { usePopup } from "./context/PopupContext"; // Importer le hook usePopup pour gérer les popups

function Navbar({ logo }) {
  const { openPopup } = usePopup(); // Utilisation du hook usePopup pour ouvrir les popups

  return (
    <Box
      bg="black" // Couleur de fond de la navbar
      color="white" // Couleur du texte dans la navbar
      fontFamily="Urbanist" // Police de caractères utilisée
      p={2} // Padding de 2 unités
      w="100vw" // Largeur totale de la navbar, couvrant toute la vue
      position="fixed" // Positionnement fixe pour que la navbar reste en haut de la page
      top="0" // Positionné en haut de la page
      left="0" // Aligné à gauche
      zIndex="1000" // Assure que la navbar est au-dessus d'autres éléments
    >
      <Flex
        align="center"
        maxW="1200px"
        mx="auto"
        w="100%"
        direction={{ base: "column", md: "row" }} // Empile les éléments verticalement sur mobile, horizontalement sur écran moyen et plus
      >
        {/* Section de gauche avec les liens de navigation */}
        <Flex align="center" mb={{ base: 4, md: 0 }}> {/* Ajoute une marge en bas sur mobile */}
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
            onClick={() => openPopup("contact")} // Ouvre la popup de contact
            style={{ marginRight: "20px", color: "white", cursor: "pointer" }} // Ajout du curseur pointer pour indiquer qu'il est cliquable
          >
            Contact
          </span>
        </Flex>
        <Spacer /> {/* Espace entre les deux sections (liens de gauche et éléments de droite) */}
        {/* Section de droite avec les boutons de connexion/inscription et le logo */}
        <Flex align="center" fontWeight="bold">
          <span
            onClick={() => openPopup("login")} // Ouvre la popup de connexion
            style={{ marginRight: "20px", color: "white", cursor: "pointer" }}
          >
            Connexion
          </span>
          <span
            onClick={() => openPopup("signup")} // Ouvre la popup d'inscription
            style={{ marginRight: "20px", color: "white", cursor: "pointer" }}
          >
            Inscription
          </span>
          <Box
            as="img"
            src={logo}
            alt="Logo"
            height={{ base: "50px", md: "70px" }} // Taille du logo adaptée aux différentes tailles d'écran
          />
        </Flex>
      </Flex>
    </Box>
  );
}

Navbar.propTypes = {
  logo: PropTypes.string.isRequired, // Le logo est requis et doit être une chaîne de caractères
};

export default Navbar;
