"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthStore } from "../../stores/auth-store";

export default function Header() {
  const pathname = usePathname();
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const meQuery = useMeQuery();

  const navItems = [
    { href: "/", label: "영화" },
    { href: "/search", label: "검색" },
    { href: "/mypage", label: "내 정보" },
  ];

  return (
    <header className="h-[91px] w-full border-b border-[#E3E6EB] bg-white">
      <div className="flex h-full w-full items-center justify-between px-4 py-6 md:px-10 lg:px-20">
        <div className="flex min-w-0 items-center gap-4 lg:gap-12">
          <Link
            className="flex items-center gap-[10px] text-xl font-black tracking-[-0.7px] text-[#17191E] no-underline"
            href="/"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#17191E]">
              <img className="h-6 w-6" src="/icons/movie.svg" alt="" />
            </span>

            <span>UMCine</span>
          </Link>

          <nav className="hidden items-center gap-[30px] sm:flex">
            {navItems.map(({ href, label }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={href}
                  href={href}
                  className="relative py-2 text-sm font-bold text-[#606774] no-underline"
                  style={
                    isActive
                      ? {
                          color: "#17191E",
                          textDecoration: "underline",
                        }
                      : undefined
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-[10px]">
          <Link
            href="/search"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-[#E3E6EB] bg-white p-0"
            aria-label="검색"
          >
            <img className="h-6 w-6" src="/icons/search.svg" alt="" />
          </Link>

          {!hasHydrated ? (
            <span className="h-[42px] w-24 animate-pulse rounded-lg bg-gray-200" />
          ) : !accessToken ? (
            <Link
              href="/login"
              className="h-[42px] flex items-center rounded-lg border-0 bg-[#2563EB] px-4 text-sm font-extrabold text-white"
              aria-label="로그인"
            >
              로그인
            </Link>
          ) : meQuery.isLoading ? (
            <span className="h-[42px] w-24 animate-pulse rounded-lg bg-gray-200" />
          ) : (
            <Link
              href="/mypage"
              className="h-[42px] flex items-center rounded-lg border-0 bg-[#2563EB] px-4 text-sm font-extrabold text-white"
              aria-label="마이페이지"
            >
              마이페이지
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
