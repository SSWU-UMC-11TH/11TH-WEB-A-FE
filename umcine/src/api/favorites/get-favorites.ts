import { authApi } from '../auth-api';

export interface Favorite {
  movieId: number;
}

interface FavoritesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Favorite[];
}

export async function getFavorites() {
  const response = await authApi.get('favorites').json<FavoritesResponse>();

  return response.result;
}
