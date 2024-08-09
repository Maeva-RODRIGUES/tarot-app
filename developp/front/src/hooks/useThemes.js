// useThemes.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchThemes,
  createTheme,
  updateTheme,
  deleteTheme,
} from "../api/themesApi";

const useThemes = () => {
  const queryClient = useQueryClient();

  const {
    data: themes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["themes"],
    queryFn: fetchThemes,
  });

  const { mutate: mutateCreateTheme } = useMutation({
    mutationFn: createTheme,
    onSuccess: () => {
      queryClient.invalidateQueries(["themes"]);
    },
  });

  const { mutate: mutateUpdateTheme } = useMutation({
    mutationFn: updateTheme,
    onSuccess: () => {
      queryClient.invalidateQueries(["themes"]);
    },
  });

  const { mutate: mutateDeleteTheme } = useMutation({
    mutationFn: deleteTheme,
    onSuccess: () => {
      queryClient.invalidateQueries(["themes"]);
    },
  });

  return {
    themes,
    isLoading,
    isError,
    error,
    mutateCreateTheme,
    mutateUpdateTheme,
    mutateDeleteTheme,
  };
};

export default useThemes;
