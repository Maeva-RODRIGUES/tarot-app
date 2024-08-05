// src/components/LoginPopup.jsx

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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { usePopup } from "./context/PopupContext";
import { useAuth } from "./context/AuthContext";

function LoginPopup() {
  const { popupType, closePopup } = usePopup();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Affiche le popup uniquement si popupType est 'login'
  if (popupType !== "login") return null;

  const handleLogin = async () => {
    setError(""); // Réinitialise l'erreur avant de tenter la connexion
    try {
      console.log("Tentative de connexion avec l'email :", email);
      const { token, userId, role } = await login({ email, password });
      console.log(
        "Connexion réussie avec l'utilisateur ID :",
        userId,
        "et rôle :",
        role,
      );
      closePopup(); // Ferme la popup après une connexion réussie
      if (role.toLowerCase() === "admin") {
        console.log("Redirection vers l'espace admin");
        navigate("/admin"); // Redirige vers l'espace admin
      } else {
        console.log("Redirection vers l'espace utilisateur");
        navigate(`/profile/${userId}`); // Redirige vers l'espace utilisateur
      }
    } catch (err) {
      console.error("Erreur lors de la tentative de connexion :", err);
      setError("Erreur de connexion. Veuillez vérifier vos identifiants.");
    }
  };

  return (
    <Modal isOpen={popupType === "login"} onClose={closePopup}>
      <ModalOverlay />
      <ModalContent maxWidth="600px">
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
            <Input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {error && (
            <Text color="red.500" mb={4}>
              {error}
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button bg="#191970" color="white" mr={3} onClick={handleLogin}>
            Se connecter
          </Button>
          <Button
            variant="outline"
            borderColor="#191970"
            color="#191970"
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
