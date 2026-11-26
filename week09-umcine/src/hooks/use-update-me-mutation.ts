'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMe } from '../api/members/update-me';
import type { MemberInfo } from '../api/members/me';
import { useAuthStore } from '../stores/auth-store';

export function useUpdateMeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,

    onMutate: () => {
      return {
        accessToken: useAuthStore.getState().accessToken,
      };
    },

    onSuccess: async (response, _variables, context) => {
      const isSameSession = () =>
        !!context?.accessToken &&
        context.accessToken === useAuthStore.getState().accessToken;

      // 요청 당시 세션과 현재 세션 비교
      if (!isSameSession()) return;

      await queryClient.cancelQueries({
        queryKey: ['members', 'me'],
      });

      // 조회 취소 중 세션이 변경되었는지 다시 확인
      if (!isSameSession()) return;

      queryClient.setQueryData<MemberInfo>(['members', 'me'], response.result);

      alert('내 정보 수정에 성공했어요.');
    },

    onError: (_error, _variables, context) => {
      if (
        !context?.accessToken ||
        context.accessToken !== useAuthStore.getState().accessToken
      ) {
        return;
      }

      alert('내 정보 수정에 실패했어요. 다시 시도해 주세요.');
    },
  });
}
