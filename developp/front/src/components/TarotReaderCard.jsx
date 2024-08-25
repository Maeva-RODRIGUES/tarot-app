// TarotReaderCard.jsx

import React from "react";
import { Box, Heading, Flex, Image, Text, Button } from "@chakra-ui/react";
import { usePopup } from "./context/PopupContext"; // Assurez-vous que le chemin est correct

function Cartomancienne() {
  const { openPopup } = usePopup(); // Utilisation du hook pour ouvrir la popup

  return (
    <Box
      mt={{ base: 10, md: 20, lg: 500 }} // Marge en haut responsive
      mb={20}
      textAlign="center"
      position="relative"
      zIndex="1"
    >
      <Heading as="h3" mb={{ base: 4, md: 10, lg: 70 }}>
        {" "}
        {/* Marge en bas responsive */}
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
        <Flex
          align="left"
          direction={{ base: "column", md: "row" }} // Empile verticalement sur mobile, en ligne sur plus grand écran
        >
          <Image
            src="/src/assets/img/cartomancienne.jpg"
            alt="Cartomancienne"
            boxSize={{ base: "100px", md: "150px" }} // Taille de l'image responsive
            borderRadius="full"
            mr={{ base: 0, md: 8 }} // Marge à droite seulement sur plus grand écran
            mb={{ base: 4, md: 0 }} // Marge en bas sur mobile
          />
          <Box textAlign={{ base: "center", md: "left" }}>
            {" "}
            {/* Alignement du texte responsive */}
            <Heading as="h4" size="md" mb={6}>
              Eva Capri
            </Heading>
            <Text mb={8} whiteSpace="normal">
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
          width={{ base: "80%", md: "auto" }} // Largeur du bouton responsive, plein écran sur mobile
        >
          Prendre RDV
        </Button>
      </Box>
    </Box>
  );
}

export default Cartomancienne;
