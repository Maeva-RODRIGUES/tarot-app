/* eslint-disable import/no-extraneous-dependencies */
// src/hooks/useCards.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCards,
  createCard,
  updateCard,
  deleteCard,
  uploadCardImage,
} from "../api/cardsApi";

const useCards = () => {
  const queryClient = useQueryClient();

  const {
    data: cards,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });

  const { mutate: mutateCreateCard } = useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
    },
  });

  const { mutate: mutateUpdateCard } = useMutation({
    mutationFn: updateCard,
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
    },
  });

  const { mutate: mutateDeleteCard } = useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
    },
  });

  const { mutate: mutateUploadCardImage } = useMutation({
    mutationFn: ({ filename, formData }) => uploadCardImage(filename, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
    },
  });

  return {
    cards,
    isLoading,
    isError,
    error,
    mutateCreateCard,
    mutateUpdateCard,
    mutateDeleteCard,
    mutateUploadCardImage,
  };
};

export default useCards;
