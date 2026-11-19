import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "../api/members";
import type { MemberInfo } from "../types/member";

export function useUpdateMeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,

    onSuccess: async (response) => {
      await queryClient.cancelQueries({
        queryKey: ["members", "me"],
      });

      queryClient.setQueryData<MemberInfo>(
        ["members", "me"],
        response.result,
      );

      alert(response.message);
    },

    onError: () => {
      alert("정보 수정에 실패했어요. 닉네임을 확인해 주세요.");
    },
  });
}