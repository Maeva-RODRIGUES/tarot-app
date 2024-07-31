// Banner.jsx

import React from "react";
import PropTypes from "prop-types";
import { Box, Image } from "@chakra-ui/react";

function Banner({
  src,
  alt,
  height = "300px", // Valeur par défaut pour la hauteur
  logow, // Logo à afficher dans la bannière
  backgroundPosition = "center", // Position de l'arrière-plan
}) {
  return (
    <Box
      position="relative"
      mt="60px" // Marge supérieure pour ne pas se superposer au Header
      width="100%"
      height={height}
      backgroundImage={`url(${src})`}
      backgroundSize="cover"
      backgroundPosition={backgroundPosition}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
      >
        <Image src={logow} alt="Logo" height="500px" />{" "}
        {/* Ajuste la taille du logo ici si nécessaire */}
      </Box>
    </Box>
  );
}

Banner.propTypes = {
  src: PropTypes.string.isRequired, // URL de l'image de la bannière
  alt: PropTypes.string.isRequired, // Texte alternatif pour l'image
  height: PropTypes.string, // Hauteur de la bannière
  logow: PropTypes.string.isRequired, // URL du logo à afficher dans la bannière
  backgroundPosition: PropTypes.string, // Position de l'arrière-plan
};

export default Banner;
