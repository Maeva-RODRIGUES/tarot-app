// useReviews.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../api/reviewsApi";

const useReviews = () => {
  const queryClient = useQueryClient();

  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  const { mutate: mutateCreateReview } = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const { mutate: mutateUpdateReview } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const { mutate: mutateDeleteReview } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  return {
    reviews,
    isLoading,
    isError,
    error,
    mutateCreateReview,
    mutateUpdateReview,
    mutateDeleteReview,
  };
};

export default useReviews;
