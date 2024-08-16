/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
// CommentSection.jsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Textarea,
  Button,
  Text,
  Flex,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { StarIcon } from "@chakra-ui/icons";
import { fetchAllReviews } from "../api/reviewsApi";

function CommentSection() {
  const { register, handleSubmit, reset } = useForm();
  const [showTextarea, setShowTextarea] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      try {
        const fetchedComments = await fetchAllReviews(); // Récupère tous les commentaires
        setComments(fetchedComments);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des commentaires:",
          error,
        );
        setLoading(false);
      }
    };

    getComments();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setShowTextarea(false); // Masquer le textarea après l'envoi du commentaire
  };

  const handleAddComment = () => {
    setShowTextarea(true);
  };

  return (
    <Box mt={10} display="flex" flexDirection="column" alignItems="center">
      <Box width="60%">
        {showTextarea ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              {...register("comment")}
              placeholder="Votre commentaire"
            />
            <Button
              type="submit"
              mt={4}
              bg="#191970"
              color="white"
              borderRadius="full"
            >
              Envoyer
            </Button>
          </form>
        ) : (
          <Box mb={14}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="2xl" color="#191970" fontWeight="bold">
                VOS COMMENTAIRES
              </Text>
              <Button
                onClick={handleAddComment}
                bg="#191970"
                color="white"
                borderRadius="full"
              >
                Ajouter un commentaire
              </Button>
            </Flex>
          </Box>
        )}

        {/* Affichage des commentaires existants */}
        <Box mt={8}>
          {loading ? (
            <Spinner />
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <Box
                key={comment.id}
                mb={6}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
              >
                <Flex alignItems="center" mb={2}>
                  <Avatar size="sm" name="User" mr={2} />
                  <Text fontWeight="bold">
                    {comment.username || "Utilisateur"}
                  </Text>
                  <Text ml={2} color="gray.500">
                    {new Date(comment.date).toLocaleDateString()}
                  </Text>
                </Flex>
                <Flex mb={2}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < comment.rating ? "yellow.400" : "gray.300"}
                    />
                  ))}
                </Flex>
                <Text>{comment.comment}</Text>
              </Box>
            ))
          ) : (
            <Text>Aucun commentaire pour le moment.</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default CommentSection;
