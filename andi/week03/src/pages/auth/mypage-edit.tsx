import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";

export function MyPageEdit() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const updateMeMutation = useUpdateMeMutation();

  useEffect(() => {
    if (meQuery.data) {
      setNickname(meQuery.data.nickname);
    }
  }, [meQuery.data]);

  const trimmedNickname = nickname.trim();
  const canSubmit =
    trimmedNickname.length >= 2 &&
    trimmedNickname.length <= 12;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit || updateMeMutation.isPending) return;

    updateMeMutation.mutate(
      { nickname: trimmedNickname },
      {
        onSuccess: () => {
          navigate({ to: "/mypage" });
        },
      },
    );
  };

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
            value={meQuery.data.email}
            readOnly
            className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-500"
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
            minLength={2}
            maxLength={12}
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
            disabled={!canSubmit || updateMeMutation.isPending}
            className="flex-1 rounded-lg bg-blue-600 p-3 font-semibold text-white disabled:bg-gray-300"
          >
            {updateMeMutation.isPending ? "저장 중" : "수정 완료"}
          </button>
        </div>
      </form>
    </main>
  );
}