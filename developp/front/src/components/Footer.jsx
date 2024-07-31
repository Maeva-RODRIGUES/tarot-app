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
        <BannerFooter src={bannerSrc} alt={bannerAlt} height={bannerHeight} />
      )}
      <NavbarFooter logo={footerLogo} />
    </footer>
  );
}

Footer.propTypes = {
  bannerSrc: PropTypes.string,
  bannerAlt: PropTypes.string,
  bannerHeight: PropTypes.string,
  footerStyle: PropTypes.object,
};

export default Footer;
