import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useState, type SubmitEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../../api/movies/search-movies';
import { useBookmarkStore } from '../../stores/bookmark-store';

export function SearchPage() {
  const { query } = useSearch({ from: '/search' });

  return <SearchPageContent key={query ?? ''} query={query ?? ''} />;
}

function SearchPageContent({ query }: { query: string }) {
  const navigate = useNavigate({ from: '/search' });

  // 검색창에 입력하는 텍스트
  const [searchText, setSearchText] = useState(query);

  // 실제 검색에 사용할 검색어
  const normalizedQuery = query.trim();

  // 6주차: useQuery로 검색 API 호출
  const searchQuery = useQuery({
    queryKey: ['movies', 'search', { query: normalizedQuery }],
    queryFn: () => searchMovies({ query: normalizedQuery }),
    enabled: normalizedQuery.length > 0,
  });

  const searchResults = searchQuery.data?.results ?? [];

  // 기존 북마크 기능 유지
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="mx-auto w-full max-w-[1440px] px-[24px] pb-[40px] pt-[32px] md:px-[80px]">
      <h1 className="mb-6 text-[38px]">영화 검색</h1>

      {/* 기존 검색창 디자인 유지 */}
      <form
        onSubmit={handleSubmit}
        className="flex h-[54px] w-full items-center gap-[17.5px] rounded-[9px] border border-[#E3E6EB] bg-white px-4 focus-within:border-[#17191E]"
      >
        <span className="text-lg text-[#969DA8]">⌕</span>

        <input
          aria-label="검색어"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm text-[#17191E] outline-none"
        />

        {searchText && (
          <button
            type="button"
            onClick={() => setSearchText('')}
            className="text-2xl text-[#969DA8]"
            aria-label="검색어 지우기"
          >
            <img src="/icons/close.svg" alt="" className="h-[14px] w-[14px]" />
          </button>
        )}

        <button
          type="submit"
          className="h-[36px] shrink-0 rounded-md bg-[#17191E] px-4 text-sm font-bold text-white"
        >
          {normalizedQuery ? '다시 검색' : '검색'}
        </button>
      </form>

      {/* 검색어가 없을 때 */}
      {!normalizedQuery ? (
        <p className="mt-5">검색어를 입력해 주세요.</p>
      ) : (
        <>
          <div className="mt-5 flex items-center justify-between border-b border-[#E3E6EB] pb-3">
            <h2 className="text-lg font-bold text-[#17191E]">
              ‘{query}’ 검색 결과
            </h2>

            <p className="text-[12px] text-[#969DA8]">
              영화 {searchQuery.data?.total_results ?? 0}편 · 1페이지
            </p>
          </div>

          {/* 로딩 / 오류 / 빈 결과 / 성공 */}
          {searchQuery.isLoading ? (
            <p className="mt-5">검색 결과를 불러오는 중이에요.</p>
          ) : searchQuery.isError ? (
            <p className="mt-5 text-red-500">{searchQuery.error.message}</p>
          ) : searchResults.length === 0 ? (
            <p className="mt-5">검색 결과가 없어요.</p>
          ) : (
            <ul className="mt-5 grid grid-cols-1 gap-x-[40px] gap-y-5 lg:grid-cols-2">
              {searchResults.map((movie) => {
                const isBookmarked = bookmarkedMovieIds.includes(movie.id);

                const posterUrl = movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : null;

                return (
                  <li
                    key={movie.id}
                    className="flex min-w-0 gap-4 border-b border-[#E3E6EB] pb-5"
                  >
                    {/* 영화 포스터 */}
                    {posterUrl && (
                      <img
                        src={posterUrl}
                        alt={`${movie.title} 포스터`}
                        className="h-[190px] w-[126px] shrink-0 rounded-lg object-cover"
                      />
                    )}

                    {/* 영화 정보 */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-[#17191E]">
                          {movie.title}
                        </h3>

                        <button
                          type="button"
                          onClick={() => toggleBookmark(movie.id)}
                          aria-label={`${movie.title} 북마크`}
                          aria-pressed={isBookmarked}
                        >
                          <img
                            src={
                              isBookmarked
                                ? '/icons/bookmark.svg'
                                : '/icons/bookmark-outline.svg'
                            }
                            alt=""
                            className="h-5 w-5"
                          />
                        </button>
                      </div>

                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-[#969DA8]">
                        <span>{movie.original_title}</span>
                        <span>{movie.release_date}</span>
                      </div>

                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#606774]">
                        {movie.overview}
                      </p>

                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                        className="mt-3 text-xs font-bold text-[#2563EB]"
                      >
                        상세 보기 →
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
