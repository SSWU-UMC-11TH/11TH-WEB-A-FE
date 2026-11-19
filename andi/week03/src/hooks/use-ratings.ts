import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createRating,
  deleteRating,
  getMemberRatings,
  updateRating,
  type RatingRequest,
} from "../api/ratings";

export function useMemberRatings(memberId: number | null) {
  return useQuery({
    queryKey: ["ratings", "member", memberId],
    queryFn: () => getMemberRatings(memberId!),
    enabled: memberId !== null && memberId > 0,
  });
}

export function useCreateRating(movieId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RatingRequest) =>
      createRating(movieId, body),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });
    },

    onError: () => {
      alert("평점 등록에 실패했습니다.");
    },
  });
}

export function useUpdateRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ratingId,
      body,
    }: {
      ratingId: number;
      body: RatingRequest;
    }) => updateRating(ratingId, body),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });
    },

    onError: () => {
      alert("평점 수정에 실패했습니다.");
    },
  });
}

export function useDeleteRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRating,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });
    },

    onError: () => {
      alert("평점 삭제에 실패했습니다.");
    },
  });
}