import { authApi } from '../auth-api';

export interface UpdateRatingRequest {
  ratingId: number;
  rating: number;
  review: string;
}

export function updateRating({ ratingId, ...body }: UpdateRatingRequest) {
  return authApi.patch(`ratings/${ratingId}`, { json: body }).json();
}
