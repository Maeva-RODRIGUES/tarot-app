/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
// Footer.jsx

import React from "react";
import PropTypes from "prop-types";
import NavbarFooter from "./NavbarFooter";
import BannerFooter from "./BannerFooter";
import footerLogo from "../assets/img/logo-minimaliste.png";

function Footer({ bannerSrc, bannerAlt, bannerHeight, footerStyle }) {
  return (
    <footer style={{ ...footerStyle, margin: 0, padding: 0 }}>
      {bannerSrc && (
        <BannerFooter
          src={bannerSrc}
          alt={bannerAlt}
          // Responsiveness added for banner height
          height={{ base: "150px", md: "250px", lg: "300px" }}
        />
      )}
      <NavbarFooter logo={footerLogo} />
    </footer>
  );
}

Footer.propTypes = {
  bannerSrc: PropTypes.string,
  bannerAlt: PropTypes.string,
  bannerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  footerStyle: PropTypes.object,
};

export default Footer;
