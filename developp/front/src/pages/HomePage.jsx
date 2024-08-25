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
          position="absolute"
          // Responsiv
          top={{ base: "80px", md: "100px", lg: "120px" }}
          left="50%"
          transform="translateX(-50%)"
        >
          TOUS NOS TIRAGES
        </Heading>
        <Box mt={{ base: "40px", md: "60px", lg: "80px" }}>
          {/* Responsiv CardsMenu */}
          <CardsMenu />
        </Box>
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
              // Responsiv
              boxSize={{ base: "100%", md: "600px", lg: "800px" }}
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
            <Box
              mb={2}
              ml={{ base: 0, md: "540px" }}
              mt={{ base: 0, md: "70px" }}
              position="relative"
              zIndex="1"
            >
              <Heading as="h2">VOS TÉMOIGNAGES</Heading>
            </Box>
          </Flex>
        </Box>
        <Flex justify="right" align="center" mt={4}>
          <Box w={{ base: "100%", md: "75%", lg: "58%" }}>
            {/* Responsiv TestimonialsCarousel */}
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
        // Responsiv bannerHeight footer
        bannerHeight={{ base: "200px", md: "300px", lg: "400px" }}
      />
    </Box>
  );
}

export default Homepage;
