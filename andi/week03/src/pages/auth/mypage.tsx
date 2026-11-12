
import { Link } from "@tanstack/react-router";

export function MyPage() {
  // 8주차 API 연동 전까지 사용할 임시 데이터
  const member = {
    email: "andi@example.com",
    nickname: "Andi",
  };

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
