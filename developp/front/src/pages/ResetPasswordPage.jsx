// src/pages/ResetPasswordPage.jsx

import React, { useState } from "react";
import { Box, Input, Button, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const { resetUserPassword } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetUserPassword(token, newPassword);
      toast({
        title: "Mot de passe réinitialisé",
        description: response.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la réinitialisation du mot de passe",
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
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Button type="submit" mt={4}>
          Réinitialiser le mot de passe
        </Button>
      </form>
    </Box>
  );
}

export default ResetPasswordPage;
