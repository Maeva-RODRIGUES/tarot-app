// SettingsAdminPage.jsx

import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaRegFileAlt,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaFileAlt,
} from "react-icons/fa";

import {
  Box,
  Flex,
  Heading,
  VStack,
  HStack,
  Icon,
  Text,
  Button,
  Spacer,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Header from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { getUserData, updateUser, createUser } from "../api/usersApi";

function SettingsAdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [adminData, setAdminData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [newAdminData, setNewAdminData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user && user.userId) {
      const fetchAdminData = async () => {
        try {
          const data = await getUserData(user.userId);
          setAdminData({ ...data, password: "", confirmPassword: "" });
        } catch (error) {
          toast({
            title: "Erreur",
            description: "Impossible de récupérer les données administrateur.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };
      fetchAdminData();
    }
  }, [user, toast]);

  const handleAdminFormChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNewAdminFormChange = (e) => {
    const { name, value } = e.target;
    setNewAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdminFormSubmit = async (e) => {
    e.preventDefault();

    if (
      adminData.password &&
      adminData.password !== adminData.confirmPassword
    ) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await updateUser(user.userId, adminData);
      toast({
        title: "Profil mis à jour",
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

  const handleNewAdminSubmit = async (e) => {
    e.preventDefault();

    if (newAdminData.password !== newAdminData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await createUser(newAdminData); // Ajout de la création de l'admin
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
      });
    } catch (error) {
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
            to="/admin/users"
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaUsers} />
              <Text>Gestion des utilisateurs</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to="/admin/content"
            style={{ textDecoration: "none", color: "white" }}
          >
            <HStack>
              <Icon as={FaFileAlt} />
              <Text>Gestion du contenu</Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to="/admin/settings"
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

      <Box ml="250px" p="8" pt="8" flex="1">
        <Heading mb="6">Paramètres administrateur</Heading>

        <VStack spacing="6" align="start">
          {/* Formulaire de mise à jour du profil admin */}
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

          {/* Formulaire pour ajouter un nouveau compte admin */}
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
