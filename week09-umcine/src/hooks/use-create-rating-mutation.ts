import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRating } from '../api/ratings/create-rating';

export function useCreateRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRating,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ratings'],
      });
      alert('평점이 등록되었습니다!');
    },
    onError: () => {
      alert('평점 등록에 실패했어요.');
    },
  });
}
