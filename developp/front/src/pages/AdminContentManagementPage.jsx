
// Importation des dépendances nécessaires
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
  Grid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Image,
  useToast,
  useTheme,
  Card,
  CardBody,
  CardHeader,
  Collapse,
} from "@chakra-ui/react";
import {
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import Header from "../components/HeaderDashboard";
import Footer from "../components/Footer";
import useCards from "../hooks/useCards";
import useThemes from "../hooks/useThemes";
import useReviews from "../hooks/useReviews";
import CommentModal from "../components/CommentModal";
import SidebarNav from "../components/SidebarNav"; // Ajout MAJ


const IMAGE_BASE_URL = "http://localhost:8000";

function ContentManagementPage() {
  // Récupère les fonctions de déconnexion et de navigation
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const theme = useTheme();

  // Récupère les cartes, les thèmes et les avis via les hooks personnalisés
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
  } = useReviews();

  // États pour gérer la sélection et l'édition des commentaires, des thèmes, et des cartes
  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

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
  const [selectedThemeId, setSelectedThemeId] = useState(null);

  // Gestion de la déconnexion
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Gestion de l'édition des thèmes
  const handleEditTheme = (theme) => {
    setSelectedContent(theme);
    setForm({
      title_theme: theme.title_theme,
      meaning_theme: theme.meaning_theme,
    });
    setEditing(true);
  };

  // Gestion de la suppression des thèmes
  const handleDeleteTheme = (id) => {
    mutateDeleteTheme(id);
  };

  // Soumission du formulaire pour créer ou éditer un thème
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

  // Gestion de l'édition des cartes
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

  // Gestion de la suppression des cartes
  const handleDeleteCard = (id) => {
    mutateDeleteCard(id);
  };

  // Gestion du changement d'image pour les cartes
  const handleCardImageChange = (e) => {
    const file = e.target.files[0];
    setCardImage(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setCardForm({ ...cardForm, image_url: previewURL });
    }
  };

  // Soumission du formulaire pour créer ou éditer une carte
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
      toast({
        title: "Succès",
        description: "Carte mise à jour avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
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

  // Ouverture et fermeture du modal pour les commentaires
  const handleOpenModal = (comment) => {
    setSelectedComment(comment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedComment(null);
    setModalOpen(false);
  };

  // Gestion de la suppression des commentaires
  const handleDeleteComment = (id) => {
    mutateDeleteReview(id);
    toast({
      title: "Commentaire supprimé",
      description: "Le commentaire a été supprimé avec succès.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    handleCloseModal();
  };

  // Affichage du loader pendant le chargement des cartes, thèmes ou avis
  if (isLoadingCards || isLoadingThemes || isLoadingReviews) {
    return <Text>Chargement...</Text>;
  }

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />

      <SidebarNav /> {/* Ajout MAJ */}


      <Box ml={["0", "250px"]} p="8" pt="8" flex="1">
        {/* Gestion des Thèmes */}
        <Grid templateColumns={["1fr", "1fr 2fr"]} gap={6} mb={12}>
          <Card>
            <CardHeader>
              <Heading size="md">Gestion des thèmes</Heading>
            </CardHeader>
            <CardBody>
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
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              {themes.map((theme) => (
                <Box
                  key={theme.id}
                  mb={4}
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    bg="gray.100"
                    p={4}
                    cursor="pointer"
                    onClick={() =>
                      setSelectedThemeId(
                        selectedThemeId === theme.id ? null : theme.id,
                      )
                    }
                  >
                    <Text fontWeight="bold">{theme.title_theme}</Text>
                    <Icon
                      as={
                        selectedThemeId === theme.id
                          ? FaChevronUp
                          : FaChevronDown
                      }
                    />
                  </Flex>
                  <Collapse in={selectedThemeId === theme.id}>
                    <Box p={4}>
                      <Text mb={4}>{theme.meaning_theme}</Text>
                      <HStack spacing="4">
                        <Button
                          onClick={() => handleEditTheme(theme)}
                          aria-label="Éditer"
                          colorScheme="blue"
                          leftIcon={<FaEdit />}
                        >
                          Éditer
                        </Button>
                        <Button
                          onClick={() => handleDeleteTheme(theme.id)}
                          aria-label="Supprimer"
                          colorScheme="red"
                          leftIcon={<FaTrash />}
                        >
                          Supprimer
                        </Button>
                      </HStack>
                    </Box>
                  </Collapse>
                </Box>
              ))}
            </CardBody>
          </Card>
        </Grid>

        {/* Section Gestion des Cartes */}
        <Card mt="6">
          <CardHeader>
            <Heading size="md">Gestion des cartes</Heading>
          </CardHeader>
          <CardBody display="flex" flexDirection={["column", "row"]}>
            {/* Colonne gauche: Liste des vignettes */}
            <Box width={["100%", "30%"]} maxHeight="600px" overflowY="auto">
              <Grid
                templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                gap={2}
              >
                {cards.map((card) => (
                  <Box
                    key={card.id}
                    p="2"
                    borderWidth="1px"
                    borderRadius="md"
                    bg="white"
                    cursor="pointer"
                    onClick={() => handleEditCard(card)}
                  >
                    <Image
                      src={`${IMAGE_BASE_URL}${card.image_url}`}
                      alt={card.name_card}
                      boxSize="80px"
                      height="150px"
                      objectFit="cover"
                      border="solid 2px"
                      borderRadius={15}
                      mb="2"
                    />
                    <Text fontSize="sm" textAlign="center">
                      {card.name_card}
                    </Text>
                  </Box>
                ))}
              </Grid>
            </Box>

            {/* Colonne droite: Formulaire de modification */}
            <Box width={["100%", "70%"]} pl={[0, "8"]} mt={[4, 0]}>
              {selectedCard ? (
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
                  {cardForm.image_url && (
                    <FormControl mb="4">
                      <FormLabel>Prévisualisation de l'image</FormLabel>
                      <Image
                        src={
                          cardForm.image_url.startsWith("blob")
                            ? cardForm.image_url
                            : `${IMAGE_BASE_URL}${cardForm.image_url}`
                        }
                        alt="Prévisualisation"
                        boxSize="200px"
                        objectFit="cover"
                        mb="4"
                        height={350}
                        border="solid 2px"
                        borderRadius={15}
                      />
                    </FormControl>
                  )}
                  <Button
                    bg="customBlue"
                    color="white"
                    _hover={{ bg: "blue.700" }}
                    type="submit"
                  >
                    {editingCard ? "Sauvegarder" : "Ajouter"}
                  </Button>
                </form>
              ) : (
                <Text>Sélectionnez une carte pour la modifier.</Text>
              )}
            </Box>
          </CardBody>
        </Card>

        {/* Gestion des Commentaires */}
        <Grid templateColumns="1fr" gap={6} mb={12}>
          <Card>
            <CardHeader>
              <Heading size="md">Gestion des commentaires</Heading>
            </CardHeader>
            <CardBody>
              <Grid
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                gap={6}
              >
                {reviews.map((comment) => (
                  <Box
                    key={comment.id}
                    p="4"
                    borderWidth="1px"
                    borderRadius="md"
                    bg="white"
                  >
                    <Heading size="sm" mb="2"  fontFamily="Urbanist">
                      Utilisateur ID : {comment.id_Users}
                    </Heading>
                    <Text isTruncated>{comment.comment}</Text>
                    <HStack mt="4" spacing="4">
                      <Button
                        leftIcon={<FaEye />}
                        colorScheme="blue"
                        onClick={() => handleOpenModal(comment)}
                      >
                        Détails
                      </Button>
                    </HStack>
                  </Box>
                ))}
              </Grid>
            </CardBody>
          </Card>
        </Grid>
      </Box>

      <Footer />

      {selectedComment && (
        <CommentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          comment={selectedComment}
          onDelete={handleDeleteComment}
        />
      )}
    </Box>
  );
}

export default ContentManagementPage;
