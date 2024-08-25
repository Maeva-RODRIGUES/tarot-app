/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
// CommentModal.jsx

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import des icônes d'étoiles
import Rating from "react-rating";

function CommentModal({ isOpen, onClose, comment, onDelete }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "xl" }}> {/* Taille responsive du modal */}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Commentaire détails</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing="4">
            <Text>
              <strong>ID Utilisateur :</strong> {comment.id_Users}
            </Text>
            <Text>
              <strong>Évaluation :</strong>
            </Text>
            <Rating
              readonly
              initialRating={comment.rating}
              emptySymbol={<FaStar color="gray" />} 
              fullSymbol={<FaStar color="gold" />} 
            />
            <Text>
              <strong>Commentaire :</strong>
            </Text>
            <Text>{comment.comment}</Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing="4">
            <Button colorScheme="red" onClick={() => onDelete(comment.id)}>
              Supprimer
            </Button>
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CommentModal;
