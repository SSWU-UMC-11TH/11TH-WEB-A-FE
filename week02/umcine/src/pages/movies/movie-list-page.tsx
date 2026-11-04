import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { toMovie } from "../../api/movie-adapter";
import { cn } from "../../utils/cn";
import { movieQueries } from "../../queries/movie-queries";

const VIEW_MODE_KEY = "umcine-view-mode";

function readViewMode(): "default" | "compact" {
  try {
    return localStorage.getItem(VIEW_MODE_KEY) === "compact"
      ? "compact"
      : "default";
  } catch {
    console.warn("보기 설정을 읽을 수 없습니다.");
    return "default";
  }
}

function saveViewMode(mode: "default" | "compact") {
  try {
    localStorage.setItem(VIEW_MODE_KEY, mode);
  } catch {
    console.warn("보기 설정을 저장하지 못했습니다.");
  }
}

export function MovieListPage() {
  // 보기모드는 localStorage로 관리
  const [viewMode, setViewMode] = useState<"default" | "compact">(readViewMode);
  const [page, setPage] = useState(1);

  const moviesQuery = useQuery(movieQueries.list(page));

  const movies = moviesQuery.data?.results.map(toMovie) ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  function handleViewModeChange(nextViewMode: "default" | "compact") {
    setViewMode(nextViewMode);
    saveViewMode(nextViewMode);
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

      {moviesQuery.isPending ? (
        <p>영화 목록을 불러오는 중이에요...</p>
      ) : moviesQuery.isError ? (
        <p role="alert" className="text-red-500">
          영화 목록을 불러오지 못했어요.
        </p>
      ) : movies.length === 0 ? (
        <p className="py-20 text-center text-gray-500">
          표시할 영화가 없어요.
        </p>
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
