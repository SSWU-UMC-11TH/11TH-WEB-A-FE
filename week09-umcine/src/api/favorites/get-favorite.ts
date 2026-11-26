import { authApi } from '../auth-api';

interface FavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    isFavorite: boolean;
  };
}

export async function getFavorite(movieId: number) {
  const response = await authApi
    .get(`favorites/${movieId}`)
    .json<FavoriteResponse>();

  return response.result;
}
