
import { useAuthStore } from "../stores/auth-store";

interface JwtPayload {
  sub?: string;
}

export function getMemberId(): number | null {
  const token = useAuthStore.getState().accessToken;

  if (!token) return null;

  try {
    const encodedPayload = token.split(".")[1];

    if (!encodedPayload) return null;

    const base64 = encodedPayload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const payload = JSON.parse(atob(base64)) as JwtPayload;

    if (!payload.sub || !/^[1-9]\d*$/.test(payload.sub)) {
      return null;
    }

    const memberId = Number(payload.sub);

    return Number.isSafeInteger(memberId) ? memberId : null;
  } catch {
    return null;
  }
}
