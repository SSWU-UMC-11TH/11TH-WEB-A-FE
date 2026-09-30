import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
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
          aria-label={movie.isBookmarked ? "북마크 해제" : "북마크 추가"}
          className={cn(
            "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md",
            movie.isBookmarked ? "bg-blue-600" : "bg-black/60"
          )}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            src={
              movie.isBookmarked
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