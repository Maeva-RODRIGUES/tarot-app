/* eslint-disable import/no-extraneous-dependencies */
// useReviews.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchReviews,
  fetchAllReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../api/reviewsApi";

const useReviews = (userId = null) => {
  const queryClient = useQueryClient();

  const fetchFunction = userId ? () => fetchReviews(userId) : fetchAllReviews;

  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews", userId],
    queryFn: fetchFunction,
  });

  const { mutate: mutateCreateReview } = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", userId]);
    },
  });

  const { mutate: mutateUpdateReview } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", userId]);
    },
  });

  const { mutate: mutateDeleteReview } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", userId]);
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
