/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
// BannerFooter.jsx

import React from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

// eslint-disable-next-line no-unused-vars
function BannerFooter({ src, alt, height = "100px" }) {
  return (
    <Box
      width="100%"
      height={height}
      backgroundImage={`url(${src})`}
      backgroundSize="cover"
      backgroundPosition="center"
      position="relative"
      m={0}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />
    </Box>
  );
}

BannerFooter.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  height: PropTypes.string,
};

export default BannerFooter;
