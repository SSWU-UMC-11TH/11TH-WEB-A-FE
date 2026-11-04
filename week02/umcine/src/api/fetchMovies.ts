// 순수 fetch 실습 기록용
import { env } from "../config/env";
import type { MovieListResponse } from "../types/movie";

export async function fetchPopularMovies(): Promise<MovieListResponse> {
  const response = await fetch(
    `${env.tmdbApiBaseUrl}/movie/popular?language=ko-KR&page=1`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${env.tmdbAccessToken}`,
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`TMDB API 요청 실패: ${response.status}`);
  }

  const data: MovieListResponse = await response.json();

  return data;
}
