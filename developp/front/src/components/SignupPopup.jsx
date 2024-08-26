// SignupPopup.jsx

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
import { usePopup } from "./context/PopupContext";
import { createUser } from "../api/usersApi";

function SignupPopup() {
  const { popupType, closePopup } = usePopup(); // Gestion du type de popup et fermeture
  // Détermine si la popup d'inscription est ouverte
  const isOpen = popupType === "signup";

    // État pour gérer l'affichage du toast
    const toast = useToast();

  // -------------------------------------------------------------------
  // État pour chaque champ de formulaire : utilisé pour capturer les saisies utilisateur
  // -------------------------------------------------------------------
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [cityOfBirth, setCityOfBirth] = useState("");
  const [timeOfBirth, setTimeOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // -------------------------------------------------------------------
  // État pour gérer l'affichage du message de confirmation d'inscription
  // -------------------------------------------------------------------
  const [isRegistered, setIsRegistered] = useState(false);

  // -------------------------------------------------------------------
  // État pour contrôler l'affichage du mot de passe
  // -------------------------------------------------------------------
  const [showPassword, setShowPassword] = useState(false);

  // Fonction pour basculer l'affichage du mot de passe
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // -------------------------------------------------------------------
  // Fonction pour gérer la soumission du formulaire d'inscription
  // Cette fonction est appelée lorsque l'utilisateur clique sur "S'inscrire"
  // -------------------------------------------------------------------
  const handleSignup = async () => {
    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }


    // Créer un objet contenant les données utilisateur à envoyer
    const userData = {
      name, // Nom de l'utilisateur
      surname, // Prénom de l'utilisateur
      email, // Email de l'utilisateur
      birthday, // Date de naissance de l'utilisateur
      city_of_birth: cityOfBirth, // Ville de naissance de l'utilisateur
      time_of_birth: timeOfBirth, // Heure de naissance de l'utilisateur
      password, // Mot de passe de l'utilisateur
      id_Roles: 2, // Assigner automatiquement le rôle d'utilisateur (ID 2)
    };

    try {
      await createUser(userData);
      setIsRegistered(true);
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast({
        title: "Erreur lors de l'inscription",
        description: "Une erreur est survenue lors de la création de votre compte.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closePopup}>
      <ModalOverlay />
      <ModalContent maxWidth={{ base: "90%", md: "600px" }}>
        {" "}
        {/* Largeur responsive de la modal */}
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
            // Afficher un message de succès si l'inscription a été effectuée
            <Box textAlign="center">
              <Text fontSize="lg" color="green.500">
                Inscription réussie ! Vous pouvez maintenant vous connecter.
              </Text>
            </Box>
          ) : (
            // Formulaire d'inscription
            <>
              <FormControl id="last-name" isRequired mb={4}>
                <FormLabel>Nom</FormLabel>
                <Input
                  placeholder="Votre nom"
                  value={surname} // Lier l'état à la valeur du champ
                  onChange={(e) => setSurname(e.target.value)} // Mettre à jour l'état lors de la saisie
                />
              </FormControl>
              <FormControl id="first-name" isRequired mb={4}>
                <FormLabel>Prénom</FormLabel>
                <Input
                  placeholder="Votre prénom"
                  value={name} // Lier l'état à la valeur du champ
                  onChange={(e) => setName(e.target.value)} // Mettre à jour l'état lors de la saisie
                />
              </FormControl>
              <FormControl id="email" isRequired mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Votre email"
                  value={email} // Lier l'état à la valeur du champ
                  onChange={(e) => setEmail(e.target.value)} // Mettre à jour l'état lors de la saisie
                />
              </FormControl>
              <FormControl id="birthdate" isRequired mb={4}>
                <FormLabel>Date de naissance</FormLabel>
                <Input
                  type="date"
                  placeholder="Votre date de naissance"
                  value={birthday} // Lier l'état à la valeur du champ
                  onChange={(e) => setBirthday(e.target.value)} // Mettre à jour l'état lors de la saisie
                />
              </FormControl>
              <FormControl id="birthplace" isRequired mb={4}>
                <FormLabel>Ville de naissance</FormLabel>
                <Input
                  placeholder="Votre ville de naissance"
                  value={cityOfBirth} // Lier l'état à la valeur du champ
                  onChange={(e) => setCityOfBirth(e.target.value)} // Mettre à jour l'état lors de la saisie
                />
              </FormControl>
              <FormControl id="birthtime" isRequired mb={4}>
                <FormLabel>Heure de naissance</FormLabel>
                <Input
                  type="time"
                  placeholder="Votre heure de naissance"
                  value={timeOfBirth} // Lier l'état à la valeur du champ
                  onChange={(e) => setTimeOfBirth(e.target.value)} // Mettre à jour l'état lors de la saisie
                />
              </FormControl>

              {/* Champ Mot de passe avec bouton pour afficher/masquer */}
              <FormControl id="password" isRequired mb={4}>
                <FormLabel>Mot de passe</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"} // Afficher ou masquer le mot de passe
                    placeholder="Votre mot de passe"
                    value={password} // Lier l'état à la valeur du champ
                    onChange={(e) => setPassword(e.target.value)} // Mettre à jour l'état lors de la saisie
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                      {showPassword ? "Cacher" : "Afficher"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Champ Confirmation du mot de passe avec bouton pour afficher/masquer */}
              <FormControl id="confirm-password" isRequired mb={4}>
                <FormLabel>Confirmation du mot de passe</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"} // Afficher ou masquer le mot de passe
                    placeholder="Confirmez votre mot de passe"
                    value={confirmPassword} // Lier l'état à la valeur du champ
                    onChange={(e) => setConfirmPassword(e.target.value)} // Mettre à jour l'état lors de la saisie
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                      {showPassword ? "Cacher" : "Afficher"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {!isRegistered && (
            // Bouton pour soumettre le formulaire d'inscription
            <Button
              bg="#191970" // Couleur de fond
              color="white" // Couleur du texte
              mr={3}
              onClick={handleSignup} // Appel de la fonction de soumission
            >
              S'inscrire
            </Button>
          )}
          <Button
            variant="outline"
            borderColor="#191970" // Couleur de la bordure
            color="#191970" // Couleur du texte
            onClick={closePopup} // Fermer la popup
          >
            {isRegistered ? "Fermer" : "Annuler"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SignupPopup;
