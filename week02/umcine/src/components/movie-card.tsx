import type { Movie } from '../types/movie';
import '../styles/movie-card.css';

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({
  movie,
  onToggleBookmark,
}: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrapper">
        <img
          className="movie-card__poster"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
        />

        <button
  className={`movie-card__bookmark ${
    movie.isBookmarked ? 'movie-card__bookmark--active' : ''
  }`}
  type="button"
  onClick={() => onToggleBookmark(movie.id)}
  aria-label={movie.isBookmarked ? '북마크 해제' : '북마크 추가'}
>
  <img
    src={
      movie.isBookmarked
        ? '/icons/bookmark.svg'
        : '/icons/bookmark-outline.svg'
    }
    alt=""
  />
</button>
      </div>

      <h2 className="movie-card__title">{movie.title}</h2>
      <p className="movie-card__date">{movie.releaseDate}</p>
    </article>
  );
}
