// NavbarFooter.jsx

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { usePopup } from "./context/PopupContext"; //importer le hook

function NavbarFooter({ logo }) {
  const { openPopup } = usePopup(); // Obtenir la fonction pour ouvrir la popup

  // Fonction pour ouvrir le popup de contact
  const handleContactClick = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du lien
    openPopup("contact"); // Ouvre le popup de contact
  };

  return (
    <Box
      bg="black"
      color="white"
      fontFamily="Urbanist"
      p={2}
      w="100vw"
      position="relative"
      bottom="0"
      left="0"
      zIndex="1000"
      m={0}
    >
      <Flex align="center" maxW="1200px" mx="auto" w="100%">
        <Flex align="center">
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
            onClick={handleContactClick}
            style={{ marginRight: "20px" }}
          >
            Contact
          </a>

          <Link to="/legal-mentions" style={{ marginRight: "20px" }}>
            Mentions légales
          </Link>
          <Link to="/privacy-policy">Politique de confidentialité</Link>
        </Flex>
        <Flex align="center" ml="auto">
          <Text mr={2}>© 2024</Text>
          <Box as="img" src={logo} alt="Logo" height="70px" />
        </Flex>
      </Flex>
    </Box>
  );
}

NavbarFooter.propTypes = {
  logo: PropTypes.string.isRequired,
};

export default NavbarFooter;
