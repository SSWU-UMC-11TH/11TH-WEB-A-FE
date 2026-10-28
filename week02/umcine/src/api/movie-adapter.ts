import type { Movie } from "../types/movie";
import type { TmdbMovie, TmdbMovieDetail } from "../types/movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

export function toMovie(movie: TmdbMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date?.replaceAll("-", ".") ?? "",
    posterPath: movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : "",
    backdropPath: movie.backdrop_path
      ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
      : "",
    genres: [],
    runtime: "",
    tagline: "",
    overview: movie.overview,
    isBookmarked: false,
  };
}

export function toMovieDetail(movie: TmdbMovieDetail): Movie {
  const baseMovie = toMovie(movie);

  return {
    ...baseMovie,
    genres: movie.genres.map((genre) => genre.name),
    runtime: movie.runtime
      ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
      : "",
    tagline: movie.tagline,
  };
}
