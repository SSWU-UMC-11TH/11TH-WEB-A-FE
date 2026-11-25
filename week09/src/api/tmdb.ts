import ky from "ky";
import { env } from "../config/env";

export const tmdb = ky.create({
  prefix: env.tmdbApiBaseUrl,
  headers: {
    Authorization: `Bearer ${env.tmdbAccessToken}`,
    accept: "application/json",
  },
  timeout: 10000,
});