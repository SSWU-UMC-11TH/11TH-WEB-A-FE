import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies } from "../../data/movies";
import { useState } from "react";
import { cn } from "../../utils/cn";

export function MovieListPage() {
  const [viewMode, setViewMode] = useState<"default" | "compact">(() => {
    const savedViewMode = localStorage.getItem("umcine-view-mode");

    return savedViewMode === "compact" ? "compact" : "default";
  });

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

      <MovieGrid movies={movies} viewMode={viewMode} />

      <Pagination />
    </main>
  );
}
