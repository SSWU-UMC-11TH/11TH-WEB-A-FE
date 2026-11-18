import { getBackend } from "./backend";
import type { LoginRequest, LoginResponse } from "../types/auth";

export function login(body: LoginRequest) {
  return getBackend()
    .post("auth/login", { json: body })
    .json<LoginResponse>();
}