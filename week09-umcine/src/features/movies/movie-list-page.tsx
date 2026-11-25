'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieGrid from '../../components/movies/movie-grid';
import { getMovies } from '../../api/movies/get-movies';
import { useAuthStore } from '../../stores/auth-store';
import { getFavorites } from '../../api/favorites/get-favorites';
import { useCreateFavoriteMutation } from '../../hooks/use-create-favorite-mutation';
import { useDeleteFavoriteMutation } from '../../hooks/use-delete-favorite-mutation';

export function MovieListPage() {
  const [page, setPage] = useState(1);

  const accessToken = useAuthStore((state) => state.accessToken);

  // 영화 목록 조회
  const moviesQuery = useQuery({
    queryKey: ['movies', 'list', { page }],
    queryFn: () => getMovies({ page }),
  });

  // 즐겨찾기 목록 조회
  const favoritesQuery = useQuery({
    queryKey: ['favorites', 'list'],
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
    retry: false,
  });
  console.log('즐겨찾기 조회 상태:', favoritesQuery.status);
  console.log('즐겨찾기 조회 오류:', favoritesQuery.error);
  console.log('즐겨찾기 데이터:', favoritesQuery.data);
  console.log('로그인 여부:', Boolean(accessToken));
  const bookmarkedMovieIds = accessToken
    ? (favoritesQuery.data ?? []).map((favorite) => favorite.movieId)
    : [];
  console.log('북마크 영화 ID:', bookmarkedMovieIds);
  // 즐겨찾기 등록 및 삭제
  const createFavoriteMutation = useCreateFavoriteMutation();
  const deleteFavoriteMutation = useDeleteFavoriteMutation();

  const isFavoritePending =
    createFavoriteMutation.isPending || deleteFavoriteMutation.isPending;

  const toggleBookmark = (movieId: number) => {
    console.log('클릭한 영화 ID:', movieId);
    console.log('기존 북마크 여부:', bookmarkedMovieIds.includes(movieId));
    if (!accessToken) {
      alert('로그인이 필요한 기능이에요.');
      return;
    }

    if (
      isFavoritePending ||
      favoritesQuery.isFetching ||
      !favoritesQuery.isSuccess
    ) {
      return;
    }

    if (bookmarkedMovieIds.includes(movieId)) {
      deleteFavoriteMutation.mutate(movieId);
    } else {
      createFavoriteMutation.mutate({ movieId });
    }
  };

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = moviesQuery.data?.total_pages ?? 0;

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 flex-col gap-5 px-20 pb-10 pt-6">
      <h1 className="text-[38px] font-bold text-[#17191e]">영화 목록</h1>
      {accessToken && favoritesQuery.isError && (
        <div className="mb-4 text-sm text-red-500">
          즐겨찾기 정보를 불러오지 못했습니다.
          <button
            type="button"
            onClick={() => favoritesQuery.refetch()}
            disabled={favoritesQuery.isFetching}
            className="ml-2 underline"
          >
            {favoritesQuery.isFetching ? '조회 중' : '다시 시도'}
          </button>
        </div>
      )}
      {moviesQuery.isRefetchError && (
        <p className="text-sm text-red-500">
          최신 영화 목록을 불러오지 못했습니다. 이전 영화 목록을 표시합니다.
        </p>
      )}

      {moviesQuery.isPending ? (
        <p>영화 목록을 불러오는 중이에요.</p>
      ) : moviesQuery.isError && !moviesQuery.data ? (
        <p className="text-red-500">{moviesQuery.error.message}</p>
      ) : movies.length === 0 ? (
        <p>조건에 맞는 영화가 없어요.</p>
      ) : (
        <>
          <MovieGrid
            movies={movies}
            bookmarkedMovieIds={bookmarkedMovieIds}
            onToggleBookmark={toggleBookmark}
          />

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
