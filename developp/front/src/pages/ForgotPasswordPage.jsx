// src/pages/ForgotPasswordPage.jsx

import React, { useState } from "react";
import { Box, Input, Button, useToast } from "@chakra-ui/react";
import { useAuth } from "../components/context/AuthContext";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { requestPasswordReset } = useAuth();
  const toast = useToast();

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
    <Box>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" mt={4}>
          Réinitialiser le mot de passe
        </Button>
      </form>
    </Box>
  );
}

export default ForgotPasswordPage;
