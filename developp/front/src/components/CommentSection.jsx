// CommentSection.jsx

import React, { useState } from "react";
import { Box, Textarea, Button, Text, Flex, Avatar } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { StarIcon } from "@chakra-ui/icons";


function CommentSection() {
  const { register, handleSubmit, reset } = useForm();
  const [showTextarea, setShowTextarea] = useState(false);

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
      <Box width="60%"> {/* Ajustez la largeur ici */}
        {showTextarea ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea {...register("comment")} placeholder="Votre commentaire" />
            <Button type="submit" mt={4} bg="#191970" color="white" borderRadius="full">
              Envoyer
            </Button>
          </form>
        ) : (
          <Box mb={4}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="2xl" color="#191970" fontWeight="bold">VOS COMMENTAIRES</Text>
              <Button onClick={handleAddComment} bg="#191970" color="white" borderRadius="full">
                Ajouter un commentaire
              </Button>
            </Flex>
          </Box>
        )}
        {/* Affichage des commentaires existants */}
        <Box mt={8}>
          {[1, 2, 3, 4].map((comment, index) => (
            <Box key={index} mb={6} p={4} borderWidth="1px" borderRadius="lg">
              <Flex alignItems="center" mb={2}>
                <Avatar size="sm" name="User" mr={2} />
                <Text fontWeight="bold">Nom d'utilisateur</Text>
                <Text ml={2} color="gray.500">Date</Text>
              </Flex>
              <Flex mb={2}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} color="yellow.400" />
                ))}
              </Flex>
              <Text>Bravo à l'équipe derrière ce merveilleux produit.</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}



export default CommentSection;
