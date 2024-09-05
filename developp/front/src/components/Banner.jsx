// Banner.jsx

import React from "react";
import PropTypes from "prop-types";
import { Box, Image } from "@chakra-ui/react";

function Banner({
  src,
  height = "200px", // Valeur par défaut pour la hauteur
  logow, // Logo à afficher dans la bannière
  backgroundPosition = "center", // Position de l'arrière-plan
}) {
  return (
    <Box
      position="relative"
      mt={{ base: "0", md: "0" }}
      width="100%"
      height={height}
      backgroundImage={`url(${src})`}
      backgroundSize="cover"
      // Responsiveness background position
      backgroundPosition={{ base: "center", md: backgroundPosition }}
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
        <Image
          src={logow}
          alt="Logo"
          // Responsiveness logo
          height={{ base: "250px", md: "400px", lg: "600px" }}
        />
      </Box>
    </Box>
  );
}

Banner.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  logow: PropTypes.string.isRequired,
  backgroundPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Banner;
