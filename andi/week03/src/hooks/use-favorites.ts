
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth-store";
import {
  addFavorite,
  deleteFavorite,
  getFavorites,
  getFavoriteStatus,
} from "../api/favorites";

export function useFavorites() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
    retry: false,
  });
}

export function useFavoriteStatus(movieId: number) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["favorites", movieId],
    queryFn: () => getFavoriteStatus(movieId),
    enabled: Boolean(accessToken) && movieId > 0,
    retry: false,
  });
}

export function useFavoriteMutation(movieId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isFavorite: boolean): Promise<void> => {
      if (isFavorite) {
        await deleteFavorite(movieId);
      } else {
        await addFavorite(movieId);
      }
    },

    onSuccess: async (_, wasFavorite) => {
      await queryClient.cancelQueries({
        queryKey: ["favorites", movieId],
        exact: true,
      });

      queryClient.setQueryData(
        ["favorites", movieId],
        !wasFavorite,
      );

      await queryClient.invalidateQueries({
        queryKey: ["favorites"],
        exact: true,
      });
    },

    onError: () => {
      alert("즐겨찾기 변경에 실패했습니다.");
    },
  });
}
