import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  useQueryClient,
  useQuery,
  useQueries,
} from "@tanstack/react-query";
import { useMeQuery } from "../hooks/use-me-query";
import { useAuthStore } from "../stores/auth-store";
import { favoriteQueries } from "../queries/favorite-queries";
import { movieQueries } from "../queries/movie-queries";
import { toMovieDetail } from "../api/movie-adapter";

export function MyPage() {
  const meQuery = useMeQuery();
  const member = meQuery.data;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  // 내 즐겨찾기 목록 조회
  const favoritesQuery = useQuery({
    ...favoriteQueries.list(),
    enabled: Boolean(accessToken),
  });

  const favorites = favoritesQuery.data ?? [];

  // 페이지네이션
  const totalPages = Math.max(
    1,
    Math.ceil(favorites.length / pageSize),
  );

  const page = Math.min(currentPage, totalPages);

  const currentFavorites = favorites.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // 현재 페이지의 영화 상세 정보 병렬 조회
  const favoriteMovieQueries = useQueries({
    queries: currentFavorites.map((favorite) =>
      movieQueries.detail(favorite.movieId),
    ),
  });

  const paginatedFavorites = favoriteMovieQueries.flatMap(
    (query) =>
      query.data ? [toMovieDetail(query.data)] : [],
  );

  const isFavoritesLoading =
    favoritesQuery.isLoading ||
    favoriteMovieQueries.some((query) => query.isPending);

  const isFavoritesError =
    favoritesQuery.isError ||
    favoriteMovieQueries.some((query) => query.isError);

  function handleLogout() {
    setAccessToken(null);
    queryClient.clear();

    navigate({ to: "/login" });
  }

  if (meQuery.isLoading) {
    return (
      <div className="py-20 text-center text-sm text-gray-500">
        내 정보를 불러오는 중입니다...
      </div>
    );
  }

  if (meQuery.isError) {
    return (
      <div className="py-20 text-center text-sm text-red-500">
        내 정보를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-91px)] bg-[#F7F8FA] px-5 py-8 md:px-10 lg:px-20">
      <div className="mx-auto max-w-[1200px]">
        {/* 제목 */}
        <div className="mb-[28px] flex items-center justify-between">
          <h1 className="text-[31px] font-bold text-[#17191E]">
            내 정보
          </h1>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="h-[42px] rounded-lg border border-[#E3E6EB] bg-white px-4 text-sm font-bold text-[#606774]"
            >
              로그아웃
            </button>

            <Link
              to="/mypage/edit"
              className="flex h-[42px] items-center justify-center rounded-lg bg-[#2563EB] px-4 text-sm font-extrabold text-white no-underline"
            >
              정보 수정
            </Link>
          </div>
        </div>

        {/* 기본 정보 */}
        <section className="border-t border-[#E3E6EB] py-4">
          <h2 className="mb-4 text-[17px] font-bold text-[#17191E]">
            기본 정보
          </h2>

          <div className="flex flex-wrap items-center gap-[28px] border-b border-[#E3E6EB] pb-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#E3E6EB]">
              <img
                src="/images/default-profile.png"
                alt="프로필 이미지"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>

            <div className="min-w-[150px]">
              <p className="mb-1 text-[11px] text-[#969DA8]">
                닉네임
              </p>
              <p className="text-sm font-bold text-[#17191E]">
                {member?.nickname ?? "-"}
              </p>
            </div>

            <div className="min-w-[180px]">
              <p className="mb-1 text-xs text-[#969DA8]">
                이메일
              </p>
              <p className="text-sm font-bold text-[#17191E]">
                {member?.email ?? "-"}
              </p>
            </div>
          </div>
        </section>

        {/* 즐겨찾기 */}
        <section className="pt-3">
          <h2 className="mb-4 text-[17px] font-bold text-[#17191E]">
            내 즐겨찾기
          </h2>

          {isFavoritesLoading ? (
            <p className="py-10 text-center text-sm text-gray-500">
              즐겨찾기를 불러오는 중이에요...
            </p>
          ) : isFavoritesError ? (
            <p className="py-10 text-center text-sm text-red-500">
              즐겨찾기를 불러오지 못했어요.
            </p>
          ) : favorites.length === 0 ? (
            <p className="py-10 text-center text-sm text-gray-500">
              등록된 즐겨찾기가 없어요.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {paginatedFavorites.map((movie) => (
                <Link
                  key={movie.id}
                  to="/movies/$movieId"
                  params={{ movieId: String(movie.id) }}
                  className="min-w-0 no-underline"
                >
                  <div className="aspect-[0.87] overflow-hidden rounded-lg bg-[#E3E6EB]">
                    {movie.posterPath ? (
                      <img
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-500">
                        포스터 없음
                      </div>
                    )}
                  </div>

                  <h3 className="mt-2 truncate text-sm font-bold text-[#17191E]">
                    {movie.title}
                  </h3>

                  <p className="mt-1 text-xs text-[#969DA8]">
                    {movie.releaseDate}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {/* 페이지네이션 */}
          {favorites.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="이전 페이지"
                disabled={page === 1}
                onClick={() => setCurrentPage(page - 1)}
                className="px-2 text-lg text-[#2563EB] disabled:opacity-30"
              >
                ‹
              </button>

              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#17191E] text-sm font-bold text-white">
                {page}
              </span>

              <button
                type="button"
                aria-label="다음 페이지"
                disabled={page === totalPages}
                onClick={() => setCurrentPage(page + 1)}
                className="px-2 text-lg text-[#2563EB] disabled:opacity-30"
              >
                ›
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}