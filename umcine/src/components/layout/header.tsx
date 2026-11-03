import { Link } from '@tanstack/react-router';

function Header() {
  return (
    <header className="h-[91px] w-full border-b border-[#eee] bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-[42px]">
        <div className="flex items-center gap-[80px]">
          <div className="text-[22px] font-bold">UMCine</div>

          <nav className="flex items-center gap-[28px]">
            <Link
              to="/"
              className="text-[14px] text-[#333] no-underline"
              activeProps={{
                className:
                  'font-bold underline underline-offset-[5px] decoration-2',
              }}
            >
              영화
            </Link>

            <span className="cursor-default text-[14px] text-[#333]">리뷰</span>

            <span className="cursor-default text-[14px] text-[#333]">
              내 정보
            </span>
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-[12px]">
          <Link
            to="/search"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-[#ddd] bg-white p-0"
            aria-label="영화 검색"
          >
            <img src="/icons/search.svg" alt="" className="h-[20px] w-[20px]" />
          </Link>

          <button
            className="h-[40px] cursor-pointer rounded-[8px] bg-[#4f6df5] px-[18px] text-[14px] text-white"
            type="button"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
