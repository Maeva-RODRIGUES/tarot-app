// SignupPopup.jsx

import React, { useState } from "react";
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
  Text,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { usePopup } from "./context/PopupContext"; // Assurez-vous que le chemin est correct
import { createUser } from "../api/usersApi"; // Importez votre fonction createUser

function SignupPopup() {
  const { popupType, closePopup } = usePopup();
  const isOpen = popupType === "signup";

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [birthtime, setBirthtime] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const toast = useToast();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const userData = {
      name: lastName,
      surname: firstName,
      email,
      birthday: birthdate,
      city_of_birth: birthplace,
      time_of_birth: birthtime,
      password,
      role: 2, // Assurez-vous de passer le bon ID de rôle
    };

    console.log("Tentative de création d'un nouvel utilisateur avec les données :", userData);

    setError(""); // Réinitialiser les erreurs avant de tenter l'inscription
    try {
      const response = await createUser(userData);
      console.log("Réponse de l'API de création d'utilisateur :", response);
      closePopup(); // Ferme la popup après une inscription réussie
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Erreur lors de la tentative d'inscription :", err);
      setError("Erreur d'inscription. Veuillez vérifier vos informations.");
      toast({
        title: "Erreur d'inscription",
        description: "Il y a eu une erreur lors de la création de votre compte.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closePopup}>
      <ModalOverlay />
      <ModalContent maxWidth="600px">
        {/* Définit une largeur personnalisée */}
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
          <FormControl id="last-name" isRequired mb={4}>
            <FormLabel>Nom</FormLabel>
            <Input
              placeholder="Votre nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
          <FormControl id="first-name" isRequired mb={4}>
            <FormLabel>Prénom</FormLabel>
            <Input
              placeholder="Votre prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="birthdate" isRequired mb={4}>
            <FormLabel>Date de naissance</FormLabel>
            <Input
              type="date"
              placeholder="Votre date de naissance"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </FormControl>
          <FormControl id="birthplace" isRequired mb={4}>
            <FormLabel>Ville de naissance</FormLabel>
            <Input
              placeholder="Votre ville de naissance"
              value={birthplace}
              onChange={(e) => setBirthplace(e.target.value)}
            />
          </FormControl>
          <FormControl id="birthtime" isRequired mb={4}>
            <FormLabel>Heure de naissance</FormLabel>
            <Input
              type="time"
              placeholder="Votre heure de naissance"
              value={birthtime}
              onChange={(e) => setBirthtime(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired mb={4}>
            <FormLabel>Mot de passe</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Masquer" : "Afficher"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="confirm-password" isRequired mb={4}>
            <FormLabel>Confirmation du mot de passe</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? "Masquer" : "Afficher"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {error && (
            <Text color="red.500" mb={4}>
              {error}
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            bg="#191970" // Bleu nuit
            color="white" // Texte en blanc pour le contraste
            mr={3}
            onClick={handleSubmit}
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
