// SignupPopup.jsx

import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
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

function SignupPopup() {
  const { popupType, closePopup } = usePopup();

  const isOpen = popupType === "signup";

  return (
    <Modal isOpen={isOpen} onClose={closePopup}>
      <ModalOverlay />
      <ModalContent maxWidth="600px"> {/* Définit une largeur personnalisée */}
        <ModalHeader>
          <Box textAlign="center" w="100%">
            <Heading as="h2" size="lg">Inscription</Heading>
            <Text mt={2} fontSize="md">
              Créez votre compte pour accéder à toutes les fonctionnalités.
            </Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
          <FormControl id="birthdate" isRequired mb={4}>
            <FormLabel>Date de naissance</FormLabel>
            <Input type="date" placeholder="Votre date de naissance" />
          </FormControl>
          <FormControl id="birthplace" isRequired mb={4}>
            <FormLabel>Ville de naissance</FormLabel>
            <Input placeholder="Votre ville de naissance" />
          </FormControl>
          <FormControl id="birthtime" isRequired mb={4}>
            <FormLabel>Heure de naissance</FormLabel>
            <Input type="time" placeholder="Votre heure de naissance" />
          </FormControl>
          <FormControl id="password" isRequired mb={4}>
            <FormLabel>Mot de passe</FormLabel>
            <Input type="password" placeholder="Votre mot de passe" />
          </FormControl>
          <FormControl id="confirm-password" isRequired mb={4}>
            <FormLabel>Confirmation du mot de passe</FormLabel>
            <Input type="password" placeholder="Confirmez votre mot de passe" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="#191970" // Bleu nuit
            color="white" // Texte en blanc pour le contraste
            mr={3}
            onClick={closePopup}
          >
            S'inscrire
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

export default SignupPopup;


