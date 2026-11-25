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
    onSuccess: async (response) => {
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

      // 새 로그인 토큰 저장
      setAccessToken(response.result.accessToken);

      router.push('/');
    },
    onError: () => {
      alert('로그인에 실패했어요. 다시 시도해 주세요.');
    },
  });
}
