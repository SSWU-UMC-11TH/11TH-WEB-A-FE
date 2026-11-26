const backendApiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

if (!backendApiBaseUrl) {
  throw new Error("BACKEND_API_BASE_URL 환경 변수가 필요해요.");
}

export const env = {
  backendApiBaseUrl,
};