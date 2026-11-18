import { useRef, useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { checkEmail, checkNickname, signup } from "../api/members";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailResult, setEmailResult] = useState("");
  const [nicknameResult, setNicknameResult] = useState("");
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(
    null,
  );

  const [checkedEmail, setCheckedEmail] = useState("");
  const [checkedNickname, setCheckedNickname] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [checkingNickname, setCheckingNickname] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef(email);
  const nicknameRef = useRef(nickname);
  emailRef.current = email;
  nicknameRef.current = nickname;

  const isEmailValid = EMAIL_REGEX.test(email.trim());
  const isNicknameValid =
    nickname.trim().length >= 2 && nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(password);
  const isPasswordConfirmValid =
    passwordConfirm.length > 0 && password === passwordConfirm;

  // 모든 조건을 만족해야 가입 가능
  const canSubmit =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid &&
    emailAvailable === true &&
    nicknameAvailable === true &&
    checkedEmail === email.trim() &&
    checkedNickname === nickname.trim() &&
    !checkingEmail &&
    !checkingNickname;

  async function handleEmailCheck() {
    const value = email.trim();

    if (!EMAIL_REGEX.test(value)) {
      setEmailAvailable(null);
      setEmailResult("올바른 이메일을 입력해 주세요.");
      return;
    }

    if (checkingEmail) return;

    setCheckingEmail(true);
    setEmailAvailable(null);
    setCheckedEmail("");
    setEmailResult("");

    try {
      const result = await checkEmail(value);
      if (emailRef.current.trim() !== value) return;
      setEmailAvailable(result.available);
      setCheckedEmail(value);
      setEmailResult(
        result.available
          ? "사용 가능한 이메일입니다."
          : "이미 사용 중인 이메일입니다.",
      );
    } catch {
      if (emailRef.current.trim() !== value) return;
      setEmailAvailable(null);
      setEmailResult("이메일 중복 확인에 실패했어요.");
    } finally {
      setCheckingEmail(false);
    }
  }

  async function handleNicknameCheck() {
    const value = nickname.trim();

    if (value.length < 2 || value.length > 12) {
      setNicknameAvailable(null);
      setNicknameResult("닉네임은 2~12자로 입력해 주세요.");
      return;
    }

    if (checkingNickname) return;

    setCheckingNickname(true);
    setNicknameAvailable(null);
    setCheckedNickname("");
    setNicknameResult("");

    try {
      const result = await checkNickname(value);

      // 요청 중 입력값이 바뀌었다면 이전 응답 무시
      if (nicknameRef.current.trim() !== value) return;
      setNicknameAvailable(result.available);
      setCheckedNickname(value);
      setNicknameResult(
        result.available
          ? "사용 가능한 닉네임입니다."
          : "이미 사용 중인 닉네임입니다.",
      );
    } catch {
      if (nicknameRef.current.trim() !== value) return;
      setNicknameAvailable(null);
      setNicknameResult("닉네임 중복 확인에 실패했어요.");
    } finally {
      setCheckingNickname(false);
    }
  }

  // 회원가입 요청
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await signup({
        email: email.trim(),
        nickname: nickname.trim(),
        password,
      });

      alert(response.message || "회원가입이 완료되었습니다.");

      // 회원가입 성공 후 로그인 페이지 이동
      await navigate({ to: "/login" });
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-91px)] items-center justify-center bg-[#F7F8FA] px-5">
      <div className="mx-auto w-full max-w-[420px]">
        <h1 className="mb-4 text-[32px] font-bold text-[#17191E]">회원가입</h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* 이메일 */}
          <div>
            <label
              htmlFor="signup-email"
              className="mb-2 block text-sm font-bold"
            >
              이메일
            </label>

            <div className="flex h-12 items-center rounded-lg border border-[#E3E6EB] bg-white px-3">
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailResult("");
                  setEmailAvailable(null);
                  setCheckedEmail("");
                }}
                placeholder="name@example.com"
                className="min-w-0 flex-1 text-sm outline-none"
              />
              <button
                type="button"
                disabled={!isEmailValid || checkingEmail || isSubmitting}
                onClick={handleEmailCheck}
                className="ml-2 shrink-0 text-xs font-bold text-[#2563EB] disabled:opacity-50"
              >
                {checkingEmail ? "확인 중" : "중복 확인"}
              </button>
            </div>

            {email.length > 0 && !isEmailValid && (
              <p className="mt-2 text-xs text-red-500">
                올바른 이메일 형식으로 입력해 주세요.
              </p>
            )}

            {emailResult && (
              <p
                role="status"
                className={`mt-2 text-xs ${
                  emailAvailable ? "text-green-600" : "text-red-500"
                }`}
              >
                {emailResult}
              </p>
            )}
          </div>

          {/* 닉네임 */}
          <div>
            <label
              htmlFor="signup-nickname"
              className="mb-2 block text-sm font-bold"
            >
              닉네임
            </label>

            <div className="flex h-12 items-center rounded-lg border border-[#E3E6EB] bg-white px-3">
              <input
                id="signup-nickname"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setNicknameResult("");
                  setNicknameAvailable(null);
                  setCheckedNickname("");
                }}
                placeholder="2~12자"
                className="min-w-0 flex-1 text-sm outline-none"
              />
              <button
                type="button"
                disabled={!isNicknameValid || checkingNickname || isSubmitting}
                onClick={handleNicknameCheck}
                className="ml-2 shrink-0 text-xs font-bold text-[#2563EB] disabled:opacity-50"
              >
                {checkingNickname ? "확인 중" : "중복 확인"}
              </button>
            </div>

            {nickname.length > 0 && !isNicknameValid && (
              <p className="mt-2 text-xs text-red-500">
                닉네임은 2~12자로 입력해 주세요.
              </p>
            )}

            {nicknameResult && (
              <p
                role="status"
                className={`mt-2 text-xs ${
                  nicknameAvailable ? "text-green-600" : "text-red-500"
                }`}
              >
                {nicknameResult}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label
              htmlFor="signup-password"
              className="mb-2 block text-sm font-bold"
            >
              비밀번호
            </label>

            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상"
              className="h-12 w-full rounded-lg border border-[#E3E6EB] bg-white px-3 text-sm outline-none"
            />
            {!isPasswordValid && (
              <p
                className={`mt-2 text-xs ${
                  password.length > 0 ? "text-red-500" : "text-[#969DA8]"
                }`}
              >
                영문 대·소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해
                주세요.
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label
              htmlFor="signup-password-confirm"
              className="mb-2 block text-sm font-bold"
            >
              비밀번호 확인
            </label>

            <input
              id="signup-password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="다시 입력"
              className="h-12 w-full rounded-lg border border-[#E3E6EB] bg-white px-3 text-sm outline-none"
            />

            {passwordConfirm && !isPasswordConfirmValid && (
              <p className="mt-2 text-xs text-red-500">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="h-12 w-full rounded-lg bg-[#2563EB] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "가입 중..." : "가입하기"}
          </button>

          <p className="text-center text-[13px] text-[#606774]">
            이미 계정이 있나요?{" "}
            <Link to="/login" className="font-extrabold text-[#2563EB]">
              로그인
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
