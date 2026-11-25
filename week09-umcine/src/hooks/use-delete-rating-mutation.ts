import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRating } from '../api/ratings/delete-rating';

export function useDeleteRatingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRating,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ratings'],
      });
      alert('평점이 삭제되었습니다!');
    },
    onError: () => {
      alert('평점 삭제에 실패했어요.');
    },
  });
}
