// src/pages/ContentManagementPage.jsx

import React, { useState, useEffect } from "react";
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
  Select,
  Stack,
  Image,
  Grid,
  useTheme,
} from "@chakra-ui/react";
import { FaFileAlt, FaCog, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import Header from "../components/HeaderDashboard"; // Assurez-vous que le chemin est correct
import Footer from "../components/Footer"; // Assurez-vous que le chemin est correct

function ContentManagementPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [content, setContent] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", theme: "" });
  const [editing, setEditing] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardForm, setCardForm] = useState({
    name: "",
    interpretation: "",
    keywords: "",
    imageUrl: "",
  });
  const [editingCard, setEditingCard] = useState(false);

  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [commentForm, setCommentForm] = useState({
    author: "",
    content: "",
  });
  const [editingComment, setEditingComment] = useState(false);

  useEffect(() => {
    // Données simulées
    const simulatedContent = [
      {
        id: 1,
        title: "Contenu 1",
        description: "Description du contenu 1",
        themeName: "Thème 1",
      },
      {
        id: 2,
        title: "Contenu 2",
        description: "Description du contenu 2",
        themeName: "Thème 2",
      },
    ];

    const simulatedThemes = [
      { id: "1", name: "Thème 1" },
      { id: "2", name: "Thème 2" },
    ];

    const simulatedCards = [
      {
        id: 1,
        name: "Carte 1",
        interpretation: "Interprétation 1",
        keywords: "Mot-clé 1",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Carte 2",
        interpretation: "Interprétation 2",
        keywords: "Mot-clé 2",
        imageUrl: "https://via.placeholder.com/150",
      },
    ];

    const simulatedComments = [
      { id: 1, author: "Auteur 1", content: "Commentaire 1" },
      { id: 2, author: "Auteur 2", content: "Commentaire 2" },
    ];

    // Simuler le chargement des données
    setContent(simulatedContent);
    setThemes(simulatedThemes);
    setCards(simulatedCards);
    setComments(simulatedComments);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige vers la page d'accueil après la déconnexion
  };

  const handleEdit = (item) => {
    setSelectedContent(item);
    setForm({
      title: item.title,
      description: item.description,
      theme: item.theme,
    });
    setEditing(true);
  };

  const handleDelete = (id) => {
    setContent(content.filter((item) => item.id !== id));
  };

  const handleCardEdit = (card) => {
    setSelectedCard(card);
    setCardForm({
      name: card.name,
      interpretation: card.interpretation,
      keywords: card.keywords,
      imageUrl: card.imageUrl,
    });
    setEditingCard(true);
  };

  const handleCardDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();

    const newCard = { id: Date.now(), ...cardForm };

    if (editingCard) {
      setCards(
        cards.map((card) => (card.id === selectedCard.id ? newCard : card)),
      );
    } else {
      setCards([...cards, newCard]);
    }

    setCardForm({ name: "", interpretation: "", keywords: "", imageUrl: "" });
    setEditingCard(false);
    setSelectedCard(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      // Update existing content
      setContent(
        content.map((item) =>
          item.id === selectedContent.id
            ? {
                ...item,
                title: form.title,
                description: form.description,
                theme: form.theme,
              }
            : item,
        ),
      );
    } else {
      // Add new content
      setContent([...content, { id: Date.now(), ...form }]);
    }

    setForm({ title: "", description: "", theme: "" });
    setEditing(false);
    setSelectedContent(null);
  };

  const handleCommentEdit = (comment) => {
    setSelectedComment(comment);
    setCommentForm({ author: comment.author, content: comment.content });
    setEditingComment(true);
  };

  const handleCommentDelete = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const newComment = { id: Date.now(), ...commentForm };

    if (editingComment) {
      setComments(
        comments.map((comment) =>
          comment.id === selectedComment.id ? newComment : comment,
        ),
      );
    } else {
      setComments([...comments, newComment]);
    }

    setCommentForm({ author: "", content: "" });
    setEditingComment(false);
    setSelectedComment(null);
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

      <Box ml="250px" p="8" pt="2" flex="1">
        <Heading mb="12">🔮Gestion des thèmes</Heading>

        {/* Bloc de Gestion des Contenus */}
        <Stack spacing="4">
          <form onSubmit={handleSubmit}>
            <FormControl mb="4">
              <FormLabel>Titre</FormLabel>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Titre du contenu"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Description</FormLabel>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Description du contenu"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Thème</FormLabel>
              <Select
                value={form.theme}
                onChange={(e) => setForm({ ...form, theme: e.target.value })}
                placeholder="Sélectionnez un thème"
                required
              >
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.name}>
                    {theme.name}
                  </option>
                ))}
              </Select>
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
                <Th>Thème</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {content.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.title}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.themeName}</Td>
                  <Td>
                    <Stack direction="row" spacing="4">
                      <Button
                        onClick={() => handleEdit(item)}
                        aria-label="Éditer"
                        colorScheme="blue"
                      >
                        Éditer
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id)}
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

        {/* Bloc de Gestion des Cartes */}
        <Stack spacing="4">
          <form onSubmit={handleCardSubmit}>
            <FormControl mb="4">
              <FormLabel>Nom</FormLabel>
              <Input
                value={cardForm.name}
                onChange={(e) =>
                  setCardForm({ ...cardForm, name: e.target.value })
                }
                placeholder="Nom de la carte"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Interprétation</FormLabel>
              <Textarea
                value={cardForm.interpretation}
                onChange={(e) =>
                  setCardForm({ ...cardForm, interpretation: e.target.value })
                }
                placeholder="Interprétation de la carte"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Mots-clés</FormLabel>
              <Input
                value={cardForm.keywords}
                onChange={(e) =>
                  setCardForm({ ...cardForm, keywords: e.target.value })
                }
                placeholder="Mots-clés de la carte"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Image URL</FormLabel>
              <Input
                value={cardForm.imageUrl}
                onChange={(e) =>
                  setCardForm({ ...cardForm, imageUrl: e.target.value })
                }
                placeholder="URL de l'image"
                required
              />
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
                <Image
                  src={card.imageUrl}
                  alt={card.name}
                  boxSize="150px"
                  objectFit="cover"
                  mb="4"
                />
                <Heading size="md" mb="2">
                  {card.name}
                </Heading>
                <Text mb="2">
                  <strong>Interprétation:</strong> {card.interpretation}
                </Text>
                <Text mb="2">
                  <strong>Mots-clés:</strong> {card.keywords}
                </Text>
                <Stack direction="row" spacing="4">
                  <Button
                    onClick={() => handleCardEdit(card)}
                    aria-label="Éditer"
                    colorScheme="blue"
                  >
                    Éditer
                  </Button>
                  <Button
                    onClick={() => handleCardDelete(card.id)}
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

        {/* Bloc de Gestion des Commentaires */}
        <Stack spacing="4">
          <form onSubmit={handleCommentSubmit}>
            <FormControl mb="4">
              <FormLabel>Auteur</FormLabel>
              <Input
                value={commentForm.author}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, author: e.target.value })
                }
                placeholder="Auteur du commentaire"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Commentaire</FormLabel>
              <Textarea
                value={commentForm.content}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, content: e.target.value })
                }
                placeholder="Contenu du commentaire"
                required
              />
            </FormControl>
            <Button
              bg="customBlue"
              color="white"
              _hover={{ bg: "blue.700" }}
              type="submit"
            >
              {editingComment ? "Sauvegarder" : "Ajouter"}
            </Button>
          </form>

          <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
            {comments.map((comment) => (
              <Box
                key={comment.id}
                p="4"
                borderWidth="1px"
                borderRadius="md"
                bg="white"
              >
                <Heading size="md" mb="2">
                  {comment.author}
                </Heading>
                <Text mb="2">{comment.content}</Text>
                <Stack direction="row" spacing="4">
                  <Button
                    onClick={() => handleCommentEdit(comment)}
                    aria-label="Éditer"
                    colorScheme="blue"
                  >
                    Éditer
                  </Button>
                  <Button
                    onClick={() => handleCommentDelete(comment.id)}
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
      </Box>

      <Footer />
    </Box>
  );
}

export default ContentManagementPage;
