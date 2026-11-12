
import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";

export function MyPageEdit() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("Andi");
  const [email, setEmail] = useState("andi@example.com");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("입력한 정보가 확인되었습니다.");
    // 실제 정보 저장은 8주차 API 연동 시 구현
  };

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        내 정보 수정
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6"
      >
        <div>
          <label
            htmlFor="edit-email"
            className="mb-2 block font-medium"
          >
            이메일
          </label>
          <input
            id="edit-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3"
            required
          />
        </div>

        <div>
          <label
            htmlFor="edit-nickname"
            className="mb-2 block font-medium"
          >
            닉네임
          </label>
          <input
            id="edit-nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3"
            required
          />
        </div>

        <div className="flex gap-3 pt-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/mypage" })}
            className="flex-1 rounded-lg border border-gray-300 p-3 font-medium"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!email.trim() || !nickname.trim()}
            className="flex-1 rounded-lg bg-blue-600 p-3 font-semibold text-white disabled:bg-gray-300"
          >
            수정 완료
          </button>
        </div>
      </form>
    </main>
  );
}
