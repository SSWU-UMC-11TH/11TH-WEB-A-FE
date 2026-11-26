import "server-only";
import ky from "ky";
import { serverEnv } from "../config/server-env";

export const tmdb = ky.create({
  prefix: serverEnv.tmdbApiBaseUrl,
  headers: {
    Authorization: `Bearer ${serverEnv.tmdbAccessToken}`,
    accept: "application/json",
  },
  timeout: 10000,
});