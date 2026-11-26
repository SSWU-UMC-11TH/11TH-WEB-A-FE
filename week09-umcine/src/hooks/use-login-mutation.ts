'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { login } from '../api/auth/login';
import { useAuthStore } from '../stores/auth-store';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: login,

    onMutate: () => {
      const attemptId = useAuthStore.getState().startLoginAttempt();

      return { attemptId };
    },

    onSuccess: async (response, _variables, context) => {
      const isLatestAttempt = () =>
        context?.attemptId === useAuthStore.getState().loginAttemptId;

      if (!isLatestAttempt()) return;

      // 이전 계정의 진행 중인 조회 취소
      await queryClient.cancelQueries({
        queryKey: ['members'],
      });

      await queryClient.cancelQueries({
        queryKey: ['favorites'],
      });

      await queryClient.cancelQueries({
        queryKey: ['ratings'],
      });

      // 조회 취소 중 새로운 로그인 요청이 발생했는지 확인
      if (!isLatestAttempt()) return;

      // 이전 계정의 캐시 제거
      queryClient.removeQueries({
        queryKey: ['members'],
      });

      queryClient.removeQueries({
        queryKey: ['favorites'],
      });

      queryClient.removeQueries({
        queryKey: ['ratings'],
      });

      // 최신 로그인 요청인지 다시 확인
      if (!isLatestAttempt()) return;

      // 새 로그인 토큰 저장
      setAccessToken(response.result.accessToken);

      router.push('/');
    },

    onError: (_error, _variables, context) => {
      if (context?.attemptId !== useAuthStore.getState().loginAttemptId) {
        return;
      }

      alert('로그인에 실패했어요. 다시 시도해 주세요.');
    },
  });
}
