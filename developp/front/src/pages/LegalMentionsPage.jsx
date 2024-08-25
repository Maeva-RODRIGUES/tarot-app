// LegalMentionsPage.jsx

import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function LegalMentionsPage() {
  return (
    <div>
      {/* Inclure le Header sans bannière */}
      <Header
        bannerSrc=""
        bannerAlt=""
        bannerHeight="auto"
        backgroundPosition="center"
      />
      <main style={{ paddingTop: "100px" }}>
        {/* Contenu principal avec des mentions légales */}
        <Box
          maxW={{ base: "100%", md: "1200px" }} // Largeur maximale différente selon la taille de l'écran
          mx="auto"
          p={{ base: 4, md: 6 }} // Padding ajusté pour les petits écrans
        >
          <Heading
            as="h1"
            size={{ base: "lg", md: "xl" }} // Taille du texte adaptée selon la taille de l'écran
            mb={6}
            textAlign={{ base: "center", md: "left" }} // Centrer le titre sur les petits écrans
          >
            Mentions Légales
          </Heading>

          {/* Section des informations de l'entreprise */}
          <Box mb={6}>
            <Heading as="h2" size="lg" mb={4}>
              Informations de l'entreprise
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}> {/* Ajustement de la taille du texte */}
              <strong>Nom de l'entreprise :</strong> [Votre Nom d'Entreprise]
              <br />
              <strong>Adresse :</strong> [Votre Adresse]
              <br />
              <strong>Téléphone :</strong> [Votre Numéro de Téléphone]
              <br />
              <strong>Email :</strong> [Votre Email]
              <br />
              <strong>Site web :</strong> [Votre URL de Site Web]
            </Text>
          </Box>

          {/* Section du directeur de la publication */}
          <Box mb={6}>
            <Heading as="h2" size="lg" mb={4}>
              Directeur de la publication
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              <strong>Nom :</strong> [Nom du Directeur de la Publication]
            </Text>
          </Box>

          {/* Section de l'hébergeur du site */}
          <Box mb={6}>
            <Heading as="h2" size="lg" mb={4}>
              Hébergeur du site
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              <strong>Nom de l'hébergeur :</strong> [Nom de l'Hébergeur]
              <br />
              <strong>Adresse :</strong> [Adresse de l'Hébergeur]
              <br />
              <strong>Téléphone :</strong> [Numéro de Téléphone de l'Hébergeur]
              <br />
              <strong>Email :</strong> [Email de l'Hébergeur]
            </Text>
          </Box>

          {/* Section sur la propriété intellectuelle */}
          <Box mb={6}>
            <Heading as="h2" size="lg" mb={4}>
              Propriété intellectuelle
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Le contenu de ce site, y compris les textes, images, graphiques,
              et autres matériaux sont protégés par les lois sur la propriété
              intellectuelle et appartiennent à [Votre Nom d'Entreprise] ou sont
              utilisés avec l'autorisation des titulaires des droits d'auteur
              respectifs.
            </Text>
          </Box>

          {/* Section sur la limitation de responsabilité */}
          <Box mb={6}>
            <Heading as="h2" size="lg" mb={4}>
              Limitation de responsabilité
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              [Votre Nom d'Entreprise] ne peut être tenu responsable des
              dommages directs ou indirects résultant de l'utilisation de ce
              site ou de l'impossibilité pour un tiers de l'utiliser, ou d'un
              mauvais fonctionnement, d'une interruption, d'un virus, ou d'un
              problème de connexion.
            </Text>
          </Box>

          {/* Section sur les liens externes */}
          <Box mb={6}>
            <Heading as="h2" size="lg" mb={4}>
              Liens externes
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Ce site peut contenir des liens vers d'autres sites web. [Votre
              Nom d'Entreprise] n'est pas responsable du contenu de ces sites
              externes.
            </Text>
          </Box>
        </Box>
      </main>
      {/* Inclure le Footer */}
      <Footer bannerSrc="" bannerAlt="" bannerHeight="100px" />
    </div>
  );
}

export default LegalMentionsPage;
