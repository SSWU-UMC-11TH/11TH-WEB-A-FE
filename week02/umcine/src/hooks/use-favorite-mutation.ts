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

    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        favoriteQueries.status(variables.movieId).queryKey,
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

    onSuccess: (_, movieId) => {
      queryClient.setQueryData(
        favoriteQueries.status(movieId).queryKey,
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