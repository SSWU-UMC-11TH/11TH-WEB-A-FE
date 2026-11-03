import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieGrid from '../../components/movies/movie-grid';
import { useBookmarkStore } from '../../stores/bookmark-store';
import { getMovies } from '../../api/movies/get-movies';

export function MovieListPage() {
  // 1. 현재 페이지 상태
  const [page, setPage] = useState(1);

  // 2. 기존 북마크 기능 유지
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  // 3. TanStack Query로 영화 목록 요청
  const moviesQuery = useQuery({
    queryKey: ['movies', 'list', { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 flex-col gap-5 px-20 pb-10 pt-6">
      <h1 className="text-[38px] font-bold text-[#17191e]">영화 목록</h1>

      {moviesQuery.isPending ? (
        <p>영화 목록을 불러오는 중이에요.</p>
      ) : moviesQuery.isError ? (
        <p className="text-red-500">{moviesQuery.error.message}</p>
      ) : movies.length === 0 ? (
        <p>조건에 맞는 영화가 없어요.</p>
      ) : (
        <>
          <MovieGrid movies={movies} onToggleBookmark={toggleBookmark} />

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                이전
              </button>

              <span>
                {page} / {totalPages}
              </span>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
