import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { movies } from "../../data/movies";
import { useBookmarkStore } from "../../stores/bookmark-store";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });

  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds
  );
  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark
  );

  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";

  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  function handleResetSearch() {
    setSearchText("");

    navigate({
      search: {},
    });
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="mx-auto max-w-[1280px] px-8 py-10">
        {normalizedQuery ? (
          <>
            {/* 검색 결과 화면 */}
            <h1 className="mb-7 text-2xl font-bold text-gray-900">
              영화 검색
            </h1>

            <form
              onSubmit={handleSubmit}
              className="flex w-full items-center rounded-lg border border-gray-400 bg-white p-1"
            >
              <img
                src="/icons/search.svg"
                alt=""
                aria-hidden="true"
                className="ml-3 h-5 w-5"
              />

              <input
                type="text"
                aria-label="검색어"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none"
                placeholder="예: 스파이더맨"
              />

              <button
                type="button"
                aria-label="검색어 지우기"
                onClick={handleResetSearch}
                className="flex h-10 w-10 items-center justify-center text-2xl text-gray-500"
              >
                ×
              </button>

              <button
                type="submit"
                className="h-10 rounded-md bg-gray-900 px-5 text-sm font-semibold text-white"
              >
                다시 검색
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between border-b border-gray-200 pb-5">
              <h2 className="text-lg font-bold text-gray-900">
                ‘{query}’ 검색 결과
              </h2>

              <p className="text-sm text-gray-400">
                영화 {searchResults.length}편 · 1페이지
              </p>
            </div>

            {searchResults.length === 0 ? (
              <div className="flex min-h-[360px] items-center justify-center">
                <p className="text-base text-gray-500">
                  검색 결과가 없어요.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-14">
                {searchResults.map((movie) => {
                  const isBookmarked = bookmarkedMovieIds.includes(movie.id);

                  return (
                    <article
                      key={movie.id}
                      className="flex gap-5 border-b border-gray-200 py-7"
                    >
                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                        className="shrink-0"
                      >
                        <img
                          src={movie.posterPath}
                          alt={`${movie.title} 포스터`}
                          className="h-44 w-28 rounded-lg object-cover"
                        />
                      </Link>

                      <div className="min-w-0 flex-1 py-1">
                        <h3 className="text-base font-bold text-gray-900">
                          {movie.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-400">
                          {movie.originalTitle} · {movie.releaseDate}
                        </p>

                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                          {movie.overview}
                        </p>

                        <Link
                          to="/movies/$movieId"
                          params={{ movieId: String(movie.id) }}
                          className="mt-3 inline-block text-sm font-semibold text-blue-600"
                        >
                          상세 보기 →
                        </Link>

                        <button
                          type="button"
                          onClick={() => toggleBookmark(movie.id)}
                          className="ml-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600"
                        >
                          <img
                            src={
                              isBookmarked
                                ? "/icons/bookmark.svg"
                                : "/icons/bookmark-outline.svg"
                            }
                            alt=""
                            aria-hidden="true"
                            className="h-4 w-4"
                          />
                          {isBookmarked ? "북마크 해제" : "북마크 추가"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* 검색 전 화면 */
          <div className="flex min-h-[600px] flex-col items-center justify-center">
            <h1 className="mb-10 text-2xl font-bold text-gray-900">
              어떤 영화를 찾고 있나요?
            </h1>

            <form
              onSubmit={handleSubmit}
              className="flex w-full items-center rounded-lg border border-gray-500 bg-white p-1 shadow-md"
            >
              <img
                src="/icons/search.svg"
                alt=""
                aria-hidden="true"
                className="ml-3 h-5 w-5"
              />

              <input
                type="text"
                aria-label="검색어"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="예: 스파이더맨"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />

              <button
                type="submit"
                className="h-10 rounded-md bg-gray-900 px-6 text-sm font-semibold text-white"
              >
                검색
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}