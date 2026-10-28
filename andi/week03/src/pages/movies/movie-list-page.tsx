
import { useEffect, useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import { getMovies } from "../../api/movies/get-movies";
import { mapMovie } from "../../api/movies/movie-mapper";
import type { Movie } from "../../types/movie";

export function MovieListPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getMovies({ page: 1 });

        if (isActive) {
          setMovies(response.results.map(mapMovie));
        }
      } catch (error) {
        if (isActive) {
          setError(
            error instanceof Error
              ? error.message
              : "영화 목록을 불러오지 못했습니다.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="mx-auto max-w-[1280px] px-8 py-10">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">
          영화 목록
        </h1>

        {isLoading ? (
          <p className="text-gray-500">
            영화를 불러오는 중입니다...
          </p>
        ) : error ? (
          <p role="alert" className="text-red-500">
            {error}
          </p>
        ) : movies.length === 0 ? (
          <p className="text-gray-500">
            표시할 영화가 없습니다.
          </p>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    </main>
  );
}
