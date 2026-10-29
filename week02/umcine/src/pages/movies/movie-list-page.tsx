import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import { getPopularMovies } from "../../api/movies";
import { toMovie } from "../../api/movie-adapter";
import { cn } from "../../utils/cn";

export function MovieListPage() {
  const [viewMode, setViewMode] = useState<"default" | "compact">(() => {
    const savedViewMode = localStorage.getItem("umcine-view-mode");

    return savedViewMode === "compact" ? "compact" : "default";
  });

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getPopularMovies(page);

        if (!cancelled) {
          setMovies(response.results.map(toMovie));
          setTotalPages(response.total_pages);
        }
      } catch (error) {
        console.error("영화 목록 조회 실패:", error);

        if (!cancelled) {
          setError("영화 목록을 불러오지 못했어요.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      cancelled = true;
    };
  }, [page]);

  function handleViewModeChange(nextViewMode: "default" | "compact") {
    setViewMode(nextViewMode);
    localStorage.setItem("umcine-view-mode", nextViewMode);
  }

  return (
    <main className="w-full bg-[#f7f8fa] px-5 py-5 min-[481px]:px-8 min-[481px]:py-6 min-[769px]:px-20 min-[769px]:pb-20">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[38px] leading-[1.4] font-bold text-[#17191E]">
          영화 목록
        </h1>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleViewModeChange("default")}
            className={cn(
              "rounded-lg border border-[#E3E6EB] bg-white px-3 py-2 text-sm",
              viewMode === "default" && "bg-[#17191E] text-white",
            )}
          >
            기본 보기
          </button>

          <button
            type="button"
            onClick={() => handleViewModeChange("compact")}
            className={cn(
              "rounded-lg border border-[#E3E6EB] bg-white px-3 py-2 text-sm",
              viewMode === "compact" && "bg-[#17191E] text-white",
            )}
          >
            작게 보기
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>영화 목록을 불러오는 중이에요...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <MovieGrid movies={movies} viewMode={viewMode} />
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </main>
  );
}
