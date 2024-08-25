// src/pages/ForgotPasswordPage.jsx

import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  useToast,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../components/context/AuthContext";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { requestPasswordReset } = useAuth();
  const toast = useToast();

  // Gestion de la soumission du formulaire de réinitialisation du mot de passe
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset(email);
      toast({
        title: "Email envoyé",
        description: response.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'envoi de l'email de réinitialisation",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      p={4}
    >
      <VStack
        as="form"
        onSubmit={handleSubmit}
        spacing={4}
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        maxWidth="400px"
        w="full"
      >
        <Heading as="h1" size="lg" textAlign="center">
          Réinitialiser le mot de passe
        </Heading>
        <Text textAlign="center" color="gray.600">
          Entrez votre adresse email pour recevoir un lien de réinitialisation
          du mot de passe.
        </Text>
        <Input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email"
          autoComplete="email"
        />
        <Button type="submit" colorScheme="blue" w="full">
          Réinitialiser le mot de passe
        </Button>
      </VStack>
    </Box>
  );
}

export default ForgotPasswordPage;
