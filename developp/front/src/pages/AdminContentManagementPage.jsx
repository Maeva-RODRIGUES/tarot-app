/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
// src/pages/AdminContentManagementPage.jsx

import React, { useState } from "react";
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
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Image,
  Grid,
  useToast,
  useTheme,
} from "@chakra-ui/react";
import { FaFileAlt, FaCog, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import Header from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import useCards from "../hooks/useCards";
import useThemes from "../hooks/useThemes";
import useReviews from "../hooks/useReviews";

// Définition de la base URL pour les images des cartes
const IMAGE_BASE_URL = "http://localhost:8000";

function ContentManagementPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const theme = useTheme();

  const {
    cards,
    isLoading: isLoadingCards,
    mutateCreateCard,
    mutateUpdateCard,
    mutateDeleteCard,
    mutateUploadCardImage,
  } = useCards();

  const {
    themes,
    isLoading: isLoadingThemes,
    mutateCreateTheme,
    mutateUpdateTheme,
    mutateDeleteTheme,
  } = useThemes();

  const {
    reviews,
    isLoading: isLoadingReviews,
    mutateDeleteReview,
  } = useReviews(); // Utilisation du hook useReviews pour gérer les commentaires

  const [selectedContent, setSelectedContent] = useState(null);
  const [form, setForm] = useState({ title_theme: "", meaning_theme: "" });
  const [editing, setEditing] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [cardForm, setCardForm] = useState({
    id: "",
    name_card: "",
    keyword1: "",
    keyword2: "",
    keyword3: "",
    image_url: "",
  });
  const [cardImage, setCardImage] = useState(null);
  const [editingCard, setEditingCard] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige vers la page d'accueil après la déconnexion
  };

  // ------ Début des fonctions de gestion des thèmes ------
  const handleEditTheme = (theme) => {
    setSelectedContent(theme);
    setForm({
      title_theme: theme.title_theme,
      meaning_theme: theme.meaning_theme,
    });
    setEditing(true);
  };

  const handleDeleteTheme = (id) => {
    mutateDeleteTheme(id);
  };

  const handleSubmitTheme = (e) => {
    e.preventDefault();
    const themeData = {
      title_theme: form.title_theme,
      meaning_theme: form.meaning_theme,
    };
    if (editing) {
      mutateUpdateTheme({ id: selectedContent.id, themeData });
    } else {
      mutateCreateTheme(themeData);
    }
    setForm({ title_theme: "", meaning_theme: "" });
    setEditing(false);
  };
  // ------ Fin des fonctions de gestion des thèmes ------

  // ------ Début des fonctions de gestion des cartes ------
  const handleEditCard = (card) => {
    setSelectedCard(card);
    setCardForm({
      id: card.id,
      name_card: card.name_card,
      keyword1: card.keyword1,
      keyword2: card.keyword2,
      keyword3: card.keyword3,
      image_url: card.image_url,
    });
    setEditingCard(true);
  };

  const handleDeleteCard = (id) => {
    mutateDeleteCard(id);
  };

  const handleCardImageChange = (e) => {
    const file = e.target.files[0];
    setCardImage(file);

    // Si un fichier est sélectionné, créer une URL de prévisualisation temporaire
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setCardForm({ ...cardForm, image_url: previewURL });
    }
  };

  const handleSubmitCard = async (e) => {
    e.preventDefault();

    const cardData = {
      name_card: cardForm.name_card,
      keyword1: cardForm.keyword1,
      keyword2: cardForm.keyword2,
      keyword3: cardForm.keyword3,
      image_url: cardForm.image_url,
    };

    try {
      if (editingCard && cardForm.id) {
        if (cardImage) {
          const formData = new FormData();
          formData.append("id", cardForm.id);
          formData.append("image", cardImage);

          const filename = cardForm.image_url.split("/").pop();
          await mutateUploadCardImage({ filename, formData });
        } else {
          await mutateUpdateCard(cardForm.id, cardData);
        }
      } else {
        await mutateCreateCard(cardData);
      }

      // ------ Notification de succès ------
      toast({
        title: "Succès",
        description: "Carte mise à jour avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // ------ Notification d'erreur ------
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de la carte.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setCardForm({
      id: "",
      name_card: "",
      keyword1: "",
      keyword2: "",
      keyword3: "",
      image_url: "",
    });
    setCardImage(null);
    setEditingCard(false);
  };
  // ------ Fin des fonctions de gestion des cartes ------

  // ------ Début des fonctions de gestion des commentaires ------
  const handleDeleteComment = (id) => {
    mutateDeleteReview(id); // Supprimer le commentaire
    toast({
      title: "Commentaire supprimé",
      description: "Le commentaire a été supprimé avec succès.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  // ------ Fin des fonctions de gestion des commentaires ------

  if (isLoadingCards || isLoadingThemes || isLoadingReviews) {
    return <Text>Loading...</Text>;
  }

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

      <Box ml="250px" p="8" pt="2" flex="1">
        <Heading mb="12">🔮Gestion des thèmes</Heading>

        <Stack spacing="4">
          <form onSubmit={handleSubmitTheme}>
            <FormControl mb="4">
              <FormLabel>Titre</FormLabel>
              <Input
                value={form.title_theme}
                onChange={(e) =>
                  setForm({ ...form, title_theme: e.target.value })
                }
                placeholder="Titre du thème"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Description</FormLabel>
              <Textarea
                value={form.meaning_theme}
                onChange={(e) =>
                  setForm({ ...form, meaning_theme: e.target.value })
                }
                placeholder="Description du thème"
                required
              />
            </FormControl>
            <Button
              bg="customBlue"
              color="white"
              _hover={{ bg: "blue.700" }}
              type="submit"
            >
              {editing ? "Sauvegarder" : "Ajouter"}
            </Button>
          </form>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Titre</Th>
                <Th>Description</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {themes.map((theme) => (
                <Tr key={theme.id}>
                  <Td>{theme.title_theme}</Td>
                  <Td>{theme.meaning_theme}</Td>
                  <Td>
                    <Stack direction="row" spacing="4">
                      <Button
                        onClick={() => handleEditTheme(theme)}
                        aria-label="Éditer"
                        colorScheme="blue"
                      >
                        Éditer
                      </Button>
                      <Button
                        onClick={() => handleDeleteTheme(theme.id)}
                        aria-label="Supprimer"
                        colorScheme="red"
                      >
                        Supprimer
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>

        <Heading mt="12" mb="6">
          🃏Gestion des cartes
        </Heading>

        <Stack spacing="4">
          <form onSubmit={handleSubmitCard}>
            <FormControl mb="4">
              <FormLabel>ID</FormLabel>
              <Input
                value={cardForm.id}
                readOnly
                placeholder="ID de la carte"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Nom</FormLabel>
              <Input
                value={cardForm.name_card}
                onChange={(e) =>
                  setCardForm({ ...cardForm, name_card: e.target.value })
                }
                placeholder="Nom de la carte"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Mot-clé 1</FormLabel>
              <Input
                value={cardForm.keyword1}
                onChange={(e) =>
                  setCardForm({ ...cardForm, keyword1: e.target.value })
                }
                placeholder="Mot-clé 1"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Mot-clé 2</FormLabel>
              <Input
                value={cardForm.keyword2}
                onChange={(e) =>
                  setCardForm({ ...cardForm, keyword2: e.target.value })
                }
                placeholder="Mot-clé 2"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Mot-clé 3</FormLabel>
              <Input
                value={cardForm.keyword3}
                onChange={(e) =>
                  setCardForm({ ...cardForm, keyword3: e.target.value })
                }
                placeholder="Mot-clé 3"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Image URL</FormLabel>
              <Input
                value={cardForm.image_url}
                onChange={(e) =>
                  setCardForm({ ...cardForm, image_url: e.target.value })
                }
                placeholder="URL de l'image"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Télécharger une image</FormLabel>
              <Input type="file" onChange={handleCardImageChange} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Prévisualisation de l'image</FormLabel>
              {cardForm.image_url && (
                <Image
                  src={
                    cardForm.image_url.startsWith("blob")
                      ? cardForm.image_url
                      : `${IMAGE_BASE_URL}${cardForm.image_url}`
                  }
                  alt="Prévisualisation"
                  boxSize="200px"
                  height="400px"
                  objectFit="cover"
                  mb="4"
                />
              )}
            </FormControl>
            <Button
              bg="customBlue"
              color="white"
              _hover={{ bg: "blue.700" }}
              type="submit"
            >
              {editingCard ? "Sauvegarder" : "Ajouter"}
            </Button>
          </form>

          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
            {cards.map((card) => (
              <Box
                key={card.id}
                p="4"
                borderWidth="1px"
                borderRadius="md"
                bg="white"
              >
                {/* Affichage de l'image avec le chemin complet */}
                <Image
                  src={`${IMAGE_BASE_URL}${card.image_url}`}
                  alt={card.name_card}
                  boxSize="200px"
                  height="400px"
                  objectFit="cover"
                  mb="4"
                />

                <Heading size="md" mb="2">
                  {card.name_card}
                </Heading>
                <Text mb="2">
                  {card.keyword1}, {card.keyword2}, {card.keyword3}
                </Text>
                <Stack direction="row" spacing="4">
                  <Button
                    onClick={() => handleEditCard(card)}
                    aria-label="Éditer"
                    colorScheme="blue"
                  >
                    Éditer
                  </Button>
                  <Button
                    onClick={() => handleDeleteCard(card.id)}
                    aria-label="Supprimer"
                    colorScheme="red"
                  >
                    Supprimer
                  </Button>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Stack>

        <Heading mt="12" mb="6">
          🖋Gestion des commentaires
        </Heading>

        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          {reviews.map((comment) => (
            <Box
              key={comment.id}
              p="4"
              borderWidth="1px"
              borderRadius="md"
              bg="white"
            >
              <Heading size="md" mb="2">
                Utilisateur ID: {comment.id_Users}
              </Heading>
              <Text mb="2">{comment.comment}</Text>
              <Text mb="2">Évaluation: {comment.rating}</Text>
              <Stack direction="row" spacing="4">
                <Button
                  onClick={() => handleDeleteComment(comment.id)}
                  aria-label="Supprimer"
                  colorScheme="red"
                >
                  Supprimer
                </Button>
              </Stack>
            </Box>
          ))}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
}

export default ContentManagementPage;
