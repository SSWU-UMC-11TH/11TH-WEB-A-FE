import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createFavorite,
  deleteFavorite,
} from "../api/favorite";
import { favoriteQueries } from "../queries/favorite-queries";

export function useCreateFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFavorite,

    onSuccess: async (_, variables) => {
      const queryKey =
        favoriteQueries.status(variables.movieId).queryKey;

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData(
        queryKey,
        { isFavorite: true },
      );

      queryClient.invalidateQueries({
        queryKey: favoriteQueries.list().queryKey,
      });
    },

    onError: () => {
      alert("즐겨찾기 등록에 실패했어요.");
    },
  });
}

export function useDeleteFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavorite,

    onSuccess: async (_, movieId) => {
      const queryKey =
        favoriteQueries.status(movieId).queryKey;

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData(
        queryKey,
        { isFavorite: false },
      );

      queryClient.invalidateQueries({
        queryKey: favoriteQueries.list().queryKey,
      });
    },

    onError: () => {
      alert("즐겨찾기 삭제에 실패했어요.");
    },
  });
}