// HomePage.jsx

import React from "react";
import { Box, Heading, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardsMenu from "../components/CardsMenu";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import Cartomancienne from "../components/TarotReaderCard";
import { useParallax } from "../hooks/useParallax";
import backgroundTexture from "../assets/img/backgroungtexture.jpg";
import footerBanner from "../assets/img/footer-banner.jpg";

const MotionBox = motion(Box);

function Homepage() {
  const y = useParallax([0, 300], [0, 50]);

  return (
    <Box>
      <Header
        bannerSrc={backgroundTexture}
        bannerAlt="Bannière d'accueil"
        // Responsiv
        bannerHeight={{ base: "200px", md: "300px", lg: "400px" }}
      />
      <Box p={4} position="relative">
        <Heading
          as="h1"
          mb={8}
          id="tirages"
          position="relative"
          // Responsiv
          top={{ base: "80px", md: "100px", lg: "120px" }}
          left="50%"
          transform="translateX(-50%)"
          zIndex="1"
        >
          Tous nos tirages
        </Heading>
        <Box mt={{ base: "120px", md: "60px", lg: "80px" }}>
          {/* Responsiv CardsMenu */}
          <CardsMenu />
        </Box>

        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          mt={8}
          textAlign="center"
          justifyContent="space-between"  // Assure que l'espace entre les éléments est équilibré
        >
          <MotionBox
            flex="1"  // Assure que l'image occupe l'espace disponible à gauche
            mb={{ base: 8, lg: 0 }}
            zIndex="0"
        >
          <Image
            src="/src/assets/img/hand.jpg"
            alt="Main"
            boxSize="100%"  // L'image occupe tout l'espace disponible dans sa flexbox
            objectFit="cover"
            loading="lazy"
          />
        </MotionBox>

        <Box
          width={{ base: "100%", md: "60%", lg: "400px" }}  // Taille fixe pour le carrousel
          ml={{ lg: 8 }}  // Marge à gauche pour espacer le carrousel de l'image
          zIndex="1"
        >
          <Heading as="h2" mb={6} textAlign="center">
            Vos témoignages
          </Heading>
          <TestimonialsCarousel />
        </Box>
      </Flex>

        <Box
          mt={{ base: "100px", md: "150px", lg: "200px" }}
          pb={8}
          position="relative"
        >
          <Cartomancienne />
        </Box>
      </Box>
      <Footer
        bannerSrc={footerBanner}
        bannerAlt="Bannière de pied de page"
        bannerHeight={{ base: "200px", md: "300px", lg: "400px" }}
      />
    </Box>
  );
}

export default Homepage;

        

    
    