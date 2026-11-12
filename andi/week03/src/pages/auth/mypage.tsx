import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";

export function MyPage() {
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

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
    </main>
  );
}