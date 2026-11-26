import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "../api/auth";
import { useAuthStore } from "../stores/auth-store";
import { getSafeCallbackUrl } from "@/utils/get-safe-callback-url";

export function useLoginMutation(callbackUrl = "/") {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      queryClient.clear();
      setAccessToken(response.result.accessToken);

      alert("로그인에 성공했어요.");

      queryClient.invalidateQueries({
        queryKey: ["members", "me"],
      });

      router.replace(getSafeCallbackUrl(callbackUrl));
    },
    onError: () => {
      alert("로그인에 실패했어요. 다시 시도해 주세요.");
    },
  });
}