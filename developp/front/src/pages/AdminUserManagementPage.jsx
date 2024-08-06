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
import { Link as RouterLink } from "react-router-dom";
import Header from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { fetchUsers, updateUser, deleteUser } from "../api/usersApi";
import { fetchRoles } from "../api/rolesApi";

function AdminUserManagementPage() {
  const { logout } = useAuth();
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
          description: "Erreur lors de la récupération des utilisateurs ou des rôles",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    loadData();
  }, [toast]);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige vers la page d'accueil après la déconnexion
  };

  const handleUpdate = (user) => {
    setEditingUserId(user.id);

    // Conversion de la date en format yyyy-MM-dd pour le champ de saisie
    const parts = user.birthday.split('/');
    const formattedBirthday = `${parts[2]}-${parts[1]}-${parts[0]}`;

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editFormData.password && editFormData.password !== editFormData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const updatedData = { ...editFormData };

    // Remove password fields if they are empty
    if (!updatedData.password) {
      delete updatedData.password;
      delete updatedData.confirmPassword;
    }

    // Convert the date format from yyyy-MM-dd to dd/MM/yyyy HH:mm:ss before sending to the server
    const [year, month, day] = updatedData.birthday.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    updatedData.birthday = `${day}/${month}/${year} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    console.log("Données mises à jour à envoyer:", updatedData);

    try {
      await updateUser(editingUserId, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId ? { ...user, ...updatedData } : user
        )
      );
      toast({
        title: "Utilisateur mis à jour",
        description: "Les informations de l'utilisateur ont été mises à jour avec succès",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      handleCancelUpdate();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de l'utilisateur",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
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
            to="/settings"
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
                      <Link
                        color="blue.500"
                        onClick={() => handleUpdate(user)}
                      >
                        Mettre à jour
                      </Link>
                      <Link color="red.500" onClick={() => handleDelete(user.id)}>
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




