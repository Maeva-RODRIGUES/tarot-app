// NavbarFooter.jsx

import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { usePopup } from "./context/PopupContext"; // Importer le hook pour gérer les popups

function NavbarFooter({ logo }) {
  const { openPopup } = usePopup(); // Obtenir la fonction pour ouvrir la popup
  const { isOpen, onOpen, onClose } = useDisclosure(); // Gestion du Drawer

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
      m={0}
    >
      <Flex
        align="center"
        maxW="1200px"
        mx="auto"
        w="100%"
        direction={{ base: "row", md: "row" }}
        flexWrap="wrap" 
        mt={{ base: 3, md: 6 }}
        justifyContent="space-between" // Permet de bien espacer les éléments
      >
        {/* Bouton du menu burger pour les petits écrans */}
        <IconButton
          display={{ base: "block", md: "none" }} // Affiché seulement sur mobile/tablette
          icon={<HamburgerIcon />}
          aria-label="Open menu"
          onClick={onOpen}
          bg="white"
          _hover={{ bg: "gray.700" }}
          mr={2}
        />

        {/* Section gauche avec les liens de navigation */}
        <Flex
          align="center"
          mb={{ base: 4, md: 0 }}
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }} // Masqué sur mobile/tablette
          justifyContent="flex-start" // Les éléments sont alignés à gauche
        >
          <RouterLink to="/" style={linkStyle}>
            Accueil
          </RouterLink>
          <RouterLink to="/#tirages" style={linkStyle}>
            Tirages
          </RouterLink>
          <RouterLink to="/about" style={linkStyle}>
            À propos
          </RouterLink>
          <span onClick={handleContactClick} style={linkStyle}>
            Contact
          </span>
          <RouterLink to="/legal-mentions" style={linkStyle}>
            Mentions légales
          </RouterLink>
          <RouterLink to="/privacy-policy" style={linkStyle}>
            Politique de confidentialité
          </RouterLink>
        </Flex>

        {/* Section droite avec le logo et le copyright */}
        <Flex
          align="center"
          justifyContent={{ base: "center", md: "flex-end" }} // Centré sur mobile, aligné à droite sur desktop
          mt={{ base: 4, md: 0 }}
          w={{ base: "100%", md: "auto" }}
        >
          <Text mr={2} fontFamily="Urbanist, sans-serif" fontWeight="bold">
            © 2024
          </Text>
          <Box
            as="img"
            src={logo}
            alt="Logo"
            height={{ base: "50px", md: "70px" }}
             marginTop="-18px"
          />
        </Flex>
      </Flex>

      {/* Drawer pour le menu burger */}
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="black">
          <DrawerCloseButton color="white" />
          <DrawerHeader borderBottomWidth="1px" color="white">
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <RouterLink to="/" onClick={onClose} style={{ color: "white" }}>
                Accueil
              </RouterLink>
              <RouterLink to="/#tirages" onClick={onClose} style={{ color: "white" }}>
                Tirages
              </RouterLink>
              <RouterLink to="/about" onClick={onClose} style={{ color: "white" }}>
                À propos
              </RouterLink>
              <span
                href="#"
                onClick={(e) => {
                  handleContactClick(e);
                  onClose();
                }}
                style={{ color: "white", cursor: "pointer" }}
              >
                Contact
              </span>
              <RouterLink to="/legal-mentions" onClick={onClose} style={{ color: "white" }}>
                Mentions légales
              </RouterLink>
              <RouterLink to="/privacy-policy" onClick={onClose} style={{ color: "white" }}>
                Politique de confidentialité
              </RouterLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

NavbarFooter.propTypes = {
  logo: PropTypes.string.isRequired, // Le logo est requis et doit être une chaîne de caractères
};

export default NavbarFooter;

// Style pour les liens
const linkStyle = {
  marginRight: "20px",
  color: "white",
  fontFamily: "Urbanist, sans-serif",
  fontWeight: "bold",
};

