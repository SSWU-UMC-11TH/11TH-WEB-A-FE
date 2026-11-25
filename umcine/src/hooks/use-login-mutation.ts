import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { login } from '../api/auth/login';
import { useAuthStore } from '../stores/auth-store';

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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

      // 이전 계정의 회원 정보 캐시 제거
      queryClient.removeQueries({
        queryKey: ['members'],
      });

      // 이전 계정의 즐겨찾기 캐시 제거
      queryClient.removeQueries({
        queryKey: ['favorites'],
      });

      // 이전 계정의 평점 캐시 제거
      queryClient.removeQueries({
        queryKey: ['ratings'],
      });

      // 새 로그인 토큰 저장
      setAccessToken(response.result.accessToken);

      navigate({ to: '/' });
    },
    onError: () => {
      alert('로그인에 실패했어요. 다시 시도해 주세요.');
    },
  });
}
