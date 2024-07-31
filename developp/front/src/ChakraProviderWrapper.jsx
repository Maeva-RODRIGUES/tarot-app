// ChakraProviderWrapper.jsx

import React from "react"; // Importation de React pour créer des composants
import PropTypes from "prop-types"; // Importation de PropTypes pour la validation des types de propriétés
import { ChakraProvider, extendTheme } from "@chakra-ui/react"; // Importation de ChakraProvider et extendTheme de Chakra UI
import { mode } from "@chakra-ui/theme-tools"; // Importation de la fonction mode pour gérer les modes clair et sombre

// Création d'un thème personnalisé avec extendTheme
const theme = extendTheme({
  colors: {
    customBlue: "#191970", // Définissez votre couleur personnalisée ici
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("", "gray.800")(props), // Définition de la couleur de fond en fonction du mode (clair ou sombre)
      },
    }),
  },
});

// Composant ChakraProviderWrapper qui enveloppe ses enfants avec ChakraProvider et applique le thème personnalisé
function ChakraProviderWrapper({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

// Validation des types de propriétés pour ChakraProviderWrapper
ChakraProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired, // children doit être un nœud React et est requis
};

export default ChakraProviderWrapper; // Exportation du composant pour l'utiliser dans d'autres fichiers
