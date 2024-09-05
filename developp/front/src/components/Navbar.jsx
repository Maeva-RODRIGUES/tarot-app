// Navbar.jsx

import React from "react";
import {
  Box,
  Flex,
  Spacer,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { usePopup } from "./context/PopupContext";

function Navbar({ logo }) {
  const { openPopup } = usePopup();
  const { isOpen, onOpen, onClose } = useDisclosure();

// Déterminer si les liens "Connexion" et "Inscription" doivent être affichés
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Box
      bg="black"
      color="white"
      fontFamily="Urbanist, sans-serif"
      p={2}
      w="100vw"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
    >
      <Flex
        align="center"
        maxW="1200px"
        mx="auto"
        w="100%"
        direction={{ base: "row", md: "row" }}
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

        {/* Section de gauche avec les liens de navigation */}
        <Flex
          align="center"
          mb={{ base: 4, md: 0 }}
          display={{ base: "none", md: "flex" }} // Masqué sur mobile/tablette
        >
          <RouterLink to="/"  style={{
              marginRight: "20px",
              color: "white",
              fontWeight: "bold",
              fontFamily: "Urbanist, sans-serif",
            }}
            >

            Accueil
          </RouterLink>
          <RouterLink
            to="/#tirages"
             style={{
              marginRight: "20px",
              color: "white",
              fontWeight: "bold",
              fontFamily: "Urbanist, sans-serif",
            }}
          >
            Tirages
          </RouterLink>
          <RouterLink
            to="/about"
            style={{
              marginRight: "20px",
              color: "white",
              fontWeight: "bold",
              fontFamily: "Urbanist, sans-serif",
            }}
          >
            À propos
          </RouterLink>
          <span
            onClick={() => openPopup("contact")}
            style={{
              marginRight: "20px",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontFamily: "Urbanist, sans-serif",
            }}
          >
            Contact
          </span>
        </Flex>

        <Spacer />

    
        {/* Section de droite avec les boutons de connexion/inscription et le logo */}
        <Flex align="center" fontWeight="bold">
          {isDesktop && (
            <>
              <span
                onClick={() => openPopup("login")}
                style={{
                  marginRight: "20px",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontFamily: "Urbanist, sans-serif",
                }}
              >
                Connexion
              </span>
              <span
                onClick={() => openPopup("signup")}
                style={{
                  marginRight: "20px",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontFamily: "Urbanist, sans-serif",
                }}
              >
                Inscription
              </span>
            </>
          )}
          <Box
            as="img"
            src={logo}
            alt="Logo"
            height={{ base: "40px", md: "70px" }} // Ajuste la taille du logo selon la taille de l'écran
            ml="auto" // Aligne le logo à droite
          />
        </Flex>
      </Flex>

      {/* Drawer pour le menu burger */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
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
              <RouterLink
                to="/#tirages"
                onClick={onClose}
                style={{ color: "white" }}
              >
                Tirages
              </RouterLink>
              <RouterLink
                to="/about"
                onClick={onClose}
                style={{ color: "white" }}
              >
                À propos
              </RouterLink>
              <span
                onClick={() => {
                  openPopup("contact");
                  onClose();
                }}
                style={{ color: "white", cursor: "pointer" }}
              >
                Contact
              </span>
              <span
                onClick={() => {
                  openPopup("login");
                  onClose();
                }}
                style={{ color: "white", cursor: "pointer" }}
              >
                Connexion
              </span>
              <span
                onClick={() => {
                  openPopup("signup");
                  onClose();
                }}
                style={{ color: "white", cursor: "pointer" }}
              >
                Inscription
              </span>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

Navbar.propTypes = {
  logo: PropTypes.string.isRequired,
};

export default Navbar;
