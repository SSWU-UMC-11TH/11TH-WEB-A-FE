
import type { Movie } from "../../types/movie";
import type {
  TmdbMovieDetail,
  TmdbMovieListItem,
} from "./models";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const genreNames: Record<number, string> = {
  28: "액션",
  12: "모험",
  16: "애니메이션",
  35: "코미디",
  80: "범죄",
  99: "다큐멘터리",
  18: "드라마",
  10751: "가족",
  14: "판타지",
  36: "역사",
  27: "공포",
  10402: "음악",
  9648: "미스터리",
  10749: "로맨스",
  878: "SF",
  10770: "TV 영화",
  53: "스릴러",
  10752: "전쟁",
  37: "서부",
};

function getImageUrl(
  path: string | null,
  size: string,
): string {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : "";
}

function formatDate(date: string): string {
  return date.replaceAll("-", ".");
}

function mapMovie(movie: TmdbMovieListItem): Movie {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: formatDate(movie.release_date),
    posterPath: getImageUrl(movie.poster_path, "w500"),
    backdropPath: getImageUrl(movie.backdrop_path, "w1280"),
    genres: movie.genre_ids.map(
      (id) => genreNames[id] ?? "기타",
    ),
    runtime: "",
    tagline: "",
    overview: movie.overview,
    isBookmarked: false,
  };
}

function mapMovieDetail(movie: TmdbMovieDetail): Movie {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: formatDate(movie.release_date),
    posterPath: getImageUrl(movie.poster_path, "w500"),
    backdropPath: getImageUrl(movie.backdrop_path, "w1280"),
    genres: movie.genres.map((genre) => genre.name),
    runtime: movie.runtime
      ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
      : "상영 시간 정보 없음",
    tagline: movie.tagline,
    overview: movie.overview,
    isBookmarked: false,
  };
}

export { mapMovie, mapMovieDetail };
