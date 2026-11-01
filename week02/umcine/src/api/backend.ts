import ky from "ky";
import { env } from "../config/env";

let client: ReturnType<typeof ky.create> | undefined;

export function getBackend() {
  if (!env.backendApiBaseUrl) {
    throw new Error("VITE_BACKEND_API_BASE_URL 환경 변수가 필요합니다.");
  }

  return (client ??= ky.create({
    prefix: `${env.backendApiBaseUrl.replace(/\/$/, "")}/`,
    timeout: 10000,
  }));
}