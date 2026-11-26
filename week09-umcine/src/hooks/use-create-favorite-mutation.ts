import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFavorite } from '../api/favorites/create-favorite';

export function useCreateFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });
    },
    onError: () => {
      alert('즐겨찾기 등록에 실패했어요.');
    },
  });
}
