import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/members";
import type { MemberInfo } from "../types/member";
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

    onSuccess: async (response, _, context) => {
      const isSameSession = () =>
        !!context?.accessToken &&
        context.accessToken ===
          useAuthStore.getState().accessToken;

      if (!isSameSession()) return;

      await queryClient.cancelQueries({
        queryKey: ["members", "me"],
      });

      if (!isSameSession()) return;

      queryClient.setQueryData<MemberInfo>(
        ["members", "me"],
        response.result,
      );

      alert(response.message);
    },

    onError: (_, __, context) => {
      if (
        !context?.accessToken ||
        context.accessToken !==
          useAuthStore.getState().accessToken
      ) {
        return;
      }

      alert("정보 수정에 실패했어요. 닉네임을 확인해 주세요.");
    },
  });
}