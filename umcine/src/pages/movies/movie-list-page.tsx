import { useState } from 'react';
import MovieGrid from '../../components/movies/movie-grid';
import { movies as initialMovies } from '../../data/movies';
import type { Movie } from '../../types/movie';

export function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

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
    <>
      <main className="mx-auto w-full max-w-[1440px] flex-1 flex-col gap-5 px-20 pb-10 pt-6 ">
        <h1 className="text-[38px] font-bold text-[#17191e]">영화 목록</h1>

        <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
      </main>
    </>
  );
}
