import { Link } from '@tanstack/react-router';
import { getUserInfo } from '../../utils/user-storage';

const favoriteMovies = [
  {
    id: 1,
    title: '스파이더맨: 브랜드 뉴 데이',
    date: '2026.07.29',
    poster: '/images/movies/spider-man-brand-new-day.jpg',
  },
  {
    id: 2,
    title: '오디세이',
    date: '2026.08.05',
    poster: '/images/movies/odyssey.jpg',
  },
  {
    id: 3,
    title: '미니언즈 & 몬스터즈',
    date: '2026.07.15',
    poster: '/images/movies/minions-monsters.jpg',
  },
];

export function MyPage() {
  const user = getUserInfo();

  return (
    <div className="min-h-[calc(100vh-91px)] bg-[#F7F8FA]">
      <main className="mx-auto w-full max-w-[1280px] px-[42px] py-8">
        {/* 페이지 제목 */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-[24px] font-bold text-[#17191E]">내 정보</h1>

          <Link
            to="/mypage/edit"
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

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {favoriteMovies.map((movie) => (
              <div key={movie.id}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="aspect-[2/3] w-full rounded-[10px] object-cover"
                />

                <p className="mt-2 text-[14px] font-semibold text-[#17191E]">
                  {movie.title}
                </p>

                <p className="mt-1 text-[12px] text-[#969DA8]">{movie.date}</p>
              </div>
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
