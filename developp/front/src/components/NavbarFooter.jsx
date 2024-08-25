/* eslint-disable jsx-a11y/anchor-is-valid */
// NavbarFooter.jsx

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { usePopup } from "./context/PopupContext"; // Importer le hook pour gérer les popups

function NavbarFooter({ logo }) {
  const { openPopup } = usePopup(); // Obtenir la fonction pour ouvrir la popup

  // Fonction pour ouvrir le popup de contact
  const handleContactClick = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du lien
    openPopup("contact"); // Ouvre le popup de contact
  };

  return (
    <Box
      bg="black" // Fond noir pour le footer
      color="white" // Texte en blanc pour contraste
      fontFamily="Urbanist" // Police de caractères Urbanist
      p={2} // Padding de 2 unités
      w="100vw" // Largeur totale du viewport
      position="relative" // Position relative pour permettre d'autres ajustements
      bottom="0" // Positionné en bas de la page
      left="0" // Aligné à gauche
      zIndex="1000" // Assure que le footer est au-dessus d'autres éléments
      m={0} // Pas de marge externe
    >
      <Flex
        align="center"
        maxW="1200px"
        mx="auto"
        w="100%"
        direction={{ base: "column", md: "row" }} // Empile verticalement sur mobile, horizontalement sur écran moyen et plus
        textAlign={{ base: "center", md: "left" }} // Centre le texte sur mobile
      >
        {/* Section gauche avec les liens de navigation */}
        <Flex
          align="center"
          mb={{ base: 4, md: 0 }} // Marge en bas sur mobile, rien sur écran moyen et plus
          direction={{ base: "column", md: "row" }} // Empile les liens verticalement sur mobile
        >
          <Link to="/" style={{ marginRight: "20px" }}>
            Accueil
          </Link>
          <Link to="/#tirages" style={{ marginRight: "20px" }}>
            Tirages
          </Link>
          <Link to="/about" style={{ marginRight: "20px" }}>
            À propos
          </Link>
          <a
            href="#"
            onClick={handleContactClick} // Appelle la fonction pour ouvrir le popup de contact
            style={{ marginRight: "20px" }}
          >
            Contact
          </a>
          <Link to="/legal-mentions" style={{ marginRight: "20px" }}>
            Mentions légales
          </Link>
          <Link to="/privacy-policy">Politique de confidentialité</Link>
        </Flex>

        {/* Section droite avec le logo et le copyright */}
        <Flex
          align="center"
          ml={{ base: 0, md: "auto" }}
          mt={{ base: 4, md: 0 }}
        >
          <Text mr={2}>© 2024</Text>
          <Box
            as="img"
            src={logo}
            alt="Logo"
            height={{ base: "50px", md: "70px" }} // Hauteur du logo adaptée aux différentes tailles d'écran
          />
        </Flex>
      </Flex>
    </Box>
  );
}

NavbarFooter.propTypes = {
  logo: PropTypes.string.isRequired, // Le logo est requis et doit être une chaîne de caractères
};

export default NavbarFooter;
