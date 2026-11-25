import { queryOptions } from "@tanstack/react-query";
import {
  getFavorites,
  getFavoriteStatus,
} from "../api/favorite";

export const favoriteQueries = {
  list: () =>
    queryOptions({
      queryKey: ["favorites", "list"],
      queryFn: getFavorites,
      staleTime: 30 * 1000,
    }),

  status: (movieId: number) =>
    queryOptions({
      queryKey: ["favorites", "status", movieId],
      queryFn: () => getFavoriteStatus(movieId),
      staleTime: 30 * 1000,
    }),
};