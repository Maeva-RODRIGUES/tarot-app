/* eslint-disable no-console */
// LoginPopup.jsx

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
import { useNavigate } from "react-router-dom";
import { usePopup } from "./context/PopupContext";
import { useAuth } from "./context/AuthContext";

function LoginPopup() {
  const { popupType, closePopup } = usePopup(); // Gestion du type de popup et fermeture
  const { login } = useAuth(); // Fonction de connexion
  const [email, setEmail] = useState(""); // État pour l'email
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [showPassword, setShowPassword] = useState(false); // État pour afficher ou non le mot de passe
  const [error, setError] = useState(""); // État pour les erreurs
  const toast = useToast(); // Hook pour afficher des notifications
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  if (popupType !== "login") return null; // Si le type de popup n'est pas "login", ne rien afficher

  const handleLogin = async () => {
    setError(""); // Réinitialiser les erreurs
    try {
      const credentials = { email, password }; // Récupération des credentials
      const response = await login(credentials); // Appel à la fonction de connexion

      closePopup(); // Ferme la popup après une connexion réussie
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Récupérer le thème sélectionné, le cas échéant
      const selectedTheme = localStorage.getItem("selectedTheme");

      // Redirection en fonction du rôle utilisateur
      console.log("Rôle de l'utilisateur :", response.role.role_name);
      if (response.role.role_name === "Admin") {
        console.log("Redirection vers le tableau de bord Admin");
        navigate("/admin");
      } else if (selectedTheme) {
        console.log("Redirection vers la page de tirage du thème sélectionné");
        localStorage.removeItem("selectedTheme");
        navigate(`/tarot-draw/${selectedTheme}`);
      } else {
        console.log("Redirection vers le tableau de bord utilisateur");
        navigate(`/profile/${response.userId}`);
      }
    } catch (err) {
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
    setShowPassword(!showPassword); // Inverser l'état de visibilité du mot de passe
  };

  return (
    <Modal isOpen={popupType === "login"} onClose={closePopup}>
      <ModalOverlay />
      <ModalContent maxWidth={{ base: "90%", md: "600px" }}>
        {" "}
        {/* Largeur responsive du contenu de la modal */}
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
              {error} {/* Affichage de l'erreur si elle existe */}
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
