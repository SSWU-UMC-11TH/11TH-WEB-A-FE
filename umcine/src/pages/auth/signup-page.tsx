import { useState } from 'react';
import { checkEmailDuplicate } from '../../api/members/check-email-duplicate';
import { checkNicknameDuplicate } from '../../api/members/check-nickname-duplicate';
import { Link } from '@tanstack/react-router';
import { signup } from '../../api/members/signup';

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = 'email' | 'nickname';
// 이메일 형식 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 영문 대소문자, 숫자, 특수문자를 포함해 8자 이상
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
const DEFAULT_FORM = {
  email: '',
  nickname: '',
  password: '',
  passwordConfirm: '',
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });
  // 입력값 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());

  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;

  const isPasswordValid = PASSWORD_REGEX.test(form.password);

  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 입력을 시작한 필드에만 오류 표시
  const showEmailError = form.email.length > 0 && !isEmailValid;

  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;

  const showPasswordError = form.password.length > 0 && !isPasswordValid;

  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  // 모든 입력값이 유효하면 가입 버튼 활성화
  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
    if (key === 'email' || key === 'nickname') {
      if (duplicateCheck[key].isChecking) return;

      // 입력값이 바뀌면 중복 확인 결과 초기화
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: DEFAULT_DUPLICATE_CHECK,
      }));
    }

    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 중복 확인 함수 (새로 추가)
  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === 'email' ? isEmailValid : isNicknameValid;

    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === 'email' ? '이메일' : '닉네임';

    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { isChecking: true, isAvailable: false },
    }));

    try {
      const response =
        key === 'email'
          ? await checkEmailDuplicate(form.email.trim())
          : await checkNicknameDuplicate(form.nickname.trim());

      const isAvailable = response.available;

      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable },
      }));

      alert(
        isAvailable
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`,
      );
    } catch {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable: false },
      }));

      alert('중복 확인에 실패했어요. 다시 시도해 주세요.');
    } finally {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isChecking: false },
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });

      alert(response.message);

      // 로그인 페이지 구현 후 연결
      // navigate({ to: "/login" });
    } catch {
      alert('회원가입에 실패했어요. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#F7F8FA] px-4 py-12">
      <div className="w-full max-w-[410px]">
        <h1 className="mb-5 text-[34px] leading-[100%] tracking-[-1.53px] font-bold text-[#17191E] font-['Pretendard']">
          회원가입
        </h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* 이메일 */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              이메일
            </label>

            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                disabled={duplicateCheck.email.isChecking}
                onChange={(e) => handleChangeField('email', e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-24 text-sm outline-none focus:border-blue-500"
              />

              <button
                type="button"
                disabled={!isEmailValid || duplicateCheck.email.isChecking}
                onClick={() => handleCheckDuplicate('email')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 disabled:text-gray-400"
              >
                {duplicateCheck.email.isChecking ? '확인 중' : '중복 확인'}
              </button>
            </div>

            {showEmailError && (
              <p className="mt-1 text-xs text-red-500">
                올바른 이메일 형식을 입력해주세요.
              </p>
            )}
          </div>

          {/* 닉네임 */}
          <div>
            <label
              htmlFor="nickname"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              닉네임
            </label>

            <div className="relative">
              <input
                id="nickname"
                type="text"
                placeholder="2~12자"
                value={form.nickname}
                disabled={duplicateCheck.nickname.isChecking}
                onChange={(e) => handleChangeField('nickname', e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-24 text-sm outline-none focus:border-blue-500"
              />

              <button
                type="button"
                disabled={
                  !isNicknameValid || duplicateCheck.nickname.isChecking
                }
                onClick={() => handleCheckDuplicate('nickname')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 disabled:text-gray-400"
              >
                {duplicateCheck.nickname.isChecking ? '확인 중' : '중복 확인'}
              </button>
            </div>

            {showNicknameError && (
              <p className="mt-1 text-xs text-red-500">
                닉네임은 2~12자로 입력해주세요.
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              비밀번호
            </label>

            <input
              id="password"
              type="password"
              placeholder="8자 이상"
              value={form.password}
              onChange={(e) => handleChangeField('password', e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <p
              className={`mt-1 text-xs ${
                showPasswordError ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              영문 대소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해
              주세요.
            </p>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label
              htmlFor="passwordConfirm"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              비밀번호 확인
            </label>

            <input
              id="passwordConfirm"
              type="password"
              placeholder="다시 입력"
              value={form.passwordConfirm}
              onChange={(e) =>
                handleChangeField('passwordConfirm', e.target.value)
              }
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            {showPasswordConfirmError && (
              <p className="mt-1 text-xs text-red-500">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          {/* 가입하기 */}
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="mt-2 w-full rounded-lg bg-[#2563EB] py-3.5 text-sm font-semibold text-white hover:bg-[#2563EB]-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? '가입 중...' : '가입하기'}
          </button>
        </form>

        {/* 로그인 */}
        <p className="mt-4 text-center text-xs text-gray-500">
          이미 계정이 있나요?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
