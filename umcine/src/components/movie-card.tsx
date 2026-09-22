import type { Movie } from '../types/movie';

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
          className={'bookmark-button'}
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
    </article>
  );
}
export default MovieCard;
