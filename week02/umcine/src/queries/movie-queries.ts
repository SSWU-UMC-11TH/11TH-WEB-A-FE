import { queryOptions } from "@tanstack/react-query";
import {
  getPopularMovies,
  searchMovies,
  getMovieDetail,
} from "../api/movies";

export const movieQueries = {
  // 영화 목록
  list: (page: number) =>
    queryOptions({
      queryKey: ["movies", "list", { page }],
      queryFn: () => getPopularMovies(page),
    }),

  // 영화 검색
  search: (query: string) =>
    queryOptions({
      queryKey: ["movies", "search", { query }],
      queryFn: () => searchMovies(query),
      enabled: query.length > 0,
    }),

  // 영화 상세
  detail: (movieId: number) =>
    queryOptions({
      queryKey: ["movies", "detail", movieId],
      queryFn: () => getMovieDetail(movieId),
      enabled: Number.isInteger(movieId) && movieId > 0,
      staleTime: 30 * 1000,
    }),
};