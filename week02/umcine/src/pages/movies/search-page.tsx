import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
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

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="min-h-[calc(100vh-91px)] bg-[#f7f8fa]">
      {!normalizedQuery ? (
        <section className="flex flex-col items-center px-5 pt-[165px]">
          <h1 className="mb-8 text-[46px] leading-[1.4] font-bold text-[#17191E]">
            어떤 영화를 찾고 있나요?
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex h-[74px] w-full max-w-[790px] items-center rounded-[12px] border-2 border-[#17191E] bg-white pr-[17px] pl-[21px] shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
          >
            <img src="/icons/search.svg" alt="" className="mr-4 h-6 w-6" />

            <input
              aria-label="검색어"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="예: 스파이더맨"
              className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#17191E] outline-none placeholder:text-[#969DA8]"
            />

            <button
              type="submit"
              className="h-[42px] rounded-[8px] bg-[#17191E] px-4 text-sm font-bold text-white"
            >
              검색
            </button>
          </form>
        </section>
      ) : (
        <section className="px-20 pt-6 pb-20">
          <h1 className="mb-[17px] text-[38px] leading-[1.4] font-bold text-[#17191E]">
            영화 검색
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex h-[54px] w-full items-center rounded-lg border border-[#E3E6EB] bg-white pr-[10px] pl-[15px]"
          >
            <img src="/icons/search.svg" alt="" className="mr-4 h-6 w-6" />

            <input
              aria-label="검색어"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="min-w-0 flex-1 border-0 bg-transparent text-sm font-bold text-[#17191E] outline-none"
            />

            <button
              type="button"
              aria-label="검색어 지우기"
              onClick={() => setSearchText("")}
              className="mr-4 flex h-[14px] w-[14px] items-center justify-center bg-transparent text-2xl text-[#606774]"
            >
              ×
            </button>

            <button
              type="submit"
              className="h-[42px] rounded-[8px] bg-[#17191E] px-4 text-sm font-bold text-white"
            >
              다시 검색
            </button>
          </form>

          <div className="mt-4 flex items-center justify-between border-b border-[#E3E6EB] pb-4">
            <h2 className="text-[18px] font-bold text-[#17191E]">
              ‘{query}’ 검색 결과
            </h2>

            <p className="text-[12px] text-[#969DA8]">
              영화 {searchResults.length}편 · 1페이지
            </p>
          </div>

          {searchResults.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-[#969DA8]">검색 결과가 없어요.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-x-10">
              {searchResults.map((movie) => (
                <li
                  key={movie.id}
                  className="flex min-h-[245px] gap-5 border-b border-[#E3E6EB] py-5"
                >
                  <div className="relative h-[190px] w-[126px] shrink-0">
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                    >
                      <img
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                        className="h-[190px] w-[126px] rounded-lg object-cover"
                      />
                    </Link>

                    <BookmarkButton movieId={movie.id} />
                  </div>

                  <div className="min-w-0 pt-1">
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="text-[#17191E] no-underline"
                    >
                      <h3 className="text-[18px] font-bold">{movie.title}</h3>
                    </Link>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-[#969DA8]">
                      <span>{movie.originalTitle}</span>
                      <span>{movie.releaseDate}</span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-[12px] leading-[1.7] text-[#606774]">
                      {movie.overview}
                    </p>

                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="mt-4 inline-block text-[12px] font-bold text-[#2563EB] no-underline"
                    >
                      상세 보기 →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
