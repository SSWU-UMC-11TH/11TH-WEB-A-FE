import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="h-[91px] w-full border-b border-[#E3E6EB] bg-white">
      <div className="flex h-full w-full items-center justify-between px-20 py-6">
        <div className="flex items-center gap-12">
          <Link
            className="flex items-center gap-[10px] text-xl font-black tracking-[-0.7px] text-[#17191E] no-underline"
            to="/"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#17191E]">
              <img className="h-6 w-6" src="/icons/movie.svg" alt="" />
            </span>

            <span>UMCine</span>
          </Link>

          <nav className="flex items-center gap-[30px]">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="relative py-2 text-sm font-bold text-[#606774] no-underline"
              activeProps={{
                style: {
                  color: "#17191E",
                  textDecoration: "underline",
                },
                "aria-current": "page",
              }}
            >
              영화
            </Link>

            <Link
              to="/search"
              className="relative py-2 text-sm font-bold text-[#606774] no-underline"
              activeProps={{
                style: {
                  color: "#17191E",
                  textDecoration: "underline",
                },
                "aria-current": "page",
              }}
            >
              검색
            </Link>

            <a
              className="relative py-2 text-sm font-bold text-[#606774] no-underline"
              href="#"
            >
              내 정보
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-[10px]">
          <button
            className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-[#E3E6EB] bg-white p-0"
            type="button"
            aria-label="검색"
          >
            <img className="h-6 w-6" src="/icons/search.svg" alt="" />
          </button>

          <button
            className="h-[42px] rounded-lg border-0 bg-[#2563EB] px-4 text-sm font-extrabold text-white"
            type="button"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}
