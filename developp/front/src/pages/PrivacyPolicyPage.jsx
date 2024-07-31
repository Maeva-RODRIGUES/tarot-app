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
        <Box maxW="1200px" mx="auto" p={8} pt={32}>
          {" "}
          {/* Augmentation du padding-top */}
          <Heading as="h1" size="xl" mb={8}>
            Politique de Confidentialité
          </Heading>
          <Box mb={8}>
            <Heading as="h2" size="lg" mb={4}>
              Collecte des informations
            </Heading>
            <Text>
              Nous collectons des informations lorsque vous vous inscrivez sur
              notre site, vous connectez à votre compte, faites un achat,
              participez à un concours, et/ou lorsque vous vous déconnectez. Les
              informations collectées incluent votre nom, adresse e-mail, numéro
              de téléphone et/ou carte de crédit.
            </Text>
          </Box>
          <Box mb={8}>
            <Heading as="h2" size="lg" mb={4}>
              Utilisation des informations
            </Heading>
            <Text>
              Toutes les informations que nous recueillons auprès de vous
              peuvent être utilisées pour :
            </Text>
            <ul>
              <li>
                Personnaliser votre expérience et répondre à vos besoins
                individuels
              </li>
              <li>Fournir un contenu publicitaire personnalisé</li>
              <li>Améliorer notre site web</li>
              <li>
                Améliorer le service client et vos besoins de prise en charge
              </li>
              <li>Vous contacter par e-mail</li>
              <li>Administrer un concours, une promotion ou une enquête</li>
            </ul>
          </Box>
          <Box mb={8}>
            <Heading as="h2" size="lg" mb={4}>
              Confidentialité des informations
            </Heading>
            <Text>
              Nous sommes les seuls propriétaires des informations recueillies
              sur ce site. Vos informations personnelles ne seront pas vendues,
              échangées, transférées, ou données à une autre société pour
              n'importe quelle raison, sans votre consentement, en dehors de ce
              qui est nécessaire pour répondre à une demande et/ou transaction,
              comme par exemple pour expédier une commande.
            </Text>
          </Box>
          <Box mb={8}>
            <Heading as="h2" size="lg" mb={4}>
              Divulgation à des tiers
            </Heading>
            <Text>
              Nous ne vendons, n'échangeons et ne transférons pas vos
              informations personnelles identifiables à des tiers. Cela ne
              comprend pas les tierce parties de confiance qui nous aident à
              exploiter notre site Web ou à mener nos affaires, tant que ces
              parties conviennent de garder ces informations confidentielles.
            </Text>
          </Box>
          <Box mb={8}>
            <Heading as="h2" size="lg" mb={4}>
              Protection des informations
            </Heading>
            <Text>
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
          <Box mb={8}>
            <Heading as="h2" size="lg" mb={4}>
              Consentement
            </Heading>
            <Text>
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
