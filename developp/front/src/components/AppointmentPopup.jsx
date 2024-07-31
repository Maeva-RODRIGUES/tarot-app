//AppointmentPopup.jsx

import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Image,
  Heading,
  Text
} from "@chakra-ui/react";
import { usePopup } from "./context/PopupContext.jsx"; // Assure-toi que le chemin est correct

function AppointmentPopup() {
  const { popupType, closePopup } = usePopup();

  if (popupType !== 'contact') return null; // Affiche le popup uniquement si popupType est 'contact'

  return (
    <Modal isOpen={popupType === 'contact'} onClose={closePopup}>
      <ModalOverlay />
      <ModalContent maxWidth="1200px"> {/* Définit une largeur personnalisée */}
        <ModalHeader>
          <Box textAlign="center" w="100%">
            <Heading as="h2" size="lg" p={3}>Contactez-nous</Heading>
            <Text mt={2} fontSize="md">
              Vous souhaitez prendre une consultation avec notre cartomancienne ? Prenez RDV !
            </Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            {/* Image à gauche */}
            <Box flex="1" p={4}>
              <Image
                src="/src/assets/img/rdvpopup.png" // Remplace par le chemin vers ton image
                alt="Intuition"
                boxSize="100%" // Ajuste la taille de l'image comme nécessaire
                objectFit="cover"
              />
            </Box>

            {/* Formulaire à droite */}
            <Box flex="2" p={4}>
              <FormControl id="last-name" isRequired mb={4}>
                <FormLabel>Nom</FormLabel>
                <Input placeholder="Votre nom" />
              </FormControl>
              <FormControl id="first-name" isRequired mb={4}>
                <FormLabel>Prénom</FormLabel>
                <Input placeholder="Votre prénom" />
              </FormControl>
              <FormControl id="email" isRequired mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Votre email" />
              </FormControl>
              <FormControl id="phone" isRequired mb={4}>
                <FormLabel>Téléphone</FormLabel>
                <Input placeholder="Votre téléphone" />
              </FormControl>
              <FormControl id="message" mb={4}>
                <FormLabel>Message</FormLabel>
                <Textarea placeholder="Votre message" />
              </FormControl>
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="#191970" // Bleu nuit
            color="white" // Texte en blanc pour le contraste
            mr={3}
            onClick={closePopup}
          >
            Envoyer
          </Button>
          <Button
            variant="outline"
            borderColor="#191970" // Bordure du bouton en bleu nuit
            color="#191970" // Texte du bouton en bleu nuit
            onClick={closePopup}
          >
            Annuler
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AppointmentPopup;
