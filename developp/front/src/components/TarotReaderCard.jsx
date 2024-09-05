// TarotReaderCard.jsx

import React from "react";
import { Box, Heading, Flex, Image, Text, Button } from "@chakra-ui/react";
import { usePopup } from "./context/PopupContext"; // Assurez-vous que le chemin est correct

function Cartomancienne() {
  const { openPopup } = usePopup(); // Utilisation du hook pour ouvrir la popup

  return (
    <Box
      mt={{ base: 10, md: 20, lg: 40 }} // Marge en haut responsive
      mb={20}
      textAlign="center"
      position="relative"
      zIndex="1"
    >
      <Heading as="h3" mb={{ base: 4, md: 10, lg: 12 }}>
        {" "}
        {/* Marge en bas responsive */}
        Notre cartomancienne
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
        mt={{ base: 8, md: 16, lg: 24 }}
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
            loading="lazy"
          />
          <Box textAlign={{ base: "center", md: "left", lg: "left" }}>
            {" "}
            {/* Alignement du texte responsive */}
            <Heading as="h4" size="md" mb={6}>
              Eva Capri
            </Heading>
            <Text as= "p" mb={8} whiteSpace="normal">
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
          width={{ base: "80%", md: "60%", lg: "150px" }}  // Largeur du bouton responsive, plein écran sur mobile
          maxWidth="150px" 
          onClick={() => openPopup("contact")} // Ouvre la popup

        >
          Prendre RDV
        </Button>
      </Box>
    </Box>
  );
}

export default Cartomancienne;
