/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/extensions */
// AboutPage.jsx

// Importation des dépendances nécessaires
import React from "react";
import { Box, Heading, Flex, Image, Button, Text } from "@chakra-ui/react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import AppointmentPopup from "../components/AppointmentPopup.jsx";
import { usePopup } from "../components/context/PopupContext.jsx";
import backgroundAbout from "../assets/img/cartomancienne.jpg";
import footerBannerAbout from "../assets/img/destinee.png";

function AboutPage() {
  const { openPopup } = usePopup(); // Récupère la fonction pour ouvrir le popup

  // Fonction déclenchée lorsque l'utilisateur clique sur le bouton "Prendre RDV"
  const handleClick = () => {
    console.log("Bouton cliqué !");
    openPopup("contact"); // Ouvre le popup avec le type 'contact'
  };

  return (
    <Box>
      <Header
        bannerSrc={backgroundAbout}
        bannerAlt="Bannière about"
        bannerHeight="300px"
      />
      <Box p="5" textAlign="center">
        <Heading>Bienvenue sur la roue du destin</Heading>
      </Box>
      <Box p="8">
        <Flex
          direction={{ base: "column", md: "row" }} // Flex direction responsive
          align="flex-start"
          alignItems="center"
          mt={{ base: "0", md: "-80px" }} // Marge responsive en haut
        >
          <Box flex="1" mb={{ base: "8", md: "0" }}>
            {" "}
            {/* Marges ajustées pour le responsive */}
            <Heading size="md" fontFamily="Urbanist">
              Votre espace dédié au tirage de tarot en ligne.
            </Heading>
            <Text mt="6">
              Nous offrons une expérience unique de divination à travers les
              cartes de tarot,
              <br /> permettant à chacun de découvrir des perspectives et des
              conseils pour son chemin de vie.
            </Text>
            <Text mt="2">
              Notre site est conçu pour vous guider dans l'exploration de votre
              avenir avec des tirages interactifs et des interprétations
              profondes.
            </Text>
          </Box>
          <Image
            src="/src/assets/icons/iconcards.png"
            alt="Illustration"
            boxSize={{ base: "300px", md: "500px" }} // Taille responsive
            width={{ base: "100%", md: "700px" }} // Largeur responsive
            height={{ base: "auto", md: "700px" }} // Hauteur responsive
            objectFit="contain" // Assure que l'image garde ses proportions
            ml={{ base: "0", md: "8" }} // Marge responsive à gauche
            mt={{ base: "4", md: "0" }} // Marge responsive en haut
            transform="rotate(30deg)" // Rotation de l'image
          />
        </Flex>
      </Box>

      <Flex
        p="8"
        direction={{ base: "column", md: "row" }} // Flex direction responsive
        justifyContent="space-between"
        alignItems="center"
      >
        <Image
          src="/src/assets/img/visagecarto.png"
          alt="Illustration"
          boxSize={{ base: "300px", md: "500px" }} // Taille responsive
          width={{ base: "100%", md: "600px" }} // Largeur responsive
          height={{ base: "auto", md: "600px" }} // Hauteur responsive
          marginTop={{ base: "0", md: "-300px" }} // Marge responsive en haut
          mb={{ base: "8", md: "0" }} // Marge en bas responsive
        />
        <Box
          ml={{ base: "0", md: "8" }}
          textAlign={{ base: "center", md: "left" }}
        >
          {" "}
          {/* Alignement et marge responsive */}
          <Heading size="md" fontFamily="Urbanist">
            Rencontrez notre cartomancienne professionnelle
          </Heading>
          <Text mt="4">
            Avec des années d'expérience et une connaissance approfondie des
            arcanes du tarot,
            <br /> <strong>Eva Capri</strong> vous offre des consultations
            personnalisées pour répondre à vos questions les plus intimes.{" "}
            <br /> Que ce soit pour l'amour, la carrière ou le développement
            personnel, elle utilise son intuition <br /> et son expertise pour
            vous fournir des éclairages précis et des conseils pratiques.
          </Text>
          <Text mt="2">
            Elle est là pour vous fournir des éclairages précis et des conseils
            pratiques.
          </Text>
        </Box>
      </Flex>

      <Box p="10" textAlign="center" mx="auto" maxW="container.md">
        <Heading size="md" fontFamily="Urbanist">
          Prenez rendez-vous pour une consultation approfondie
        </Heading>
        <Text mt="8">
          Pour ceux qui recherchent une guidance plus détaillée,{" "}
          <strong>Eva Capri</strong> est disponible pour des séances privées.
          Contactez-nous pour planifier votre consultation personnelle et
          commencez votre voyage vers la découverte de soi.
        </Text>
        <Button
          mt="8"
          bg="#191970"
          color="white"
          _hover={{ bg: "#000080" }}
          onClick={handleClick}
        >
          Prendre RDV
        </Button>
      </Box>
      <Footer
        bannerSrc={footerBannerAbout}
        bannerAlt="Bannière de pied de page about"
        bannerHeight="300px"
      />
      {/* Le popup sera affiché en fonction de l'état du contexte */}
      <AppointmentPopup />
    </Box>
  );
}

export default AboutPage;
