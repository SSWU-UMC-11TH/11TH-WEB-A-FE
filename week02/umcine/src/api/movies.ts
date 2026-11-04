import type { MovieListResponse, TmdbMovieDetail } from "../types/movie";
import { tmdb } from "./tmdb";

// 인기 영화 목록
export async function getPopularMovies(page = 1) {
  return tmdb
    .get("movie/popular", {
      searchParams: {
        language: "ko-KR",
        page,
      },
    })
    .json<MovieListResponse>();
}

// 영화 검색
export async function searchMovies(query: string, page = 1) {
  return tmdb
    .get("search/movie", {
      searchParams: {
        query,
        language: "ko-KR",
        page,
      },
    })
    .json<MovieListResponse>();
}

// 영화 상세 조회
export async function getMovieDetail(movieId: number) {
  return tmdb
    .get(`movie/${movieId}`, {
      searchParams: {
        language: "ko-KR",
      },
    })
    .json<TmdbMovieDetail>();
}
