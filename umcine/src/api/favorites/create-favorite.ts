import { authApi } from '../auth-api';

export interface CreateFavoriteRequest {
  movieId: number;
}

export function createFavorite(body: CreateFavoriteRequest) {
  return authApi.post('favorites', { json: body }).json();
}
