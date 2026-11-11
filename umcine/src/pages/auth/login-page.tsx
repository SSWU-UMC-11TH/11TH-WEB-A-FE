import { useState, type FormEvent } from 'react';
import { Link } from '@tanstack/react-router';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.trim().length > 0 && password.length > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    // 로그인 API 연결은 다음 단계에서 구현
    console.log('로그인 입력값:', { email, password });
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#F7F8FA] px-4 py-12">
      <div className="w-full max-w-[410px]">
        <h1 className="mb-5 text-[34px] font-bold leading-[100%] tracking-[-1.53px] text-[#17191E]">
          로그인
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이메일 */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              이메일
            </label>

            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
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
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full rounded-lg bg-[#2563EB] py-3.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            로그인
          </button>
        </form>

        {/* 회원가입 이동 */}
        <p className="mt-4 text-center text-xs text-gray-500">
          처음이신가요?{' '}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
