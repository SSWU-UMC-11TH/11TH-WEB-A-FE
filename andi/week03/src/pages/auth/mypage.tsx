import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useFavorites } from "../../hooks/use-favorites";

export function MyPage() {
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const favoritesQuery = useFavorites();

  if (meQuery.isPending) {
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        회원 정보를 불러오는 중...
      </main>
    );
  }

  if (meQuery.isError) {
    return (
      <main className="mx-auto max-w-lg px-6 py-16">
        회원 정보를 불러오지 못했습니다.
      </main>
    );
  }

  const member = meQuery.data;

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        내 정보
      </h1>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="border-b border-gray-100 py-4">
          <p className="mb-2 text-sm text-gray-500">이메일</p>
          <p className="font-medium text-gray-900">
            {member.email}
          </p>
        </div>

        <div className="py-4">
          <p className="mb-2 text-sm text-gray-500">닉네임</p>
          <p className="font-medium text-gray-900">
            {member.nickname}
          </p>
        </div>

        <Link
          to="/mypage/edit"
          className="mt-6 block rounded-lg bg-blue-600 p-3 text-center font-semibold text-white no-underline"
        >
          내 정보 수정
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="mb-5 text-xl font-bold text-gray-900">
          내 즐겨찾기
        </h2>

        {favoritesQuery.isPending ? (
          <p className="text-sm text-gray-500">
            즐겨찾기 목록을 불러오는 중...
          </p>
        ) : favoritesQuery.isError ? (
          <p role="alert" className="text-sm text-red-500">
            즐겨찾기 목록을 불러오지 못했습니다.
          </p>
        ) : favoritesQuery.data.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">
              아직 즐겨찾기한 영화가 없습니다.
            </p>

            <Link
              to="/"
              className="mt-4 inline-block text-sm font-semibold text-blue-600"
            >
              영화 둘러보기
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {favoritesQuery.data.map((favorite) => (
              <li key={favorite.favoriteId}>
                <Link
                  to="/movies/$movieId"
                  params={{
                    movieId: String(favorite.movieId),
                  }}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 no-underline transition-colors hover:border-blue-300"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      영화 #{favorite.movieId}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      즐겨찾기 등록일:{" "}
                      {new Date(
                        favorite.createdAt,
                      ).toLocaleDateString("ko-KR")}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-blue-600">
                    상세 보기
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}