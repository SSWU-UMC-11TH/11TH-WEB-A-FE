"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/auth-store";
import { cn } from "../../utils/cn";

export function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const pathname = usePathname();

  const isMoviesActive =
    pathname === "/" || pathname.startsWith("/movies/");
  const isSearchActive = pathname === "/search";
  const isMyPageActive = pathname.startsWith("/mypage");

  const menuClass = (isActive: boolean) =>
    cn(
      "border-b-2 pb-1 text-sm no-underline transition-colors",
      isActive
        ? "border-gray-900 font-semibold text-gray-900"
        : "border-transparent font-medium text-gray-500"
    );

  const handleLogout = () => {
    setAccessToken(null);
    queryClient.clear();

    router.push("/");
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-8">
        <div className="flex items-center gap-9">
          <Link
            href="/"
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
            <Link href="/" className={menuClass(isMoviesActive)}>
              영화
            </Link>
            <Link
              href="/search"
              className={menuClass(isSearchActive)}
            >
              검색
            </Link>
            <Link
              href="/mypage"
              className={menuClass(isMyPageActive)}
            >
              내 정보
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            aria-label="영화 검색"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200"
          >
            <img
              src="/icons/search.svg"
              alt=""
              className="h-4 w-4"
            />
          </Link>

          {accessToken ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-9 items-center rounded-md border border-gray-200 px-4 text-sm font-semibold text-gray-700"
            >
              로그아웃
            </button>
          ) : (
            <Link
              href="/login"
              className="flex h-9 items-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white no-underline"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}