import { useAuthStore } from "../stores/auth-store";
import { apiClient } from "./api-client";

export const authApi = apiClient.extend({
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const accessToken = useAuthStore.getState().accessToken;

        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      ({ request, response }) => {
        if (response.status !== 401) return;

        const requestToken = request.headers.get("Authorization");
        const currentToken = useAuthStore.getState().accessToken;

        if (
          currentToken &&
          requestToken === `Bearer ${currentToken}`
        ) {
          useAuthStore.getState().setAccessToken(null);
        }
      },
    ],
  },
});