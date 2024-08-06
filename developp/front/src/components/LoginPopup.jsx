// src/components/LoginPopup.jsx

import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Importez useNavigate
import { usePopup } from "./context/PopupContext"; // Assurez-vous que le chemin est correct
import { useAuth } from "./context/AuthContext"; // Assurez-vous que le chemin est correct

function LoginPopup() {
  const { popupType, closePopup } = usePopup();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate(); // Initialisez useNavigate

  // Affiche le popup uniquement si popupType est 'login'
  if (popupType !== "login") return null;

  const handleLogin = async () => {
    setError(""); // Réinitialise l'erreur avant de tenter la connexion
    try {
      const credentials = { email, password };
      console.log("Tentative de connexion avec les identifiants :", credentials);
      const response = await login(credentials);
      console.log("Réponse de l'API de connexion :", response);

      closePopup(); // Ferme la popup après une connexion réussie
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      if (response.role === "Admin") {
        navigate("/admin");
      } else {
        navigate(`/profile/${response.userId}`);
      }
    } catch (err) {
      console.error("Erreur lors de la tentative de connexion :", err);
      setError("Erreur de connexion. Veuillez vérifier vos identifiants.");
      toast({
        title: "Erreur de connexion",
        description: "Identifiants incorrects.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal isOpen={popupType === "login"} onClose={closePopup}>
      <ModalOverlay />
      <ModalContent maxWidth="600px">
        {/* Définit une largeur personnalisée */}
        <ModalHeader>
          <Box textAlign="center" w="100%">
            <Heading as="h2" size="lg">
              Connexion
            </Heading>
            <Text mt={2} fontSize="md">
              Veuillez vous connecter pour accéder à votre compte.
            </Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="login-email" isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="login-password" isRequired mb={4}>
            <FormLabel>Mot de passe</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowPasswordClick}>
                  {showPassword ? "Cacher" : "Voir"}
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
            onClick={handleLogin}
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
