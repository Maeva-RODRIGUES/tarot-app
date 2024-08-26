/* eslint-disable no-restricted-globals */
// SettingsAdminPage.jsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Avatar,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { parse, format, isValid } from "date-fns";
import Header from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { getUserData, updateUser, createUser } from "../api/usersApi";
import { uploadAvatar } from "../api/uploadApi"; 
import SidebarNav from "../components/SidebarNav"; // Ajout MAJ

function SettingsAdminPage() {
  const toast = useToast(); // Pour afficher les notifications toast
  const navigate = useNavigate(); // Pour la navigation entre les pages
  const { user, logout } = useAuth(); // Récupération des infos d'authentification et de déconnexion

  const [adminData, setAdminData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    city_of_birth: "",
    time_of_birth: "",
    avatarUrl: "", // Champ pour l'URL de l'avatar
  });

  const [avatarFile, setAvatarFile] = useState(null); // État pour stocker le fichier d'avatar sélectionné

  const [newAdminData, setNewAdminData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    city_of_birth: "",
    time_of_birth: "",
    role_id: "", // Nouveau champ pour le rôle
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      if (user && user.userId) {
        try {
          const data = await getUserData(user.userId); // Récupère les données de l'utilisateur depuis l'API

          let formattedBirthday = "";
          if (data.birthday) {
            const parsedDate = parse(data.birthday, "yyyy-MM-dd", new Date());
            if (isValid(parsedDate)) {
              formattedBirthday = format(parsedDate, "yyyy-MM-dd");
            }
          }

          setAdminData({
            name: data.name || "",
            surname: data.surname || "",
            email: data.email || "",
            password: "",
            confirmPassword: "",
            birthday: formattedBirthday || "",
            city_of_birth: data.city_of_birth || "",
            time_of_birth: data.time_of_birth || "",
            avatarUrl: data.avatarUrl || "", // Met à jour l'état avec l'URL de l'avatar
          });
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données administrateur:",
            error,
          );
          toast({
            title: "Erreur",
            description: "Impossible de récupérer les données administrateur.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };
    fetchAdminData(); // Appelle la fonction pour récupérer les données administrateur
  }, [user, toast]);

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    if (avatarFile && user && user.userId) {
      try {
        const formData = new FormData();
        formData.append("avatar", avatarFile); // Utilise le champ "avatar" pour le fichier
        formData.append("userId", user.userId); // Utilise "userId" pour l'ID de l'utilisateur
        const response = await uploadAvatar(formData); // Utilise la fonction correcte pour l'avatar

        setAdminData({ ...adminData, avatarUrl: response.avatarUrl });

        toast({
          title: "Avatar mis à jour.",
          description: "Votre avatar a été mis à jour avec succès.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'avatar:", error);
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

  const handleAdminFormChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const cleanAndFormatData = (data) => {
    const cleanedData = { ...data };

    if (cleanedData.birthday && !isNaN(Date.parse(cleanedData.birthday))) {
      const parsedDate = parse(cleanedData.birthday, "yyyy-MM-dd", new Date());
      if (isValid(parsedDate)) {
        cleanedData.birthday = format(parsedDate, "yyyy-MM-dd");
      } else {
        delete cleanedData.birthday;
      }
    } else {
      delete cleanedData.birthday;
    }

    return cleanedData;
  };

  const validatePassword = (password) => {
    return password.length >= 8; // Vérifie que le mot de passe contient au moins 8 caractères
  };

  const handleAdminFormSubmit = async (e) => {
    e.preventDefault();

    if (adminData.password && !validatePassword(adminData.password)) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (
      adminData.password &&
      adminData.password !== adminData.confirmPassword
    ) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const cleanedData = cleanAndFormatData(adminData); // Nettoie et formate les données avant l'envoi
      const finalData = {};
      Object.keys(cleanedData).forEach((key) => {
        if (cleanedData[key]) {
          finalData[key] = cleanedData[key];
        }
      });

      if (!adminData.password) {
        delete finalData.password;
        delete finalData.confirmPassword;
      }

      await updateUser(user.userId, finalData); // Met à jour les données utilisateur via l'API

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les informations.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleNewAdminFormChange = (e) => {
    const { name, value } = e.target;
    setNewAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNewAdminSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(newAdminData.password)) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (newAdminData.password !== newAdminData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const adminRoleData = {
        ...newAdminData,
        role_id: 1, // Assurez-vous que "1" est bien l'ID du rôle "Admin"
      };

      await createUser(adminRoleData);
      toast({
        title: "Nouvel administrateur créé",
        description: "Le nouvel administrateur a été ajouté avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setNewAdminData({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthday: "",
        city_of_birth: "",
        time_of_birth: "",
        role_id: "",
      });
    } catch (error) {
      console.error(
        "Erreur lors de la création du nouvel administrateur:",
        error,
      );
      toast({
        title: "Erreur",
        description: "Impossible de créer un nouvel administrateur.",
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
      <Header />

      <SidebarNav /> {/* Ajout MAJ */}

      <Box ml={{ base: "0", md: "250px" }} p="8" pt="8" flex="1">
        <Heading mb="6">Paramètres administrateur</Heading>

        <VStack spacing="6" align="start">
          <VStack mb="8" align="center">
            <Avatar size="xl" src={adminData.avatarUrl} />
            <FormControl id="avatar" mt="4">
              <FormLabel>Mettre à jour l&#39;avatar</FormLabel>
              <Input type="file" onChange={handleAvatarChange} />
              <Button mt="2" colorScheme="blue" onClick={handleAvatarUpload}>
                Télécharger
              </Button>
            </FormControl>
          </VStack>

          <Box w="100%" borderWidth="1px" borderRadius="lg" p="6">
            <Heading size="md" mb="4">
              Mise à jour du profil
            </Heading>
            <form onSubmit={handleAdminFormSubmit}>
              <FormControl mb="4">
                <FormLabel>Nom</FormLabel>
                <Input
                  name="name"
                  value={adminData.name}
                  onChange={handleAdminFormChange}
                  placeholder="Nom"
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Prénom</FormLabel>
                <Input
                  name="surname"
                  value={adminData.surname}
                  onChange={handleAdminFormChange}
                  placeholder="Prénom"
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={adminData.email}
                  onChange={handleAdminFormChange}
                  placeholder="Email"
                  type="email"
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Date de Naissance</FormLabel>
                <Input
                  type="date"
                  placeholder="Votre date de naissance"
                  value={adminData.birthday}
                  onChange={(e) =>
                    setAdminData({ ...adminData, birthday: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mb="4">
                <FormLabel>Ville de Naissance</FormLabel>
                <Input
                  name="city_of_birth"
                  value={adminData.city_of_birth}
                  onChange={handleAdminFormChange}
                  placeholder="Ville de Naissance"
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Heure de Naissance</FormLabel>
                <Input
                  name="time_of_birth"
                  value={adminData.time_of_birth}
                  onChange={handleAdminFormChange}
                  placeholder="Heure de Naissance"
                  type="time"
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Mot de passe</FormLabel>
                <Input
                  name="password"
                  value={adminData.password}
                  onChange={handleAdminFormChange}
                  placeholder="Mot de passe"
                  type="password"
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Confirmation du mot de passe</FormLabel>
                <Input
                  name="confirmPassword"
                  value={adminData.confirmPassword}
                  onChange={handleAdminFormChange}
                  placeholder="Confirmation du mot de passe"
                  type="password"
                />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Mettre à jour
              </Button>
            </form>
          </Box>

          <Box w="100%" borderWidth="1px" borderRadius="lg" p="6">
            <Heading size="md" mb="4">
              Ajouter un nouvel administrateur
            </Heading>
            <form onSubmit={handleNewAdminSubmit}>
              <FormControl mb="4">
                <FormLabel>Nom</FormLabel>
                <Input
                  name="name"
                  value={newAdminData.name}
                  onChange={handleNewAdminFormChange}
                  placeholder="Nom"
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Prénom</FormLabel>
                <Input
                  name="surname"
                  value={newAdminData.surname}
                  onChange={handleNewAdminFormChange}
                  placeholder="Prénom"
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={newAdminData.email}
                  onChange={handleNewAdminFormChange}
                  placeholder="Email"
                  type="email"
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>ID Rôle</FormLabel>
                <Input
                  name="role_id"
                  value={newAdminData.role_id}
                  onChange={handleNewAdminFormChange}
                  placeholder="ID Rôle"
                  type="number"
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Date de Naissance</FormLabel>
                <Input
                  name="birthday"
                  value={newAdminData.birthday}
                  onChange={handleNewAdminFormChange}
                  placeholder="Date de Naissance"
                  type="date"
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Heure de Naissance</FormLabel>
                <Input
                  name="time_of_birth"
                  value={newAdminData.time_of_birth}
                  onChange={handleNewAdminFormChange}
                  placeholder="Heure de Naissance"
                  type="time"
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Ville de Naissance</FormLabel>
                <Input
                  name="city_of_birth"
                  value={newAdminData.city_of_birth}
                  onChange={handleNewAdminFormChange}
                  placeholder="Ville de Naissance"
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Mot de passe</FormLabel>
                <Input
                  name="password"
                  value={newAdminData.password}
                  onChange={handleNewAdminFormChange}
                  placeholder="Mot de passe"
                  type="password"
                  required
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Confirmation du mot de passe</FormLabel>
                <Input
                  name="confirmPassword"
                  value={newAdminData.confirmPassword}
                  onChange={handleNewAdminFormChange}
                  placeholder="Confirmation du mot de passe"
                  type="password"
                  required
                />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Ajouter
              </Button>
            </form>
          </Box>
        </VStack>
      </Box>

      <Footer />
    </Box>
  );
}

export default SettingsAdminPage;
