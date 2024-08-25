/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
// src/components/Header.jsx

import React from "react";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Banner from "./Banner";
import navbarLogo from "../assets/img/logo-minimaliste.png";
import bannerLogo from "../assets/img/logo-transparent-blanc.png"; // Nouveau logo pour la bannière

function Header({
  bannerSrc,
  bannerAlt,
  bannerHeight = "auto",
  backgroundPosition = "center",
}) {
  return (
    <header>
      <Navbar logo={navbarLogo} />
      {bannerSrc && (
        <Banner
          src={bannerSrc}
          alt={bannerAlt}
          // Responsiveness added for banner height
          height={{ base: "200px", md: "300px", lg: "400px" }}
          logow={bannerLogo} // Assure-toi que la prop est bien 'logow'
          // Responsiveness added for background position
          backgroundPosition={{ base: "center", md: backgroundPosition }}
        />
      )}
    </header>
  );
}

Header.propTypes = {
  bannerSrc: PropTypes.string, // Rendre optionnel
  bannerAlt: PropTypes.string, // Rendre optionnel
  bannerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Accept both string and object for responsiveness
  backgroundPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Accept both string and object for responsiveness
};

export default Header;
