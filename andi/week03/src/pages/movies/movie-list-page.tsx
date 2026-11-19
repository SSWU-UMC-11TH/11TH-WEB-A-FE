
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { getMovies } from "../../api/movies/get-movies";
import { mapMovie } from "../../api/movies/movie-mapper";

export function MovieListPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page: currentPage }],
    queryFn: () => getMovies({ page: currentPage }),
  });

  const movies = moviesQuery.data?.results.map(mapMovie) ?? [];
  const totalPages = Math.min(moviesQuery.data?.total_pages ?? 1, 500);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="mx-auto max-w-[1280px] px-8 py-10">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">
          영화 목록
        </h1>

        {moviesQuery.isPending ? (
          <p className="text-gray-500">
            영화를 불러오는 중입니다...
          </p>
        ) : moviesQuery.isError ? (
          <p role="alert" className="text-red-500">
            {moviesQuery.error.message}
          </p>
        ) : movies.length === 0 ? (
          <p className="text-gray-500">
            표시할 영화가 없습니다.
          </p>
        ) : (
          <>
            <MovieGrid movies={movies} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </main>
  );
}
