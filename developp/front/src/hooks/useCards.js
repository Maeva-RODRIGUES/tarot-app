// src/hooks/useCards.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Fonction pour obtenir les cartes
const fetchCards = async () => {
  const response = await axios.get("http://localhost:8000/api/tarot/cards");
  return response.data;
};

// Fonction pour supprimer une carte
const deleteCard = async (id) => {
  await axios.delete(`http://localhost:8000/api/tarot/cards/${id}`);
};

// Hook personnalisé pour les cartes
const useCards = () => {
  const queryClient = useQueryClient();

  // Utilisation de useQuery pour récupérer les cartes
  const {
    data: cards,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cards"], // Clé de la requête
    queryFn: fetchCards, // Fonction pour récupérer les données
  });

  // Utilisation de useMutation pour supprimer une carte
  const { mutate: mutateDeleteCard } = useMutation({
    mutationFn: deleteCard, // Fonction pour la mutation
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]); // Invalider les données des cartes après suppression
    },
  });

  return { cards, isLoading, isError, error, mutateDeleteCard };
};

export default useCards;
