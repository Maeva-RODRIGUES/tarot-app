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
import { getUserData, updateUser } from "../api/usersApi";
import { uploadFile } from "../api/uploadApi";
import { parse, format, isValid } from "date-fns";

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
      if (user && user.userId) {
        try {
          console.log("Fetching user data for userId:", user.userId);
          const data = await getUserData(user.userId);
          // Si la date de naissance est présente, la formater correctement
          if (data.birthday) {
            const parsedDate = parse(data.birthday, "yyyy-MM-dd", new Date());
            if (isValid(parsedDate)) {
              data.birthday = format(parsedDate, "yyyy-MM-dd");
            } else {
              data.birthday = ""; // Ou toute autre valeur par défaut appropriée
            }
          }
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
    if (avatarFile && user && user.userId) {
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

  const cleanAndFormatData = (data) => {
    const cleanedData = { ...data };

    // Effacer le champ birthday s'il est vide ou invalide
    if (!cleanedData.birthday || isNaN(new Date(cleanedData.birthday).getTime())) {
      delete cleanedData.birthday;
    } else {
      // Si la date est valide, la formater au format ISO (yyyy-MM-dd)
      const parsedDate = parse(cleanedData.birthday, "yyyy-MM-dd", new Date());
      if (isValid(parsedDate)) {
        cleanedData.birthday = format(parsedDate, "yyyy-MM-dd");
      } else {
        delete cleanedData.birthday;
      }
    }

    return cleanedData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user && user.userId) {
      try {
        const cleanedData = cleanAndFormatData(userData);
        console.log("Tentative de mise à jour avec les données :", cleanedData);
        const response = await updateUser(user.userId, cleanedData);
        console.log("Réponse de l'API après mise à jour :", response);
        toast({
          title: "Informations mises à jour.",
          description: "Vos informations ont été mises à jour avec succès.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour les informations.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      console.error("Erreur: l'utilisateur ou l'ID utilisateur n'est pas défini.");
      toast({
        title: "Erreur",
        description: "L'utilisateur n'est pas connecté ou l'ID utilisateur est introuvable.",
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
        <VStack mb="8" align="center">
          <Avatar size="xl" src={userData.avatarUrl} />
          <FormControl id="avatar" mt="4">
            <FormLabel>Mettre à jour l'avatar</FormLabel>
            <Input type="file" onChange={handleAvatarChange} />
            <Button mt="2" colorScheme="blue" onClick={handleAvatarUpload}>
              Télécharger
            </Button>
          </FormControl>
        </VStack>
        <form onSubmit={handleSubmit}>
          <Stack spacing="4">
            <FormControl id="last-name">
              <FormLabel>Nom</FormLabel>
              <Input
                placeholder="Votre nom"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="first-name">
              <FormLabel>Prénom</FormLabel>
              <Input
                placeholder="Votre prénom"
                value={userData.surname}
                onChange={(e) =>
                  setUserData({ ...userData, surname: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="email">
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

            <FormControl id="birthdate">
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

            <FormControl id="birthplace">
              <FormLabel>Ville de naissance</FormLabel>
              <Input
                placeholder="Votre ville de naissance"
                value={userData.city_of_birth}
                onChange={(e) =>
                  setUserData({ ...userData, city_of_birth: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="birthtime">
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
              <Input
                type="password"
                placeholder="Votre mot de passe"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="confirm-password">
              <FormLabel>Confirmation du mot de passe</FormLabel>
              <Input
                type="password"
                placeholder="Confirmez votre mot de passe"
                onChange={(e) =>
                  setUserData({ ...userData, confirmPassword: e.target.value })
                }
              />
            </FormControl>

            <Button
              type="submit"
              bg="#191970"
              color="white"
              _hover={{ bg: "#0f1a4c" }}
              width="200px"
              alignSelf="center"
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
