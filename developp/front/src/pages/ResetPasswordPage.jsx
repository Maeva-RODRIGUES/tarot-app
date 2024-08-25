/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
// eslint-disable-next-line prettier/prettier
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
    <Box
      maxW={{ base: "90%", md: "400px" }} // Largeur maximale : 90% pour mobile, 400px pour écrans moyens et plus
      mx="auto" // Centre la boîte horizontalement
      mt={{ base: "20px", md: "40px" }} // Marge en haut : 20px pour mobile, 40px pour écrans moyens et plus
      p={{ base: "4", md: "6" }} // Padding interne : 4 pour mobile, 6 pour écrans moyens et plus
      borderWidth="1px" // Bordure fine pour délimiter la zone du formulaire
      borderRadius="lg" // Bords arrondis
      boxShadow="md" // Ombre légère pour donner du relief
    >
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          mb={4} // Marge inférieure pour espacer les éléments
          size="lg" // Taille du champ d'entrée légèrement plus grande pour une meilleure lisibilité
        />
        <Button
          type="submit"
          colorScheme="blue"
          width="full" // Largeur complète du bouton
          size="lg" // Taille du bouton plus grande pour correspondre à l'entrée
        >
          Réinitialiser le mot de passe
        </Button>
      </form>
    </Box>
  );
}

export default ResetPasswordPage;
