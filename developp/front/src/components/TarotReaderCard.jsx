// TarotReaderCard.jsx

import React from "react";
import { Box, Heading, Flex, Image, Text, Button } from "@chakra-ui/react";
import { usePopup } from "./context/PopupContext"; // Assurez-vous que le chemin est correct

function Cartomancienne() {
  const { openPopup } = usePopup();

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
        borderColor="black"
        boxShadow="lg"
        maxWidth="600px"
        mx="auto"
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
              Avec des années d’expérience, elle guide ses clients à travers les
              mystères de leur avenir, offrant des conseils éclairés et des
              perspectives uniques. Que vous cherchiez des réponses à des
              questions précises ou une vision globale de votre chemin de vie,
              Eva est là pour vous accompagner avec bienveillance et expertise.
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
          onClick={() => openPopup("contact")} // Ouvre la popup
        >
          Prendre RDV
        </Button>
      </Box>
    </Box>
  );
}

export default Cartomancienne;
