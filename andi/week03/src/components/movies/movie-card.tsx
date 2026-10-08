import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import BookmarkButton from "./bookmark-button";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
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

        <BookmarkButton movieId={movie.id} variant="card" />
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