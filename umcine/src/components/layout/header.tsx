import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../../api/members/me';
import { useAuthStore } from '../../stores/auth-store';
function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
    queryKey: ['members', 'me'],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
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

            <Link
              to="/mypage"
              className="text-[14px] text-[#333] no-underline"
              activeProps={{
                className:
                  'font-bold underline underline-offset-[5px] decoration-2',
              }}
            >
              내 정보
            </Link>
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

          {!accessToken ? (
            <Link to="/login">로그인</Link>
          ) : meQuery.isLoading ? (
            <span className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
          ) : (
            <Link to="/mypage">{meQuery.data?.nickname ?? '마이페이지'}</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
