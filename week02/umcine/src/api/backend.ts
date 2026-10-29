import ky from "ky";
import { env } from "../config/env";

export const backend = ky.create({
  prefix: `${env.backendApiBaseUrl.replace(/\/$/, "")}/`,
  timeout: 10000,
});