/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
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
      mt="60px" // Marge supérieure pour ne pas se superposer au Header
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
          height={{ base: "150px", md: "300px", lg: "500px" }}
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
