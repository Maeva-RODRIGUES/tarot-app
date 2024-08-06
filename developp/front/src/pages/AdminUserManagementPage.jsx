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

  const handleUpdate = (userId) => {
    // Fonction de gestion de la mise à jour de l'utilisateur
    console.log("Mettre à jour l'utilisateur avec l'ID :", userId);
    // Implémentez ici la logique de mise à jour
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
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{roles[user.id_Roles]}</Td>
                <Td>
                  <HStack spacing="2">
                    <Link
                      color="blue.500"
                      onClick={() => handleUpdate(user.id)}
                    >
                      Mettre à jour
                    </Link>
                    <Link color="red.500" onClick={() => handleDelete(user.id)}>
                      Supprimer
                    </Link>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Footer />
    </Box>
  );
}

export default AdminUserManagementPage;

