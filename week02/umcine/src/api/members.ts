import { backend } from "./backend";

export interface AvailabilityResponse {
  available: boolean;
}

export interface RatingResponse {
  ratingId: number;
  movieId: number;
  score: number;
  comment?: string | null;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

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
