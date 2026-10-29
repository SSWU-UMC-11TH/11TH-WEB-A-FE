import { useState } from "react";
import { checkEmail, checkNickname } from "../api/members";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailResult, setEmailResult] = useState("");
  const [nicknameResult, setNicknameResult] = useState("");
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [checkingNickname, setCheckingNickname] = useState(false);

  async function handleEmailCheck() {
    const value = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailResult("올바른 이메일을 입력해 주세요.");
      return;
    }

    setCheckingEmail(true);
    setEmailResult("");

    try {
      const result = await checkEmail(value);
      setEmailAvailable(result.available);
      setEmailResult(
        result.available
          ? "사용 가능한 이메일입니다."
          : "이미 사용 중인 이메일입니다.",
      );
    } catch {
      setEmailAvailable(null);
      setEmailResult("이메일 중복 확인에 실패했어요.");
    } finally {
      setCheckingEmail(false);
    }
  }

  async function handleNicknameCheck() {
    const value = nickname.trim();

    if (value.length < 2 || value.length > 12) {
      setNicknameResult("닉네임은 2~12자로 입력해 주세요.");
      return;
    }

    setCheckingNickname(true);
    setNicknameResult("");

    try {
      const result = await checkNickname(value);
      setNicknameAvailable(result.available);
      setNicknameResult(
        result.available
          ? "사용 가능한 닉네임입니다."
          : "이미 사용 중인 닉네임입니다.",
      );
    } catch {
      setNicknameAvailable(null);
      setNicknameResult("닉네임 중복 확인에 실패했어요.");
    } finally {
      setCheckingNickname(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] px-5 py-12">
      <div className="mx-auto w-full max-w-[420px]">
        <h1 className="mb-8 text-[32px] font-extrabold text-[#17191E]">
          회원가입
        </h1>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold">이메일</label>
            <div className="flex h-12 items-center rounded-lg border border-[#E3E6EB] bg-white px-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailResult("");
                  setEmailAvailable(null);
                }}
                placeholder="name@example.com"
                className="min-w-0 flex-1 text-sm outline-none"
              />
              <button
                type="button"
                disabled={checkingEmail}
                onClick={handleEmailCheck}
                className="ml-2 shrink-0 text-xs font-bold text-[#2563EB] disabled:opacity-50"
              >
                {checkingEmail ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {emailResult && (
              <p
                className={`mt-2 text-xs ${
                  emailAvailable ? "text-green-600" : "text-red-500"
                }`}
              >
                {emailResult}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">닉네임</label>
            <div className="flex h-12 items-center rounded-lg border border-[#E3E6EB] bg-white px-3">
              <input
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setNicknameResult("");
                  setNicknameAvailable(null);
                }}
                placeholder="2~12자"
                className="min-w-0 flex-1 text-sm outline-none"
              />
              <button
                type="button"
                disabled={checkingNickname}
                onClick={handleNicknameCheck}
                className="ml-2 shrink-0 text-xs font-bold text-[#2563EB] disabled:opacity-50"
              >
                {checkingNickname ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {nicknameResult && (
              <p
                className={`mt-2 text-xs ${
                  nicknameAvailable ? "text-green-600" : "text-red-500"
                }`}
              >
                {nicknameResult}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상"
              className="h-12 w-full rounded-lg border border-[#E3E6EB] bg-white px-3 text-sm outline-none"
            />
            <p className="mt-2 text-xs text-[#969DA8]">
              영문 대·소문자, 숫자, 특수문자를 조합해 입력해 주세요.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              비밀번호 확인
            </label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="다시 입력"
              className="h-12 w-full rounded-lg border border-[#E3E6EB] bg-white px-3 text-sm outline-none"
            />
            {passwordConfirm && password !== passwordConfirm && (
              <p className="mt-2 text-xs text-red-500">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          <button
            type="button"
            disabled
            className="h-12 w-full cursor-not-allowed rounded-lg bg-[#2563EB] font-bold text-white opacity-60"
          >
            가입하기
          </button>

          <p className="text-center text-xs text-[#969DA8]">
            이미 계정이 있나요?{" "}
            <span className="font-bold text-[#2563EB]">로그인</span>
          </p>
        </div>
      </div>
    </main>
  );
}
