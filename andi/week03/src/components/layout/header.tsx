import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

export function Header() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isMoviesActive =
    pathname === "/" || pathname.startsWith("/movies/");

  const isSearchActive = pathname === "/search";

  const menuClass = (isActive: boolean) =>
    cn(
      "border-b-2 pb-1 text-sm no-underline transition-colors",
      isActive
        ? "border-gray-900 font-semibold text-gray-900"
        : "border-transparent font-medium text-gray-500"
    );

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-8">
        <div className="flex items-center gap-9">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-900 no-underline"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[7px] border-2 border-gray-900">
              <img
                src="/icons/movie.svg"
                alt=""
                className="h-5 w-5"
              />
            </span>

            <span className="text-[17px] font-extrabold tracking-[-0.03em]">
              UMCine
            </span>
          </Link>

          <nav className="flex items-center gap-7">
            <Link
              to="/"
              className={menuClass(isMoviesActive)}
            >
              영화
            </Link>

            <Link
              to="/search"
              search={{}}
              className={menuClass(isSearchActive)}
            >
              검색
            </Link>

            <span className="border-b-2 border-transparent pb-1 text-sm font-medium text-gray-500">
              내 정보
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/search"
            search={{}}
            aria-label="영화 검색"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200"
          >
            <img
              src="/icons/search.svg"
              alt=""
              className="h-4 w-4"
            />
          </Link>

          <button
            type="button"
            className="h-9 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}