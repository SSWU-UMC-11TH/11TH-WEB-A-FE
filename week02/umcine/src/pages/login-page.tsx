import { useState, type SubmitEvent } from "react";
import { Link } from "@tanstack/react-router";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className="flex min-h-[calc(100vh-91px)] items-center justify-center bg-[#F7F8FA] px-5">
      <div className="w-full max-w-[420px] -translate-y-10">
        <h1 className="mb-5 text-[34px] font-bold text-[#17191E]">
          로그인
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="mb-2 block text-[13px] font-extrabold text-[#17191E]"
            >
              이메일
            </label>

            <div className="flex h-12 items-center rounded-lg border border-[#E3E6EB] bg-white px-[13px]">
              <img src="/icons/login-mail.svg" alt="" className="mr-2 h-4 w-4" />
              <span
                aria-hidden="true"
                className="mr-2 text-sm text-[#969DA8]"
              >
              </span>

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="min-w-0 flex-1 bg-transparent text-sm text-[#17191E] outline-none placeholder:text-[#969DA8]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="mb-2 block text-sm font-bold text-[#17191E]"
            >
              비밀번호
            </label>

            <div className="flex h-12 items-center rounded-lg border border-[#E3E6EB] bg-white px-[13px]">
              <img src="/icons/login-lock.svg" alt="" className="mr-2 h-4 w-4" />
              <span
                aria-hidden="true"
                className="mr-2 text-sm text-[#969DA8]"
              >
              </span>

              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                required
                className="min-w-0 flex-1 bg-transparent text-sm text-[#17191E] outline-none placeholder:text-[#969DA8]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!email.trim() || !password}
            className="h-12 w-full rounded-lg bg-[#2563EB] text-sm font-extrabold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            로그인
          </button>
        </form>

        <p className="mt-4 text-center text-[13px] text-[#606774]">
          처음이신가요?{" "}
          <Link
            to="/signup"
            className="font-extrabold text-[#2563EB] no-underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
