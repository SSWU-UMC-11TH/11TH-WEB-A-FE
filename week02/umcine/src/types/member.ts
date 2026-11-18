export interface AvailabilityResponse {
  available: boolean;
}

export interface RatingResponse {
  ratingId: number;
  movieId: number;
  score: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  comment: string;
}

export interface UpdateRatingRequest {
  score: number;
  comment: string;
}

export interface CreateRatingResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: number;
}

export interface RatingMutationResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface SignupResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberId: number;
    email: string;
    nickname: string;
  };
}

export interface MemberInfo {
  memberId: number;
  email: string;
  nickname: string;
  createdAt: string;
}

export interface MeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MemberInfo;
}

export interface UpdateMeRequest {
  nickname: string;
}

export interface UpdateMeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MemberInfo;
}