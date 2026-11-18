import { authApi } from '../auth-api';

export interface Rating {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getMemberRatings(memberId: number) {
  return authApi.get(`members/${memberId}/ratings`).json<Rating[]>();
}
