import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";
import { useBookmarkStore } from "../../stores/bookmark-store";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movie.id)
  );

  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark
  );

  return (
    <article>
      <div className="relative overflow-hidden rounded-lg bg-gray-200">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
          className="block"
        >
          <img
            className="aspect-[2/3] w-full object-cover"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </Link>

        <button
          type="button"
          aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
          className={cn(
            "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md",
            isBookmarked ? "bg-blue-600" : "bg-black/60"
          )}
          onClick={() => toggleBookmark(movie.id)}
        >
          <img
            src={
              isBookmarked
                ? "/icons/bookmark.svg"
                : "/icons/bookmark-outline.svg"
            }
            alt=""
            className="h-5 w-5 brightness-0 invert"
          />
        </button>
      </div>

      <h2 className="mt-3 truncate text-base font-semibold text-gray-900">
        {movie.title}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {movie.releaseDate}
      </p>
    </article>
  );
}

export default MovieCard;