import { backend } from "./backend";
import type { AvailabilityResponse, PageResponse, RatingResponse } from "../types/members";

export function checkNickname(nickname: string) {
  return backend
    .get(`members/nickname/${encodeURIComponent(nickname)}`)
    .json<AvailabilityResponse>();
}

export function checkEmail(email: string) {
  return backend
    .get(`members/email/${encodeURIComponent(email)}`)
    .json<AvailabilityResponse>();
}

export function getMemberRatings(
  memberId: number,
  page = 0,
  size = 10,
) {
  return backend
    .get(`members/${memberId}/ratings`, {
      searchParams: { page, size },
    })
    .json<PageResponse<RatingResponse>>();
}
