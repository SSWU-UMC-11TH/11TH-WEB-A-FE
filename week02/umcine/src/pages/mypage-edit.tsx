import { useRef, useState, type ChangeEvent } from "react";
import { Link } from "@tanstack/react-router";

export function MyPageEditPage() {
  const [nickname, setNickname] = useState("gs0428");
  const [email] = useState("gwangsoo@cinemalab.kr");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 선택할 수 있습니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("이미지는 최대 5MB까지 업로드할 수 있습니다.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function handleNicknameCheck() {
    if (nickname.trim().length < 2 || nickname.trim().length > 12) {
      setNicknameMessage("닉네임은 2~12자로 입력해 주세요.");
      return;
    }

    setNicknameMessage("중복 확인 API 연결 전입니다.");
  }

  function handleSave() {
    if (nickname.trim().length < 2 || nickname.trim().length > 12) {
      alert("닉네임은 2~12자로 입력해 주세요.");
      return;
    }

    alert("변경사항 저장 API는 추후 연결할 예정입니다.");
  }

  return (
    <main className="min-h-[calc(100vh-91px)] bg-[#F7F8FA] px-5 py-8 md:px-10 lg:px-20">
      <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-[1200px] flex-col">
        {/* 제목 */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-[31px] font-bold text-[#17191E]">
              내 정보 수정
            </h1>

            <p className="mt-2 text-sm text-[#606774]">
              닉네임과 프로필 이미지만 변경할 수 있어요.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="shrink-0 flex items-center justify-center rounded-lg bg-[#2563EB] px-4 py-3 text-sm font-extrabold text-white"
          >
            변경사항 저장
          </button>
        </div>

        {/* 정보 수정 영역 */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* 프로필 이미지 */}
          <div className="flex flex-col items-center pt-5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#E3E6EB]"
              aria-label="프로필 이미지 변경"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="프로필 미리보기"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span aria-hidden="true" className="text-3xl text-[#17191E]">
                  <img src="/images/default-profile.png" alt="프로필 이미지" className="h-20 w-20 rounded-full object-cover" />
                </span>
              )}

              <span className="absolute -right-1 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border border-[#E3E6EB] bg-white text-xs">
                <img src="/icons/profile-edit.svg" alt="프로필 이미지" className="h-6 w-6 rounded-full object-cover" />
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <p className="mt-3 text-[15px] font-bold text-[#17191E]">
              프로필 이미지
            </p>

            <p className="mt-1 text-[11px] text-[#969DA8]">
              선택 사항 · 최대 5MB
            </p>
          </div>

          {/* 닉네임 및 이메일 */}
          <div className="space-y-[17px]">
            <div>
              <label
                htmlFor="edit-nickname"
                className="mb-2 block text-[13px] font-bold text-[#17191E]"
              >
                닉네임
              </label>

              <div className="flex h-12 items-center rounded-lg border border-[#E3E6EB] bg-white px-3">
                <input
                  id="edit-nickname"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setNicknameMessage("");
                  }}
                  className="min-w-0 flex-1 text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={handleNicknameCheck}
                  className="ml-2 shrink-0 text-xs font-extrabold text-[#2563EB]"
                >
                  중복 확인
                </button>
              </div>

              {nicknameMessage && (
                <p className="mt-2 text-xs text-[#969DA8]">
                  {nicknameMessage}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="edit-email"
                className="mb-2 block text-[13px] font-bold text-[#17191E]"
              >
                이메일
              </label>

              <input
                id="edit-email"
                type="email"
                value={email}
                readOnly
                className="h-12 w-full rounded-lg border border-[#E3E6EB] bg-white px-3 text-sm text-[#606774] outline-none"
              />
            </div>
          </div>
        </div>

        {/* 하단 회원 탈퇴 */}
        <div className="mt-auto pt-16">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#D92D20] bg-red-50 px-5 py-4">
            <div>
              <p className="text-sm font-bold text-[#D92D20]">회원 탈퇴</p>

              <p className="mt-1 text-[11px] font-normal text-[#D92D20]">
                탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert("회원 탈퇴 기능은 아직 구현되지 않았습니다.")}
              className="rounded-lg border border-[#D92D20] bg-white px-4 py-2 text-sm font-extrabold text-[#D92D20]"
            >
              회원 탈퇴
            </button>
          </div>

          <div className="mt-4 text-right">
            <Link
              to="/mypage"
              className="text-xs text-[#606774] underline"
            >
              내 정보로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
