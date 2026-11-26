import { getBackend } from "./backend";
import type {
  AvailabilityResponse,
  MemberInfo,
  MeResponse,
  PageResponse,
  RatingResponse,
  SignupRequest,
  SignupResponse,
  UpdateMeRequest,
  UpdateMeResponse,
} from "../types/member";
import { getAuthBackend } from "./auth-api";

// 닉네임 중복 확인
export function checkNickname(nickname: string) {
  return getBackend()
    .get(`members/nickname/${encodeURIComponent(nickname)}`)
    .json<AvailabilityResponse>();
}

// 이메일 중복 확인
export function checkEmail(email: string) {
  return getBackend()
    .get(`members/email/${encodeURIComponent(email)}`)
    .json<AvailabilityResponse>();
}

// 회원가입
export function signup(body: SignupRequest) {
  return getBackend()
    .post("members", { json: body })
    .json<SignupResponse>();
}

// 회원 평가 목록 조회
export function getMemberRatings(
  memberId: number,
  page = 0,
  size = 10,
) {
  return getAuthBackend()
    .get(`members/${memberId}/ratings`, {
      searchParams: { page, size },
    })
    .json<PageResponse<RatingResponse>>();
}

export async function getMe(): Promise<MemberInfo> {
  const response = await getAuthBackend()
    .get("members/me")
    .json<MeResponse>();

  return response.result;
}

export function updateMe(body: UpdateMeRequest) {
  return getAuthBackend()
    .patch("members/me", { json: body })
    .json<UpdateMeResponse>();
}