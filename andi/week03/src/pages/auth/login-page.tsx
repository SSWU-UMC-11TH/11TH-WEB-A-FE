
import { useState, type FormEvent } from "react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="mb-8 text-center text-3xl font-bold">
        로그인
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block font-medium">
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            className="w-full rounded-lg border border-gray-300 p-3"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block font-medium">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full rounded-lg border border-gray-300 p-3"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!email.trim() || !password}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          로그인
        </button>
      </form>
    </main>
  );
}
