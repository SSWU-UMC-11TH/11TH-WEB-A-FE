import { useAuthStore } from "../stores/auth-store";
import { getBackend } from "./backend";

export function getAuthBackend() {
  return getBackend().extend({
    hooks: {
      beforeRequest: [
        ({ request }) => {
          const { accessToken } = useAuthStore.getState();

          if (accessToken) {
            request.headers.set(
              "Authorization",
              `Bearer ${accessToken}`,
            );
          }
        },
      ],
      afterResponse: [
        ({ request, response }) => {
          if (response.status !== 401) return;

          const { accessToken, setAccessToken } =
            useAuthStore.getState();

          if (
            accessToken &&
            request.headers.get("Authorization") ===
              `Bearer ${accessToken}`
          ) {
            setAccessToken(null);
          }
        },
      ],
    },
  });
}