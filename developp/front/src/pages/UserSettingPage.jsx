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
  Textarea,
} from "@chakra-ui/react";
import { FaUser, FaRegFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { parse, format, isValid } from "date-fns";
import HeaderDashboard from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { getUserData, updateUser } from "../api/usersApi";
import { uploadFile } from "../api/uploadApi";
import {
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../api/reviewsApi"; // Importation des fonctions pour les commentaires

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
    avatarUrl: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.userId) {
        try {
          const data = await getUserData(user.userId);
          if (data.birthday) {
            const parsedDate = parse(data.birthday, "yyyy-MM-dd", new Date());
            if (isValid(parsedDate)) {
              data.birthday = format(parsedDate, "yyyy-MM-dd");
            } else {
              data.birthday = "";
            }
          }
          setUserData(data);

          // Récupérer les commentaires de l'utilisateur
          const userReviews = await fetchReviews(user.userId);
          setReviews(userReviews);
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
        formData.append("id", user.userId);
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

    if (
      !cleanedData.birthday ||
      isNaN(new Date(cleanedData.birthday).getTime())
    ) {
      delete cleanedData.birthday;
    } else {
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
        await updateUser(user.userId, cleanedData);
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
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await updateReview(editingReview.id, newReview);
        toast({
          title: "Commentaire mis à jour",
          description: "Votre commentaire a été mis à jour avec succès.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await createReview(user.userId, { ...newReview, date: new Date() });
        toast({
          title: "Commentaire ajouté",
          description: "Votre commentaire a été ajouté avec succès.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      const updatedReviews = await fetchReviews(user.userId);
      setReviews(updatedReviews);
      setNewReview({ rating: 0, comment: "" });
      setEditingReview(null);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter ou de mettre à jour le commentaire.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditReview = (review) => {
    setNewReview({ rating: review.rating, comment: review.comment });
    setEditingReview(review);
  };

  const handleDeleteReview = async (id) => {
    try {
      await deleteReview(id);
      toast({
        title: "Commentaire supprimé",
        description: "Votre commentaire a été supprimé avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      const updatedReviews = await fetchReviews(user.userId);
      setReviews(updatedReviews);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le commentaire.",
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
                  setUserData({
                    ...userData,
                    confirmPassword: e.target.value,
                  })
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

        {/* Section de gestion des commentaires */}
        <Box mt="8">
          <Heading size="md" mb="4">
            Mes Commentaires
          </Heading>
          {reviews.map((review) => (
            <Box key={review.id} p="4" shadow="md" borderWidth="1px" mb="4">
              <Text>
                <strong>Note :</strong> {review.rating}
              </Text>
              <Text>
                <strong>Commentaire :</strong> {review.comment}
              </Text>
              <HStack mt="2">
                <Button size="sm" onClick={() => handleEditReview(review)}>
                  Modifier
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Supprimer
                </Button>
              </HStack>
            </Box>
          ))}

          <form onSubmit={handleReviewSubmit}>
            <FormControl id="rating" mt="4">
              <FormLabel>Note</FormLabel>
              <Input
                type="number"
                min="1"
                max="5"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="comment" mt="4">
              <FormLabel>Commentaire</FormLabel>
              <Textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              />
            </FormControl>
            <Button type="submit" mt="4" colorScheme="blue">
              {editingReview ? "Mettre à jour" : "Ajouter"} Commentaire
            </Button>
          </form>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default UserSettingPage;
