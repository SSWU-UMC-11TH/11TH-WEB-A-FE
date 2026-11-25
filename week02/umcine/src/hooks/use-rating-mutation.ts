import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createRating,
  updateRating,
  deleteRating,
} from "../api/rating";

import type { UpdateRatingRequest } from "../types/member";

export function useCreateRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRating,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });

      alert("평점을 등록했어요.");
    },

    onError: () => {
      alert("평점 등록에 실패했어요.");
    },
  });
}

export function useUpdateRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ratingId,
      body,
    }: {
      ratingId: number;
      body: UpdateRatingRequest;
    }) => updateRating(ratingId, body),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });

      alert("평점을 수정했어요.");
    },

    onError: () => {
      alert("평점 수정에 실패했어요.");
    },
  });
}

export function useDeleteRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRating,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ratings"],
      });

      alert("평점을 삭제했어요.");
    },

    onError: () => {
      alert("평점 삭제에 실패했어요.");
    },
  });
}