// PrivacyPolicyPage.jsx

import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PrivacyPolicyPage() {
  return (
    <div>
      <Header />
      <main>
        <Box
          maxW={{ base: "100%", md: "1200px" }} // Largeur maximale ajustée pour différentes tailles d'écran
          mx="auto"
          p={{ base: 4, md: 8 }} // Padding ajusté pour les petits et grands écrans
          pt={{ base: 20, md: 32 }} // Padding-top augmenté, ajusté pour les petits écrans
        >
          <Heading
            as="h1"
            size={{ base: "lg", md: "xl" }} // Taille du titre ajustée pour les petits écrans
            mb={{ base: 6, md: 8 }} // Marge en bas ajustée
            
          >
            Politique de Confidentialité
          </Heading>
          <Box mb={{ base: 6, md: 8 }}>
            <Heading as="h2" size="lg" mb={4} fontFamily="Urbanist">
              Collecte des informations
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Nous collectons des informations lorsque vous vous inscrivez sur
              notre site, vous connectez à votre compte, faites un achat,
              participez à un concours, et/ou lorsque vous vous déconnectez. Les
              informations collectées incluent votre nom, adresse e-mail, numéro
              de téléphone et/ou carte de crédit.
            </Text>
          </Box>
          <Box mb={{ base: 6, md: 8 }}>
            <Heading as="h2" size="lg" mb={4} fontFamily="Urbanist">
              Utilisation des informations
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Toutes les informations que nous recueillons auprès de vous
              peuvent être utilisées pour :
            </Text>
            <Box
              as="ul"
              pl={{ base: 4, md: 8 }}
              fontSize={{ base: "sm", md: "md" }}
            >
              <Box as="li" mb={2}>
                Personnaliser votre expérience et répondre à vos besoins
                individuels
              </Box>
              <Box as="li" mb={2}>
                Fournir un contenu publicitaire personnalisé
              </Box>
              <Box as="li" mb={2}>
                Améliorer notre site web
              </Box>
              <Box as="li" mb={2}>
                Améliorer le service client et vos besoins de prise en charge
              </Box>
              <Box as="li" mb={2}>
                Vous contacter par e-mail
              </Box>
              <Box as="li" mb={2}>
                Administrer un concours, une promotion ou une enquête
              </Box>
            </Box>
          </Box>
          <Box mb={{ base: 6, md: 8 }}>
            <Heading as="h2" size="lg" mb={4} fontFamily="Urbanist">
              Confidentialité des informations
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Nous sommes les seuls propriétaires des informations recueillies
              sur ce site. Vos informations personnelles ne seront pas vendues,
              échangées, transférées, ou données à une autre société pour
              n'importe quelle raison, sans votre consentement, en dehors de ce
              qui est nécessaire pour répondre à une demande et/ou transaction,
              comme par exemple pour expédier une commande.
            </Text>
          </Box>
          <Box mb={{ base: 6, md: 8 }}>
            <Heading as="h2" size="lg" mb={4} fontFamily="Urbanist">
              Divulgation à des tiers
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Nous ne vendons, n'échangeons et ne transférons pas vos
              informations personnelles identifiables à des tiers. Cela ne
              comprend pas les tierce parties de confiance qui nous aident à
              exploiter notre site Web ou à mener nos affaires, tant que ces
              parties conviennent de garder ces informations confidentielles.
            </Text>
          </Box>
          <Box mb={{ base: 6, md: 8 }}>
            <Heading as="h2" size="lg" mb={4} fontFamily="Urbanist">
              Protection des informations
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Nous mettons en œuvre une variété de mesures de sécurité pour
              préserver la sécurité de vos informations personnelles. Nous
              utilisons un cryptage à la pointe de la technologie pour protéger
              les informations sensibles transmises en ligne. Nous protégeons
              également vos informations hors ligne. Seuls les employés qui ont
              besoin d'effectuer un travail spécifique (par exemple, la
              facturation ou le service client) ont accès aux informations
              personnelles identifiables.
            </Text>
          </Box>
          <Box mb={{ base: 6, md: 8 }}>
            <Heading as="h2" size="lg" mb={4} fontFamily="Urbanist">
              Consentement
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }}>
              En utilisant notre site, vous consentez à notre politique de
              confidentialité.
            </Text>
          </Box>
        </Box>
      </main>
      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;
