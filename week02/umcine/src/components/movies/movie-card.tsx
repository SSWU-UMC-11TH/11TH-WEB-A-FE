import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="w-full">
      <div className="relative aspect-[241/274] w-full overflow-hidden rounded-lg">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          <img
            className="block h-full w-full object-cover"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </Link>

        <button
          className={cn(
            "absolute top-[7.5px] right-[6px] flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-white bg-[#17191e] p-0",
            movie.isBookmarked && "border-0 bg-[#2563eb]",
          )}
          type="button"
          onClick={() => onToggleBookmark(movie.id)}
          aria-label={movie.isBookmarked ? "북마크 해제" : "북마크 추가"}
        >
          <img
            className="block h-6 w-6 brightness-0 invert"
            src={
              movie.isBookmarked
                ? "/icons/bookmark.svg"
                : "/icons/bookmark-outline.svg"
            }
            alt=""
          />
        </button>
      </div>

      <Link
        to="/movies/$movieId"
        params={{ movieId: String(movie.id) }}
      >
        <h2 className="mt-[10px] mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-[1.4] font-extrabold">
          {movie.title}
        </h2>
      </Link>

      <p className="m-0 text-xs leading-[1.4] font-normal text-[#969DA8]">
        {movie.releaseDate}
      </p>
    </article>
  );
}
