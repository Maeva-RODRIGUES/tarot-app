/* eslint-disable no-restricted-globals */
// UserSettingPage.jsx

// Importation des dépendances nécessaires
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
import Rating from "react-rating"; // Composant pour afficher les étoiles de notation
import {
  FaUser,
  FaRegFileAlt,
  FaCog,
  FaSignOutAlt,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa"; // Importation d'icônes
import { Link as RouterLink, useNavigate } from "react-router-dom";
import HeaderDashboard from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import { useAuth } from "../components/context/AuthContext";
import { getUserData, updateUser } from "../api/usersApi";
import { uploadAvatar } from "../api/uploadApi";
import {
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../api/reviewsApi";

// Composant principal pour la page des paramètres utilisateur
function UserSettingPage() {
  const toast = useToast(); // Hook pour afficher des notifications toast
  const navigate = useNavigate(); // Hook pour naviguer entre les pages
  const { user, logout } = useAuth(); // Récupère l'utilisateur connecté et la fonction de déconnexion depuis le contexte d'authentification

  // ---------------------
  // État pour stocker les données de l'utilisateur
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    birthday: "",
    city_of_birth: "",
    time_of_birth: "",
    avatarUrl: "",
  });

  // État pour stocker le fichier d'avatar sélectionné
  const [avatarFile, setAvatarFile] = useState(null);

  // État pour stocker les commentaires de l'utilisateur
  const [reviews, setReviews] = useState([]);

  // État pour stocker le nouveau commentaire
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  // État pour déterminer si un commentaire est en cours d'édition
  const [editingReview, setEditingReview] = useState(null);

  // ---------------------
  // Effet pour récupérer les données de l'utilisateur lors du montage du composant
  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.userId) {
        try {
          const data = await getUserData(user.userId); // Récupère les données de l'utilisateur depuis l'API

          // Formatage et validation de la date de naissance
          if (data.birthday) {
            const parsedDate = new Date(data.birthday); // Convertit la date de naissance reçue en objet Date
            if (!isNaN(parsedDate)) {
              // Vérifie si la date est valide
              const formattedDate = parsedDate.toLocaleDateString("fr-FR"); // Formate la date en "dd/mm/yyyy"
              const [day, month, year] = formattedDate.split("/"); // Sépare jour, mois, année
              data.birthday = `${year}-${month}-${day}`; // Reformate en "yyyy-mm-dd"
            } else {
              data.birthday = ""; // Si la date n'est pas valide, on la vide
            }
          }

          setUserData(data); // Met à jour l'état avec les données de l'utilisateur

          // Récupérer les commentaires de l'utilisateur
          const userReviews = await fetchReviews(user.userId); // Récupère les commentaires de l'utilisateur depuis l'API
          setReviews(userReviews); // Met à jour l'état avec les commentaires
        } catch (error) {
          // Affiche un message d'erreur en cas d'échec
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

    fetchUserData(); // Appelle la fonction pour récupérer les données utilisateur
  }, [user, toast]); // Dépendance de l'effet aux changements de l'utilisateur et du toast

  // ---------------------
  // Gestion du changement d'avatar
  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]); // Met à jour l'état avec le fichier d'avatar sélectionné
  };

  // ---------------------
  // Gestion du téléchargement de l'avatar
  const handleAvatarUpload = async () => {
    if (avatarFile && user && user.userId) {
      try {
        const formData = new FormData();
        formData.append("avatar", avatarFile); // Ajoute le fichier d'avatar au formulaire
        formData.append("userId", user.userId); // Ajoute l'ID de l'utilisateur au formulaire
        const response = await uploadAvatar(formData); // Utilisation de la fonction uploadAvatar
        setUserData({ ...userData, avatarUrl: response.avatarUrl }); // Met à jour l'URL de l'avatar dans l'état utilisateur

        // Notification de succès
        toast({
          title: "Avatar mis à jour.",
          description: "Votre avatar a été mis à jour avec succès.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        // Notification d'erreur
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

  // ---------------------
  // Nettoyage et formatage des données utilisateur avant envoi
  const cleanAndFormatData = (data) => {
    console.log("Données avant nettoyage et formatage:", data); // Log avant nettoyage

    const cleanedData = { ...data };

    // Valider la date avant de la formater
    if (cleanedData.birthday) {
      console.log("Date de naissance originale:", cleanedData.birthday);

      // Conversion de la date au format local et reformatage
      const dateObj = new Date(cleanedData.birthday); // Convertit la date reçue en objet Date
      if (!isNaN(dateObj)) {
        const localeDateString = dateObj.toLocaleDateString("fr-FR"); // Convertit en chaîne locale "dd/mm/yyyy"
        const [day, month, year] = localeDateString.split("/"); // Sépare jour, mois, année
        cleanedData.birthday = `${year}-${month}-${day}`; // Reformate en "yyyy-mm-dd"
        console.log("Date de naissance après formatage:", cleanedData.birthday);
      } else {
        console.log("Date de naissance invalide, suppression de la date.");
        cleanedData.birthday = ""; // Si la date n'est pas valide, mieux vaut la mettre à jour comme vide
      }
    }

    console.log("Données après nettoyage et formatage:", cleanedData); // Log après nettoyage
    return cleanedData;
  };

  // ---------------------
  // Gestion de la soumission du formulaire pour mettre à jour les informations utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page à la soumission du formulaire
    if (user && user.userId) {
      try {
        console.log("Soumission du formulaire avec les données:", userData);
        const cleanedData = cleanAndFormatData(userData); // Nettoie et formate les données avant l'envoi
        await updateUser(user.userId, cleanedData); // Met à jour les données utilisateur via l'API
        console.log("Mise à jour réussie pour l'utilisateur ID:", user.userId);

        // Notification de succès
        toast({
          title: "Informations mises à jour.",
          description: "Vos informations ont été mises à jour avec succès.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        // Notification d'erreur en cas d'échec
        console.error("Erreur lors de la mise à jour des informations:", error);
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

  // ---------------------
  // Gestion de la soumission d'un commentaire
  const handleReviewSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page à la soumission du formulaire
    try {
      if (editingReview) {
        await updateReview(editingReview.id, newReview); // Met à jour un commentaire existant
        toast({
          title: "Commentaire mis à jour",
          description: "Votre commentaire a été mis à jour avec succès.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await createReview(user.userId, { ...newReview, date: new Date() }); // Crée un nouveau commentaire
        toast({
          title: "Commentaire ajouté",
          description: "Votre commentaire a été ajouté avec succès.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      // Récupère les commentaires mis à jour
      const updatedReviews = await fetchReviews(user.userId);
      setReviews(updatedReviews); // Met à jour l'état avec les nouveaux commentaires
      setNewReview({ rating: 0, comment: "" }); // Réinitialise le formulaire de commentaire
      setEditingReview(null); // Réinitialise l'état d'édition de commentaire
    } catch (error) {
      // Notification d'erreur en cas d'échec
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter ou de mettre à jour le commentaire.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // ---------------------
  // Préparation du formulaire pour l'édition d'un commentaire
  const handleEditReview = (review) => {
    setNewReview({ rating: review.rating, comment: review.comment }); // Charge le commentaire dans le formulaire
    setEditingReview(review); // Met à jour l'état pour indiquer qu'on est en mode édition
  };

  // ---------------------
  // Suppression d'un commentaire
  const handleDeleteReview = async (id) => {
    try {
      await deleteReview(id); // Supprime un commentaire via l'API
      toast({
        title: "Commentaire supprimé",
        description: "Votre commentaire a été supprimé avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Récupère les commentaires mis à jour
      const updatedReviews = await fetchReviews(user.userId);
      setReviews(updatedReviews); // Met à jour l'état avec les nouveaux commentaires
    } catch (error) {
      // Notification d'erreur en cas d'échec
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le commentaire.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // ---------------------
  // Gestion de la déconnexion de l'utilisateur
  const handleLogout = () => {
    logout(); // Appelle la fonction de déconnexion du contexte
    navigate("/"); // Redirige vers la page d'accueil
  };

  // ---------------------
  // Rendu du composant
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <HeaderDashboard /> {/* Affiche l'en-tête du tableau de bord */}
      {/* Menu de navigation latéral */}
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
      {/* Contenu principal de la page des paramètres utilisateur */}
      <Box ml="250px" p="8" flex="1">
        <Heading mb="4">Paramètres du profil</Heading>
        <VStack mb="8" align="center">
          <Avatar size="xl" src={userData.avatarUrl} />{" "}
          {/* Affiche l'avatar de l'utilisateur */}
          <FormControl id="avatar" mt="4">
            <FormLabel>Mettre à jour l&#39;`avatar</FormLabel>
            <Input type="file" onChange={handleAvatarChange} />{" "}
            {/* Champ pour sélectionner un nouveau fichier d'avatar */}
            <Button mt="2" colorScheme="blue" onClick={handleAvatarUpload}>
              Télécharger
            </Button>
          </FormControl>
        </VStack>

        {/* Formulaire de mise à jour des informations utilisateur */}
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
            Mes commentaires
          </Heading>
          {reviews.map((review) => (
            <Box key={review.id} p="4" shadow="md" borderWidth="1px" mb="4">
              <Text>
                <strong>Note :</strong>{" "}
                <Rating
                  readonly
                  initialRating={review.rating}
                  emptySymbol={<FaStarHalfAlt color="gray" />}
                  fullSymbol={<FaStar color="gold" />}
                />
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

          {/* Formulaire pour ajouter ou modifier un commentaire */}
          <form onSubmit={handleReviewSubmit}>
            <FormControl id="rating" mt="4">
              <FormLabel>Note</FormLabel>
              <Rating
                initialRating={newReview.rating}
                emptySymbol={<FaStarHalfAlt color="gray" />}
                fullSymbol={<FaStar color="gold" />}
                onChange={(value) =>
                  setNewReview({ ...newReview, rating: value })
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
            <Button
              type="submit"
              bg="#191970"
              color="white"
              _hover={{ bg: "#0f1a4c" }}
              width="200px"
              alignSelf="center"
              mt="4"
            >
              {editingReview ? "Mettre à jour" : "Ajouter"} commentaire
            </Button>
          </form>
        </Box>
      </Box>
      <Footer /> {/* Affiche le pied de page */}
    </Box>
  );
}

export default UserSettingPage;
