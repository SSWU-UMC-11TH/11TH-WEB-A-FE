import ky from "ky";
import type { MovieListResponse, TmdbMovieDetail } from "../types/movie";

// 인기 영화 목록
export async function getPopularMovies(page = 1) {
  return ky
    .get("/api/movies", {
      searchParams: {
        type: "popular",
        page,
      },
    })
    .json<MovieListResponse>();
}

// 영화 검색
export async function searchMovies(query: string, page = 1) {
  return ky
    .get("/api/movies", {
      searchParams: {
        type: "search",
        query,
        page,
      },
    })
    .json<MovieListResponse>();
}

// 영화 상세 조회
export async function getMovieDetail(movieId: number) {
  return ky
    .get("/api/movies", {
      searchParams: {
        type: "detail",
        movieId,
      },
    })
    .json<TmdbMovieDetail>();
}