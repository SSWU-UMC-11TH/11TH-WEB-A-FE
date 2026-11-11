import { Link } from "@tanstack/react-router";
import { useState } from "react";

const member = {
  nickname: "gs0428",
  email: "gwangsoo@cinemalab.kr",
};

const favorites = [
  {
    id: 1,
    title: "스파이더맨: 브랜드 뉴 데이",
    releaseDate: "2026.07.29",
    poster: "/images/spiderman.jpg",
  },
  {
    id: 2,
    title: "오디세이",
    releaseDate: "2026.08.05",
    poster: "/images/odyssey.jpg",
  },
  {
    id: 3,
    title: "미니언즈 & 몬스터즈",
    releaseDate: "2026.07.15",
    poster: "/images/minions.jpg",
  },
];

export function MyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const totalPages = Math.max(
    1,
    Math.ceil(favorites.length / pageSize),
  );

  const paginatedFavorites = favorites.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <main className="min-h-[calc(100vh-91px)] bg-[#F7F8FA] px-5 py-8 md:px-10 lg:px-20">
      <div className="mx-auto max-w-[1200px]">
        {/* 제목 */}
        <div className="mb-[28px] flex items-center justify-between">
          <h1 className="text-[31px] font-bold text-[#17191E]">
            내 정보
          </h1>

          <Link
            to="/mypage/edit"
            className="h-[42px] flex items-center justify-center rounded-lg bg-[#2563EB] px-4 py-4 text-sm font-extrabold text-white no-underline"
          >
            정보 수정
          </Link>
        </div>

        {/* 기본 정보 */}
        <section className="border-t border-[#E3E6EB] py-4">
          <h2 className="mb-4 text-[17px] font-bold text-[#17191E]">
            기본 정보
          </h2>

          <div className="flex flex-wrap items-center gap-[28px] border-b border-[#E3E6EB] pb-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#E3E6EB]">
              <span aria-hidden="true" className="text-4xl">
                <img src="/images/default-profile.png" alt="프로필 이미지" className="h-20 w-20 rounded-full object-cover" />
              </span>
            </div>

            <div className="min-w-[150px]">
              <p className="mb-1 text-[11px]  text-[#969DA8]">닉네임</p>
              <p className="text-sm font-bold text-[#17191E]">
                {member.nickname}
              </p>
            </div>

            <div className="min-w-[180px]">
              <p className="mb-1 text-xs text-[#969DA8]">이메일</p>
              <p className="text-sm font-bold text-[#17191E]">
                {member.email}
              </p>
            </div>
          </div>
        </section>

        {/* 즐겨찾기 */}
        <section className="pt-3">
          <h2 className="mb-4 text-[17px] font-bold text-[#17191E]">
            내 즐겨찾기
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {paginatedFavorites.map((movie) => (
              <div key={movie.id} className="min-w-0">
                <div className="aspect-[0.87] overflow-hidden rounded-lg bg-[#E3E6EB]">
                  <img
                    src={movie.poster}
                    alt={`${movie.title} 포스터`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <h3 className="mt-2 truncate text-sm font-bold text-[#17191E]">
                  {movie.title}
                </h3>

                <p className="mt-1 text-xs text-[#969DA8]">
                  {movie.releaseDate}
                </p>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="이전 페이지"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="px-2 text-lg text-[#2563EB] disabled:opacity-30"
            >
              ‹
            </button>

            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#17191E] text-sm font-bold text-white">
              {currentPage}
            </span>

            <button
              type="button"
              aria-label="다음 페이지"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="px-2 text-lg text-[#2563EB] disabled:opacity-30"
            >
              ›
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
