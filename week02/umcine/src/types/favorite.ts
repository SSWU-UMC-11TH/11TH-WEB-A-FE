export interface Favorite {
  favoriteId: number;
  movieId: number;
  createdAt: string;
}

export interface CreateFavoriteRequest {
  movieId: number;
}

export interface FavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Favorite;
}

export interface FavoriteListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Favorite[];
}

export interface FavoriteStatusResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    isFavorite: boolean;
  };
}

export interface DeleteFavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
}