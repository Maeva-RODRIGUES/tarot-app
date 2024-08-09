// SignupPopup.jsx

import React, { useState } from "react";
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
  Text,
} from "@chakra-ui/react";
import { usePopup } from "./context/PopupContext";

function SignupPopup() {
  const { popupType, closePopup } = usePopup();

  const isOpen = popupType === "signup";

  // État pour gérer l'affichage du message de confirmation
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSignup = () => {
    // Ajoutez ici votre logique d'inscription (envoi des données au serveur, etc.)
    setIsRegistered(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={closePopup}>
      <ModalOverlay />
      <ModalContent maxWidth="600px">
        <ModalHeader>
          <Box textAlign="center" w="100%">
            <Heading as="h2" size="lg">
              Inscription
            </Heading>
            <Text mt={2} fontSize="md">
              Créez votre compte pour accéder à toutes les fonctionnalités.
            </Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isRegistered ? (
            <Box textAlign="center">
              <Text fontSize="lg" color="green.500">
                Inscription réussie ! Vous pouvez maintenant vous connecter.
              </Text>
            </Box>
          ) : (
            <>
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
                <Input
                  type="password"
                  placeholder="Confirmez votre mot de passe"
                />
              </FormControl>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          {!isRegistered && (
            <Button
              bg="#191970" // Bleu nuit
              color="white" // Texte en blanc pour le contraste
              mr={3}
              onClick={handleSignup}
            >
              S'inscrire
            </Button>
          )}
          <Button
            variant="outline"
            borderColor="#191970" // Bordure du bouton en bleu nuit
            color="#191970" // Texte du bouton en bleu nuit
            onClick={closePopup}
          >
            {isRegistered ? "Fermer" : "Annuler"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SignupPopup;
