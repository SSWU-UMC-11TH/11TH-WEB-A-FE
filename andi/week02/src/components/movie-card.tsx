import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="poster-wrapper">
        <img
          className="movie-poster"
          src={movie.posterPath}
          alt={movie.title}
        />

        <button
  className={`bookmark-button ${movie.isBookmarked ? "active" : ""}`}
  onClick={() => onToggleBookmark(movie.id)}
>
  <img
    src={
      movie.isBookmarked
        ? "/icons/bookmark.svg"
        : "/icons/bookmark-outline.svg"
    }
    alt="북마크"
  />
</button>
      </div>

      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-date">{movie.releaseDate}</p>
    </article>
  );
}

export default MovieCard;