import { useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";

export function MovieListPage() {
  const [movies, setMovies] = useState(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <main className="w-full bg-[#f7f8fa] px-5 py-5 min-[481px]:px-8 min-[481px]:py-6 min-[769px]:px-20 min-[769px]:pb-20">
      <h1 className="mb-6 text-[38px] leading-[1.4] font-bold text-[#17191E]">
        영화 목록
      </h1>

      <MovieGrid
        movies={movies}
        onToggleBookmark={handleToggleBookmark}
      />

      <Pagination />
    </main>
  );
}