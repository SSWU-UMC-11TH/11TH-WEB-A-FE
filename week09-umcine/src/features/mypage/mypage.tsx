'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getMe } from '../../api/members/me';
import { useAuthStore } from '../../stores/auth-store';
import { getFavorites } from '../../api/favorites/get-favorites';
import { getMovieDetail } from '../../api/movies/get-movie-detail';

export function MyPage() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const meQuery = useQuery({
    queryKey: ['members', 'me'],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const favoritesQuery = useQuery({
    queryKey: ['favorites', 'list'],
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
    retry: false,
  });

  const favorites = favoritesQuery.data ?? [];
  const favoriteMovieQueries = useQueries({
    queries: favorites.map((favorite) => ({
      queryKey: ['movies', 'detail', favorite.movieId],
      queryFn: () => getMovieDetail(favorite.movieId),
    })),
  });

  const favoriteMovies = favoriteMovieQueries.flatMap((query) =>
    query.data ? [query.data] : [],
  );
  const retryFavoriteMovies = () => {
    favoriteMovieQueries.forEach((query) => {
      if (query.isError && !query.isFetching) {
        void query.refetch();
      }
    });
  };
  const isFavoriteMoviesLoading = favoriteMovieQueries.some(
    (query) => query.isFetching,
  );

  const isFavoriteMoviesError = favoriteMovieQueries.some(
    (query) => query.isError,
  );
  const user = meQuery.data;

  if (!accessToken) {
    return <p>로그인이 필요합니다.</p>;
  }

  if (meQuery.isLoading) {
    return <p>회원 정보를 불러오는 중이에요.</p>;
  }

  if (!user) {
    return <p>회원 정보를 불러오지 못했습니다.</p>;
  }

  return (
    <div className="min-h-[calc(100vh-91px)] bg-[#F7F8FA]">
      <main className="mx-auto w-full max-w-[1280px] px-[42px] py-8">
        {/* 페이지 제목 */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-[24px] font-bold text-[#17191E]">내 정보</h1>

          <Link
            href="/mypage/edit"
            className="rounded-[6px] bg-[#2563EB] px-5 py-2 text-[14px] font-semibold text-white no-underline hover:bg-blue-700"
          >
            정보 수정
          </Link>
        </div>

        {/* 기본 정보 */}
        <section className="border-t border-[#E5E7EB] py-5">
          <h2 className="mb-5 text-[16px] font-bold text-[#17191E]">
            기본 정보
          </h2>

          <div className="flex items-center gap-8 border-b border-[#E5E7EB] pb-6">
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-[#E5E7EB]">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-[#17191E]"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-2a8 8 0 0 1 16 0v2H4z" />
              </svg>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-6">
              <div>
                <p className="mb-2 text-[13px] text-[#969DA8]">닉네임</p>
                <p className="text-[15px] font-semibold text-[#17191E]">
                  {user.nickname}
                </p>
              </div>

              <div>
                <p className="mb-2 text-[13px] text-[#969DA8]">이메일</p>
                <p className="text-[15px] font-semibold text-[#17191E]">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 내 즐겨찾기 */}
        <section className="mt-2">
          <h2 className="mb-5 text-[16px] font-bold text-[#17191E]">
            내 즐겨찾기
          </h2>
          {favoritesQuery.isLoading && <p>즐겨찾기를 불러오는 중이에요.</p>}

          {favoritesQuery.isError && (
            <p className="text-red-500">즐겨찾기를 불러오지 못했어요.</p>
          )}

          {favoritesQuery.isSuccess && favorites.length === 0 && (
            <p className="text-gray-500">등록된 즐겨찾기가 없어요.</p>
          )}
          {isFavoriteMoviesLoading && (
            <p className="mb-3 text-sm">
              즐겨찾기 영화 정보를 불러오는 중이에요.
            </p>
          )}

          {/* 영화 상세 조회 실패 */}
          {isFavoriteMoviesError && (
            <div className="mb-3 text-sm text-red-500">
              일부 영화 정보를 불러오지 못했습니다.
              <button
                type="button"
                onClick={retryFavoriteMovies}
                className="ml-2 underline"
              >
                다시 시도
              </button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {favoriteMovies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="no-underline"
              >
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : '/images/no-poster.png'
                  }
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="aspect-[2/3] h-auto w-full rounded-[10px] object-cover"
                />

                <p className="mt-2 text-[14px] font-semibold text-[#17191E]">
                  {movie.title}
                </p>

                <p className="mt-1 text-[12px] text-[#969DA8]">
                  {movie.release_date}
                </p>
              </Link>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button type="button" disabled className="text-[#CBD5E1]">
              &lt;
            </button>

            <span className="rounded-[6px] bg-[#17191E] px-3 py-2 text-[14px] font-semibold text-white">
              1
            </span>

            <button type="button" disabled className="text-[#CBD5E1]">
              &gt;
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
