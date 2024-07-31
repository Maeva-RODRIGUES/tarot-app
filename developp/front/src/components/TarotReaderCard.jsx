// TarotReaderCard.jsx

import React from "react";
import { Box, Heading, Flex, Image, Text, Button } from "@chakra-ui/react";

function Cartomancienne() {
  return (
    <Box mt={500} mb={20} textAlign="center" position="relative" zIndex="1">
      <Heading as="h3" mb={70}>
        NOTRE CARTOMANCIENNE
      </Heading>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        borderColor="black" // Couleur de la bordure noire
        boxShadow="lg" // Effet ombré
        maxWidth="600px" // Limite la largeur de la Box
        mx="auto" // Centre la Box horizontalement
      >
        <Flex align="left">
          <Image
            src="/src/assets/img/cartomancienne.jpg"
            alt="Cartomancienne"
            boxSize="150px"
            borderRadius="full"
            mr={8}
          />
          <Box>
            <Heading as="h4" size="md" mb={6} textAlign="left">
              Eva Capri
            </Heading>
            <Text mb={8} whiteSpace="normal" textAlign="left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Box>
        </Flex>
        <Button
          bg="#191970"
          color="white"
          _hover={{ bg: "#00008B" }}
          position="absolute"
          bottom="-80px"
          left="50%"
          transform="translateX(-50%)"
        >
          Prendre RDV
        </Button>
      </Box>
    </Box>
  );
}

export default Cartomancienne;
