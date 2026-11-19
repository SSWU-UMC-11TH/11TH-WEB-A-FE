import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../../api/members/me';
import { useAuthStore } from '../../stores/auth-store';
import { useUpdateMeMutation } from '../../hooks/use-update-me-mutation';

export function EditPage() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const meQuery = useQuery({
    queryKey: ['members', 'me'],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  if (!accessToken) {
    return <p>로그인이 필요합니다.</p>;
  }

  if (meQuery.isLoading) {
    return <p>회원 정보를 불러오는 중이에요.</p>;
  }

  if (!meQuery.data) {
    return <p>회원 정보를 불러오지 못했습니다.</p>;
  }

  return <EditPageContent initialNickname={meQuery.data.nickname} />;
}

function EditPageContent({ initialNickname }: { initialNickname: string }) {
  const [nickname, setNickname] = useState(initialNickname);

  const navigate = useNavigate();
  const updateMeMutation = useUpdateMeMutation();

  const isNicknameValid =
    nickname.trim().length >= 2 && nickname.trim().length <= 12;

  const canSubmit = isNicknameValid;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit || updateMeMutation.isPending) return;

    updateMeMutation.mutate(
      {
        nickname: nickname.trim(),
      },
      {
        onSuccess: () => {
          navigate({ to: '/mypage' });
        },
      },
    );
  };

  return (
    <div className="min-h-[calc(100vh-91px)] bg-[#F7F8FA] px-4 py-12">
      <div className="mx-auto w-full max-w-[600px]">
        <h1 className="mb-8 text-[32px] font-bold text-[#17191E]">
          회원정보 수정
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[16px] border border-[#E5E7EB] bg-white p-8"
        >
          <div>
            <label
              htmlFor="nickname"
              className="mb-2 block text-[14px] font-semibold"
            >
              닉네임
            </label>

            <input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="h-[48px] w-full rounded-[8px] border border-[#D1D5DB] px-4 outline-none focus:border-[#4F6DF5]"
            />

            {!isNicknameValid && (
              <p className="mt-2 text-[12px] text-red-500">
                닉네임은 2~12자로 입력해 주세요.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link
              to="/mypage"
              className="flex h-[44px] items-center rounded-[8px] border border-[#D1D5DB] px-6 text-[14px] text-[#333] no-underline"
            >
              취소
            </Link>

            <button
              type="submit"
              disabled={!canSubmit || updateMeMutation.isPending}
              className="h-[44px] rounded-[8px] bg-[#4F6DF5] px-6 text-[14px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
            >
              {updateMeMutation.isPending ? '저장 중' : '저장하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
