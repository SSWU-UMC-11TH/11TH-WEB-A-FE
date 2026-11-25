import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFavorite } from '../api/favorites/delete-favorite';

export function useDeleteFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });
    },
    onError: () => {
      alert('즐겨찾기 삭제에 실패했어요.');
    },
  });
}
