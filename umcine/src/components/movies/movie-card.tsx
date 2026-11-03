import { cn } from '../../utils/cn';
import { Link } from '@tanstack/react-router';
import type { Movie } from '../../types/movie';
import { useBookmarkStore } from '../../stores/bookmark-store';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  const isBookmarked = bookmarkedMovieIds.includes(movie.id);

  return (
    <article className="w-full min-w-0">
      <div className="relative h-[274px] w-full overflow-hidden rounded-lg bg-[#eee]">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
          className="block h-full w-full"
        >
          <img
            className="block h-full w-full object-cover"
            src={movie.posterPath}
            alt={movie.title}
          />
        </Link>

        <button
          className={cn(
            'bookmark-btn absolute right-2 top-2 rounded-full p-2 text-white',
            isBookmarked ? 'bg-blue-600' : 'bg-black/60',
          )}
          onClick={() => toggleBookmark(movie.id)}
          type="button"
          aria-label={`${movie.title} 북마크`}
          aria-pressed={isBookmarked}
        >
          <img
            className="block h-6 w-6 brightness-0 invert"
            src={
              isBookmarked
                ? '/icons/bookmark.svg'
                : '/icons/bookmark-outline.svg'
            }
            alt=""
          />
        </button>
      </div>

      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        <h2 className="my-[5px] truncate text-sm font-semibold">
          {movie.title}
        </h2>
      </Link>

      <p className="m-0 text-xs font-normal text-[#969da8]">
        {movie.releaseDate}
      </p>
    </article>
  );
}

export default MovieCard;
