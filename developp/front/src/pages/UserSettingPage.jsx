// src/pages/UserSettingPage.jsx

import React, { useState, useEffect } from "react";
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
  Avatar,
} from "@chakra-ui/react";
import { FaUser, FaRegFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import HeaderDashboard from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { getUserData, updateUserData } from "../api/usersApi";
import { uploadFile } from "../api/uploadApi";

function UserSettingPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    birthday: "",
    city_of_birth: "",
    time_of_birth: "",
    avatarUrl: "", // Ajouté pour stocker l'URL de l'avatar
  });
  const [avatarFile, setAvatarFile] = useState(null); // Ajouté pour gérer le fichier d'avatar

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const data = await getUserData(user.userId);
          setUserData(data);
        } catch (error) {
          toast({
            title: "Erreur",
            description: "Impossible de récupérer les données utilisateur.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };

    fetchUserData();
  }, [user, toast]);

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    if (avatarFile) {
      try {
        const formData = new FormData();
        formData.append("image", avatarFile);
        formData.append("id", user.userId); // Ajout de l'ID de l'utilisateur
        const response = await uploadFile(formData);
        setUserData({ ...userData, avatarUrl: response.avatarUrl });
        toast({
          title: "Avatar mis à jour.",
          description: "Votre avatar a été mis à jour avec succès.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour l'avatar.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserData(user.userId, userData);
      toast({
        title: "Informations mises à jour.",
        description: "Vos informations ont été mises à jour avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les informations.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <HeaderDashboard />

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
            to={`/profile/${user?.userId}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaUser} />
              <Text>Mon profil</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to={`/profile/${user?.userId}/drawingsstory`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaRegFileAlt} />
              <Text>Mes tirages</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to={`/profile/${user?.userId}/settings`}
            style={{ textDecoration: "none", color: "white" }}
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
            _hover={{ textDecoration: "none", color: "blue.400" }}
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
        {/* Début de la section ajoutée pour l'avatar */}
        <VStack mb="8" align="center">
          <Avatar size="xl" src={userData.avatarUrl} />
          <FormControl id="avatar" mt="4">
            <FormLabel>Mettre à jour l'avatar</FormLabel>
            <Input type="file" onChange={handleAvatarChange} />
            <Button
              mt="2"
              colorScheme="blue"
              onClick={handleAvatarUpload}
            >
              Télécharger
            </Button>
          </FormControl>
        </VStack>
        {/* Fin de la section ajoutée pour l'avatar */}
        <form onSubmit={handleSubmit}>
          <Stack spacing="4">
            <FormControl id="last-name" isRequired>
              <FormLabel>Nom</FormLabel>
              <Input
                placeholder="Votre nom"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="first-name" isRequired>
              <FormLabel>Prénom</FormLabel>
              <Input
                placeholder="Votre prénom"
                value={userData.surname}
                onChange={(e) =>
                  setUserData({ ...userData, surname: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Votre email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="birthdate" isRequired>
              <FormLabel>Date de naissance</FormLabel>
              <Input
                type="date"
                placeholder="Votre date de naissance"
                value={userData.birthday}
                onChange={(e) =>
                  setUserData({ ...userData, birthday: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="birthplace" isRequired>
              <FormLabel>Ville de naissance</FormLabel>
              <Input
                placeholder="Votre ville de naissance"
                value={userData.city_of_birth}
                onChange={(e) =>
                  setUserData({ ...userData, city_of_birth: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="birthtime" isRequired>
              <FormLabel>Heure de naissance</FormLabel>
              <Input
                type="time"
                placeholder="Votre heure de naissance"
                value={userData.time_of_birth}
                onChange={(e) =>
                  setUserData({ ...userData, time_of_birth: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Mot de passe</FormLabel>
              <Input type="password" placeholder="Votre mot de passe" />
            </FormControl>

            <FormControl id="confirm-password">
              <FormLabel>Confirmation du mot de passe</FormLabel>
              <Input
                type="password"
                placeholder="Confirmez votre mot de passe"
              />
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
