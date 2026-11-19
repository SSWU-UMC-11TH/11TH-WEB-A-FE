import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/members/update-me";
import type { MemberInfo } from "../api/members/me";
import { useAuthStore } from "../stores/auth-store";

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
      const currentToken = useAuthStore.getState().accessToken;

      if (!context?.accessToken || context.accessToken !== currentToken) {
        return;
      }

      await queryClient.cancelQueries({
        queryKey: ["members", "me"],
      });

      if (useAuthStore.getState().accessToken !== context.accessToken) {
        return;
      }

      queryClient.setQueryData<MemberInfo>(
        ["members", "me"],
        response.result,
      );

      alert("내 정보 수정에 성공했어요.");
    },
    onError: () => {
      alert("내 정보 수정에 실패했어요. 다시 시도해 주세요.");
    },
  });
}