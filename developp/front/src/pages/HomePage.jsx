/* eslint-disable import/extensions */
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
        bannerHeight="300px"
      />
      <Box p={4}>
        <Heading as="h1" mb={4} id="tirages">
          TOUS NOS TIRAGES
        </Heading>
        <CardsMenu />
        <Box position="relative" textAlign="center" mt={8}>
          <MotionBox
            position="absolute"
            top="0"
            left="0"
            transform="translateX(0)"
            zIndex="-1"
            style={{
              transform: `translateY(${y}px)`,
              opacity: 0.8,
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 1) 80%, rgba(255, 255, 255, 0))",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
            }}
          >
            <Image
              src="/src/assets/img/hand.jpg"
              alt="Main"
              boxSize="800px"
              objectFit="cover"
            />
          </MotionBox>

          <Flex
            direction="column"
            align="center"
            mb={6}
            position="relative"
            zIndex="1"
          >
            <Box mb={2} ml="540" mt="70" position="relative" zIndex="1">
              <Heading as="h2">VOS TÉMOIGNAGES</Heading>
            </Box>
          </Flex>
        </Box>
        <Flex justify="right" align="center" mt={4}>
          <Box w="58%">
            <TestimonialsCarousel />
          </Box>
        </Flex>
        <Box mt={10} pb={8} position="relative">
          <Cartomancienne />
        </Box>
      </Box>
      <Footer
        bannerSrc={footerBanner}
        bannerAlt="Bannière de pied de page"
        bannerHeight="300px"
      />
    </Box>
  );
}

export default Homepage;
