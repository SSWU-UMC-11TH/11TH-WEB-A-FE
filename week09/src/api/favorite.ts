import { getAuthBackend } from "./auth-api";
import type {
  CreateFavoriteRequest,
  FavoriteResponse,
  FavoriteListResponse,
  FavoriteStatusResponse,
  DeleteFavoriteResponse,
} from "../types/favorite";

// 내 즐겨찾기 목록
export async function getFavorites() {
  const response = await getAuthBackend()
    .get("favorites")
    .json<FavoriteListResponse>();

  return response.result;
}

// 즐겨찾기 여부
export async function getFavoriteStatus(movieId: number) {
  const response = await getAuthBackend()
    .get(`favorites/${movieId}`)
    .json<FavoriteStatusResponse>();

  return response.result;
}

// 즐겨찾기 등록
export function createFavorite(body: CreateFavoriteRequest) {
  return getAuthBackend()
    .post("favorites", { json: body })
    .json<FavoriteResponse>();
}

// 즐겨찾기 삭제
export function deleteFavorite(movieId: number) {
  return getAuthBackend()
    .delete(`favorites/${movieId}`)
    .json<DeleteFavoriteResponse>();
}