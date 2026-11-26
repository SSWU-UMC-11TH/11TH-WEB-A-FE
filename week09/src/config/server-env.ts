import "server-only";

export const serverEnv = {
  tmdbApiBaseUrl: process.env.TMDB_API_BASE_URL!,
  tmdbAccessToken: process.env.TMDB_ACCESS_TOKEN!,
};