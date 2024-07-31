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
        {" "}
        {/* Ajuste la valeur selon la hauteur du header */}
        <Box maxW="1200px" mx="auto" p={6}>
          <Heading as="h1" size="xl" mb={6}>
            Mentions Légales
          </Heading>
          <Box mb={6}>
            <Heading as="h2" size="lg" mb={4}>
              Informations de l'entreprise
            </Heading>
            <Text>
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
          <Box mb={6}>
            <Heading as="h2" size="lg" mb={4}>
              Directeur de la publication
            </Heading>
            <Text>
              <strong>Nom :</strong> [Nom du Directeur de la Publication]
            </Text>
          </Box>
          <Box mb={6}>
            <Heading as="h2" size="lg" mb={4}>
              Hébergeur du site
            </Heading>
            <Text>
              <strong>Nom de l'hébergeur :</strong> [Nom de l'Hébergeur]
              <br />
              <strong>Adresse :</strong> [Adresse de l'Hébergeur]
              <br />
              <strong>Téléphone :</strong> [Numéro de Téléphone de l'Hébergeur]
              <br />
              <strong>Email :</strong> [Email de l'Hébergeur]
            </Text>
          </Box>
          <Box mb={6}>
            <Heading as="h2" size="lg" mb={4}>
              Propriété intellectuelle
            </Heading>
            <Text>
              Le contenu de ce site, y compris les textes, images, graphiques,
              et autres matériaux sont protégés par les lois sur la propriété
              intellectuelle et appartiennent à [Votre Nom d'Entreprise] ou sont
              utilisés avec l'autorisation des titulaires des droits d'auteur
              respectifs.
            </Text>
          </Box>
          <Box mb={6}>
            <Heading as="h2" size="lg" mb={4}>
              Limitation de responsabilité
            </Heading>
            <Text>
              [Votre Nom d'Entreprise] ne peut être tenu responsable des
              dommages directs ou indirects résultant de l'utilisation de ce
              site ou de l'impossibilité pour un tiers de l'utiliser, ou d'un
              mauvais fonctionnement, d'une interruption, d'un virus, ou d'un
              problème de connexion.
            </Text>
          </Box>
          <Box mb={6}>
            <Heading as="h2" size="lg" mb={4}>
              Liens externes
            </Heading>
            <Text>
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
