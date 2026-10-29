import MovieGrid from "../../components/movies/movie-grid";
import { movies } from "../../data/movies";

export function MovieListPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="mx-auto max-w-[1280px] px-8 py-10">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">
          영화 목록
        </h1>

        <MovieGrid movies={movies} />
      </div>
    </main>
  );
}