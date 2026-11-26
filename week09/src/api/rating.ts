import { getBackend } from "./backend";
import { getAuthBackend } from "./auth-api";
import type {
  RatingResponse,
  CreateRatingRequest,
  UpdateRatingRequest,
  CreateRatingResponse,
  RatingMutationResponse,
} from "../types/member";

import type { PageResponse } from "../types/member";

// 회원 평점 조회
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

// 평점 등록
export function createRating(body: CreateRatingRequest) {
  return getAuthBackend()
    .post("ratings", { json: body })
    .json<CreateRatingResponse>();
}

// 평점 수정
export function updateRating(
  ratingId: number,
  body: UpdateRatingRequest,
) {
  return getAuthBackend()
    .patch(`ratings/${ratingId}`, { json: body })
    .json<RatingMutationResponse>();
}

// 평점 삭제
export async function deleteRating(ratingId: number) {
  await getAuthBackend().delete(`ratings/${ratingId}`);
}