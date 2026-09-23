import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="poster-wrapper">
        <img className="poster-img" src={movie.posterPath} alt={movie.title} />

        <button
          className={`bookmark-btn ${movie.isBookmarked ? 'bookmarked' : ''}`}
          onClick={() => onToggleBookmark(movie.id)}
          type="button"
        >
          <img
            src={
              movie.isBookmarked
                ? '/icons/bookmark.svg'
                : '/icons/bookmark-outline.svg'
            }
            alt={movie.isBookmarked ? '북마크 취소' : '북마크 추가'}
          />
        </button>
      </div>

      <h2>{movie.title}</h2>
      <p>{movie.releaseDate}</p>
    </article>
  );
}

export default MovieCard;
