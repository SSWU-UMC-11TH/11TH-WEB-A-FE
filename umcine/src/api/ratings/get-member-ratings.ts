import { authApi } from '../auth-api';

export interface Rating {
  ratingId: number;
  movieId: number;
  rating: number;
  review: string;
}

interface RatingsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Rating[];
}

export async function getMemberRatings(memberId: number) {
  const response = await authApi
    .get(`members/${memberId}/ratings`)
    .json<RatingsResponse>();

  return response.result;
}
