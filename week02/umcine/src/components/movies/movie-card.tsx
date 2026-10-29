import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
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

        <BookmarkButton movieId={movie.id} />
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
