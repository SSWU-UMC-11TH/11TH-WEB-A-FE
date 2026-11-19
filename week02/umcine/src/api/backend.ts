import ky from "ky";
import { env } from "../config/env";
import { useAuthStore } from "../stores/auth-store";

let client: ReturnType<typeof ky.create> | undefined;

export function getBackend() {
  if (!env.backendApiBaseUrl) {
    throw new Error("VITE_BACKEND_API_BASE_URL 환경 변수가 필요합니다.");
  }

  return (client ??= ky.create({
    prefix: `${env.backendApiBaseUrl.replace(/\/$/, "")}/`,
    timeout: 10000,
    hooks: {
      beforeRequest: [
        ({ request }) => {
          const { accessToken } = useAuthStore.getState();

          if (accessToken) {
            request.headers.set(
              "Authorization",
              `Bearer ${accessToken}`
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
  }));
}