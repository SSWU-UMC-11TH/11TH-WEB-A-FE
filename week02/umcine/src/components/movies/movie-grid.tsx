import type { Movie } from "../../types/movie";
import MovieCard from "./movie-card";
import { cn } from "../../utils/cn";

interface MovieGridProps {
  movies: Movie[];
  viewMode: "default" | "compact";
}

export default function MovieGrid({ movies, viewMode }: MovieGridProps) {
  return (
    <section
      className={cn(
        "grid w-full gap-x-[18px] gap-y-5",
        viewMode === "default"
          ? "grid-cols-1 min-[481px]:grid-cols-2 min-[769px]:grid-cols-3 min-[1025px]:grid-cols-5"
          : "grid-cols-2 min-[481px]:grid-cols-3 min-[769px]:grid-cols-4 min-[1025px]:grid-cols-6",
      )}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}
