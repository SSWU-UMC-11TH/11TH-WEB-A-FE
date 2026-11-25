
import ky from "ky";

const baseUrl = import.meta.env.VITE_UMC_API_BASE_URL;

if (!baseUrl) {
  throw new Error("UMC API 환경 변수가 필요해요.");
}

export const apiClient = ky.create({
  baseUrl: `${baseUrl.replace(/\/$/, "")}/`,
});
