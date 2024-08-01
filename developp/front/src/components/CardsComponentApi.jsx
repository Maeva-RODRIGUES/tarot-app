// src/components/CardsComponentApi.jsx : Ce composant affichera les cartes et permettra d'effectuer des opérations CRUD.

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCards,
  createCard,
  updateCard,
  deleteCard,
} from "../api/cardsApi";

function CardsComponent() {
  const queryClient = useQueryClient();

  // Utilisation du hook useQuery pour récupérer les cartes
  const { data: cards, isLoading, error } = useQuery(["cards"], fetchCards);

  // Mutation pour créer une carte
  const mutationCreate = useMutation(createCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
    },
  });

  // Mutation pour mettre à jour une carte
  const mutationUpdate = useMutation(
    ({ id, cardData }) => updateCard(id, cardData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cards"]);
      },
    },
  );

  // Mutation pour supprimer une carte
  const mutationDelete = useMutation(deleteCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
    },
  });

  // Gestion des états de chargement et d'erreur
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Cards List</h1>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            {card.name} {/* Remplacer par les propriétés réelles des cartes */}
            <button
              onClick={() =>
                mutationUpdate.mutate({
                  id: card.id,
                  cardData: { name: "Updated Card" },
                })
              }
            >
              Update
            </button>
            <button onClick={() => mutationDelete.mutate(card.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => mutationCreate.mutate({ name: "New Card" })}>
        Create New Card
      </button>
    </div>
  );
}

export default CardsComponent;
