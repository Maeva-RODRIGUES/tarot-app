// LoginPopup.jsx

import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Heading,
  Text
} from "@chakra-ui/react";
import { usePopup } from "./context/PopupContext"; // Assure-toi que le chemin est correct

function LoginPopup() {
  const { popupType, closePopup } = usePopup();

  if (popupType !== 'login') return null; // Affiche le popup uniquement si popupType est 'login'

  return (
    <Modal isOpen={popupType === 'login'} onClose={closePopup}>
      <ModalOverlay />
      <ModalContent maxWidth="600px"> {/* Définit une largeur personnalisée */}
        <ModalHeader>
          <Box textAlign="center" w="100%">
            <Heading as="h2" size="lg">Connexion</Heading>
            <Text mt={2} fontSize="md">
              Veuillez vous connecter pour accéder à votre compte.
            </Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="login-email" isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Votre email" />
          </FormControl>
          <FormControl id="login-password" isRequired mb={4}>
            <FormLabel>Mot de passe</FormLabel>
            <Input type="password" placeholder="Votre mot de passe" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="#191970" // Bleu nuit
            color="white" // Texte en blanc pour le contraste
            mr={3}
            onClick={closePopup}
          >
            Se connecter
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

export default LoginPopup;


