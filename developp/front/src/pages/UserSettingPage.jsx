// UserSettingPage.jsx :  fonctionnalités d'affichage et de modification des informations de l'utilisateur connecté.

import React from 'react';
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Stack,
  VStack,
  HStack,
  Icon,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { FaUser, FaRegFileAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Header from '../components/HeaderDashboard';
import Footer from '../components/Footer';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';

function UserSettingPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour gérer la soumission du formulaire
    toast({
      title: 'Informations mises à jour.',
      description: 'Vos informations ont été mises à jour avec succès.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige vers la page d'accueil après la déconnexion
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />

      <Flex
        as="nav"
        p="4"
        bg="customBlue"
        color="white"
        direction="column"
        height="calc(100vh - 60px)"
        width="250px"
        position="fixed"
        top="100px"
        left="0"
        boxShadow="md"
      >
        <VStack align="start" spacing="4" w="full">
          <RouterLink
            to="/profile"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <HStack>
              <Icon as={FaUser} />
              <Text>Mon profil</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to="/drawingsstory"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <HStack>
              <Icon as={FaRegFileAlt} />
              <Text>Mes tirages</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to="/settings"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <HStack>
              <Icon as={FaCog} />
              <Text>Paramètres</Text>
            </HStack>
          </RouterLink>

          <Spacer />

          <Button
            onClick={handleLogout}
            variant="link"
            color="white"
            _hover={{ textDecoration: 'none', color: 'blue.400' }}
          >
            <HStack>
              <Icon as={FaSignOutAlt} />
              <Text>Déconnexion</Text>
            </HStack>
          </Button>
        </VStack>
      </Flex>

      <Box ml="250px" p="8" flex="1">
        <Heading mb="4">Paramètres du Profil</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing="4">
            <FormControl id="last-name" isRequired>
              <FormLabel>Nom</FormLabel>
              <Input placeholder="Votre nom" />
            </FormControl>

            <FormControl id="first-name" isRequired>
              <FormLabel>Prénom</FormLabel>
              <Input placeholder="Votre prénom" />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Votre email" />
            </FormControl>

            <FormControl id="birthdate" isRequired>
              <FormLabel>Date de naissance</FormLabel>
              <Input type="date" placeholder="Votre date de naissance" />
            </FormControl>

            <FormControl id="birthplace" isRequired>
              <FormLabel>Ville de naissance</FormLabel>
              <Input placeholder="Votre ville de naissance" />
            </FormControl>

            <FormControl id="birthtime" isRequired>
              <FormLabel>Heure de naissance</FormLabel>
              <Input type="time" placeholder="Votre heure de naissance" />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Mot de passe</FormLabel>
              <Input type="password" placeholder="Votre mot de passe" />
            </FormControl>

            <FormControl id="confirm-password">
              <FormLabel>Confirmation du mot de passe</FormLabel>
              <Input type="password" placeholder="Confirmez votre mot de passe" />
            </FormControl>

            <Button
              type="submit"
              bg="#191970" // Bleu nuit
              color="white"
              _hover={{ bg: "#0f1a4c" }} // Couleur de survol
              width="200px" // Définir la largeur du bouton
              alignSelf="center" // Centrer le bouton horizontalement
            >
              Mettre à jour
            </Button>
          </Stack>
        </form>
      </Box>

      <Footer />
    </Box>
  );
}

export default UserSettingPage;

