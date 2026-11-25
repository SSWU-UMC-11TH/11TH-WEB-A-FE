import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRating } from '../api/ratings/update-rating';

export function useUpdateRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRating,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ratings'],
      });
      alert('평점이 수정되었습니다!');
    },
    onError: () => {
      alert('평점 수정에 실패했어요.');
    },
  });
}
