// ChakraProviderWrapper.jsx

import React from "react"; // Importation de React pour créer des composants
import PropTypes from "prop-types"; // Importation de PropTypes pour la validation des types de propriétés
import { ChakraProvider, extendTheme } from "@chakra-ui/react"; // Importation de ChakraProvider et extendTheme de Chakra UI
import { mode } from "@chakra-ui/theme-tools"; // Importation de la fonction mode pour gérer les modes clair et sombre

// Création d'un thème personnalisé avec extendTheme
const theme = extendTheme({
  colors: {
    customBlue: "#191970", 
  },
  fonts: {
    heading: "Cinzel_Decorative, sans-serif",  // Pour les titres
    body: "Urbanist, sans-serif",  // Pour le texte
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("", "gray.800")(props), 
        color: mode("gray.800", "whiteAlpha.900")(props), 
        fontFamily: "Urbanist, sans-serif",  // Police par défaut pour le texte
      },
      h1: {
        fontFamily: "Cinzel_Decorative, sans-serif",  // Police pour h1
        fontSize: { base: "24px", md: "32px", lg: "40px" }, 
        fontWeight: "bold",
        lineHeight: "110%",
        marginBottom: "1rem",
      },
      h2: {
        fontFamily: "Cinzel_Decorative, sans-serif",  // Police pour h2
        fontSize: { base: "20px", md: "28px", lg: "36px" }, 
        fontWeight: "semibold",
        lineHeight: "110%",
        marginBottom: "1rem",
      },
      h3: {
        fontFamily: "Cinzel_Decorative, sans-serif",  // Police pour h3
        fontSize: { base: "18px", md: "24px", lg: "30px" }, 
        fontWeight: "medium",
        lineHeight: "110%",
        marginBottom: "1rem",
      },

      h4: {
        fontFamily: "Urbanist, sans-serif",  // Police pour h4
        fontSize: { base: "18px", md: "24px", lg: "30px" }, 
        fontWeight: "normal",
        lineHeight: "110%",
        marginBottom: "1rem",
      },



      p: {
        fontFamily: "Urbanist, sans-serif",  // Police pour le texte
        fontSize: { base: "12px", md: "14px", lg: "16px" }, 
        lineHeight: "1.7",
        marginBottom: "1rem",
      },
    }),
  },
  components: {
    Heading: {
      baseStyle: {
        lineHeight: "110%",
        marginBottom: "1rem",
      },
      sizes: {
        xl: {
          fontSize: { base: "24px", md: "32px", lg: "40px" },
        },
        lg: {
          fontSize: { base: "20px", md: "28px", lg: "36px" },
        },
        md: {
          fontSize: { base: "18px", md: "24px", lg: "30px" },
        },
        sm: {
          fontSize: { base: "16px", md: "20px", lg: "24px" },
        },
      },
    },
    Text: {
      baseStyle: {
        lineHeight: "1.7",
      },
      sizes: {
        md: {
          fontSize: { base: "16px", md: "18px", lg: "20px" },
        },
        sm: {
          fontSize: { base: "14px", md: "16px", lg: "18px" },
        },
      },
    },
  },
});

function ChakraProviderWrapper({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

ChakraProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChakraProviderWrapper;
