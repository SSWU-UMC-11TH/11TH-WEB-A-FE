import { getBackend } from "./backend";
import type {
  AvailabilityResponse,
  PageResponse,
  RatingResponse,
} from "../types/member";

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

// 회원 평가 목록 조회
export function getMemberRatings(
  memberId: number,
  page = 0,
  size = 10,
) {
  return getBackend()
    .get(`members/${memberId}/ratings`, {
      searchParams: { page, size },
    })
    .json<PageResponse<RatingResponse>>();
}