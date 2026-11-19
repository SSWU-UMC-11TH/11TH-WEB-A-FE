import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { getUserInfo, saveUserInfo } from '../../utils/user-storage';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

export function EditPage() {
  const [nickname, setNickname] = useState(() => getUserInfo().nickname);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();
  const isNicknameValid =
    nickname.trim().length >= 2 && nickname.trim().length <= 12;

  const isPasswordValid = password === '' || PASSWORD_REGEX.test(password);

  const isPasswordConfirmValid =
    password === '' ? passwordConfirm === '' : password === passwordConfirm;

  const canSubmit =
    isNicknameValid && isPasswordValid && isPasswordConfirmValid;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) return;

    const currentUser = getUserInfo();

    saveUserInfo({
      ...currentUser,
      nickname: nickname.trim(),
    });

    alert('회원정보가 수정되었습니다.');

    navigate({ to: '/mypage' });
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

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-[14px] font-semibold"
            >
              새 비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="변경하지 않으려면 비워 두세요"
              className="h-[48px] w-full rounded-[8px] border border-[#D1D5DB] px-4 outline-none focus:border-[#4F6DF5]"
            />
            {!isPasswordValid && (
              <p className="mt-2 text-[12px] text-red-500">
                8자 이상, 대문자·소문자·숫자·특수문자를 포함해 주세요.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="mb-2 block text-[14px] font-semibold"
            >
              새 비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="h-[48px] w-full rounded-[8px] border border-[#D1D5DB] px-4 outline-none focus:border-[#4F6DF5]"
            />
            {!isPasswordConfirmValid && (
              <p className="mt-2 text-[12px] text-red-500">
                비밀번호가 일치하지 않습니다.
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
              disabled={!canSubmit}
              className="h-[44px] rounded-[8px] bg-[#4F6DF5] px-6 text-[14px] font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
