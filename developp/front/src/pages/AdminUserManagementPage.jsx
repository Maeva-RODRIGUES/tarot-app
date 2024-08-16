/* eslint-disable jsx-a11y/anchor-is-valid */
// src/pages/AdminUserManagementPage.jsx

import React, { useEffect, useState } from "react";
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  useToast,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  FaUser,
  FaRegFileAlt,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaFileAlt,
} from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { parse, format, isValid } from "date-fns";
import Header from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { fetchUsers, updateUser, deleteUser } from "../api/usersApi";
import { fetchRoles } from "../api/rolesApi";

function AdminUserManagementPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState({});
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    city_of_birth: "",
    time_of_birth: "",
  });

  // Chargement initial des données des utilisateurs et des rôles
  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchUsers();
        const rolesData = await fetchRoles();
        const rolesMap = rolesData.reduce((acc, role) => {
          acc[role.id] = role.role_name;
          return acc;
        }, {});

        setUsers(usersData);
        setRoles(rolesMap);
      } catch (error) {
        toast({
          title: "Erreur",
          description:
            "Erreur lors de la récupération des utilisateurs ou des rôles",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    loadData();
  }, [toast]);

  // Gestion de la déconnexion
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige vers la page d'accueil après la déconnexion
  };

  // Gestion de la mise à jour d'un utilisateur
  const handleUpdate = (user) => {
    setEditingUserId(user.id);

    let formattedBirthday = "";
    if (user.birthday) {
      let parsedDate;

      // Essayer de parser la date au format ISO (yyyy-MM-dd)
      if (isValid(parse(user.birthday, "yyyy-MM-dd", new Date()))) {
        parsedDate = parse(user.birthday, "yyyy-MM-dd", new Date());
      }
      // Si le premier parsing échoue, essayer le format dd/MM/yyyy
      else if (isValid(parse(user.birthday, "dd/MM/yyyy", new Date()))) {
        parsedDate = parse(user.birthday, "dd/MM/yyyy", new Date());
      }

      // Si la date est valide, formater au format yyyy-MM-dd
      if (parsedDate && isValid(parsedDate)) {
        formattedBirthday = format(parsedDate, "yyyy-MM-dd");
      } else {
        // Vous pouvez décider de ne pas inclure de date ou de définir une valeur par défaut ici
        formattedBirthday = ""; // Ou toute autre valeur par défaut acceptable
      }
    }

    setEditFormData({
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: "",
      confirmPassword: "",
      birthday: formattedBirthday,
      city_of_birth: user.city_of_birth,
      time_of_birth: user.time_of_birth,
    });
  };

  // Annuler la mise à jour
  const handleCancelUpdate = () => {
    setEditingUserId(null);
    setEditFormData({
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: "",
      city_of_birth: "",
      time_of_birth: "",
    });
  };

  // Gestion des modifications du formulaire
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fonction pour nettoyer et formater les données avant l'envoi
  const cleanAndFormatData = (data) => {
    const cleanedData = { ...data };

    // Effacer les champs de mot de passe s'ils sont vides
    if (!cleanedData.password) {
      delete cleanedData.password;
      delete cleanedData.confirmPassword;
    }

    // Effacer le champ birthday s'il est vide
    if (!cleanedData.birthday) {
      delete cleanedData.birthday;
    }

    // Convertir la date au format yyyy-MM-dd
    if (cleanedData.birthday) {
      const parsedDate = parse(cleanedData.birthday, "yyyy-MM-dd", new Date());
      if (isValid(parsedDate)) {
        cleanedData.birthday = format(parsedDate, "yyyy-MM-dd");
      } else {
        console.error("Date de naissance invalide:", cleanedData.birthday);
        cleanedData.birthday = "";
      }
    }

    return cleanedData;
  };

  // Soumission du formulaire de mise à jour
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      editFormData.password &&
      editFormData.password !== editFormData.confirmPassword
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

    const updatedData = cleanAndFormatData(editFormData);

    console.log("Données mises à jour à envoyer:", updatedData);

    try {
      await updateUser(editingUserId, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId ? { ...user, ...updatedData } : user,
        ),
      );
      toast({
        title: "Utilisateur mis à jour",
        description:
          "Les informations de l'utilisateur ont été mises à jour avec succès",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      handleCancelUpdate();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);

      if (error.response && error.response.data) {
        // Affiche un message d'erreur spécifique s'il est disponible
        toast({
          title: "Erreur",
          description: `Erreur lors de la mise à jour de l'utilisateur: ${error.response.data.message || error.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Erreur",
          description: "Erreur lors de la mise à jour de l'utilisateur",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  // Gestion de la suppression d'un utilisateur
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé avec succès",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de l'utilisateur",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
        <Heading mb="12">Gestion des utilisateurs</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nom</Th>
              <Th>Email</Th>
              <Th>Rôle</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <Tr>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{roles[user.id_Roles]}</Td>
                  <Td>
                    <HStack spacing="2">
                      <Link color="blue.500" onClick={() => handleUpdate(user)}>
                        Mettre à jour
                      </Link>
                      <Link
                        color="red.500"
                        onClick={() => handleDelete(user.id)}
                      >
                        Supprimer
                      </Link>
                    </HStack>
                  </Td>
                </Tr>
                {editingUserId === user.id && (
                  <Tr>
                    <Td colSpan="5">
                      <form onSubmit={handleFormSubmit}>
                        <VStack spacing="4" align="start">
                          <FormControl id="name">
                            <FormLabel>Nom</FormLabel>
                            <Input
                              name="name"
                              value={editFormData.name}
                              onChange={handleFormChange}
                            />
                          </FormControl>
                          <FormControl id="surname">
                            <FormLabel>Prénom</FormLabel>
                            <Input
                              name="surname"
                              value={editFormData.surname}
                              onChange={handleFormChange}
                            />
                          </FormControl>
                          <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input
                              name="email"
                              type="email"
                              value={editFormData.email}
                              onChange={handleFormChange}
                            />
                          </FormControl>
                          <FormControl id="password">
                            <FormLabel>Mot de passe</FormLabel>
                            <Input
                              name="password"
                              type="password"
                              value={editFormData.password}
                              onChange={handleFormChange}
                            />
                          </FormControl>
                          <FormControl id="confirmPassword">
                            <FormLabel>Confirmation du mot de passe</FormLabel>
                            <Input
                              name="confirmPassword"
                              type="password"
                              value={editFormData.confirmPassword}
                              onChange={handleFormChange}
                            />
                          </FormControl>
                          <FormControl id="birthday">
                            <FormLabel>Date de naissance</FormLabel>
                            <Input
                              name="birthday"
                              type="date"
                              value={editFormData.birthday}
                              onChange={handleFormChange}
                            />
                          </FormControl>
                          <FormControl id="city_of_birth">
                            <FormLabel>Ville de naissance</FormLabel>
                            <Input
                              name="city_of_birth"
                              value={editFormData.city_of_birth}
                              onChange={handleFormChange}
                            />
                          </FormControl>
                          <FormControl id="time_of_birth">
                            <FormLabel>Heure de naissance</FormLabel>
                            <Input
                              name="time_of_birth"
                              type="time"
                              value={editFormData.time_of_birth}
                              onChange={handleFormChange}
                            />
                          </FormControl>
                          <HStack spacing="4">
                            <Button type="submit" colorScheme="blue">
                              Sauvegarder
                            </Button>
                            <Button
                              variant="outline"
                              onClick={handleCancelUpdate}
                            >
                              Annuler
                            </Button>
                          </HStack>
                        </VStack>
                      </form>
                    </Td>
                  </Tr>
                )}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Footer />
    </Box>
  );
}

export default AdminUserManagementPage;
