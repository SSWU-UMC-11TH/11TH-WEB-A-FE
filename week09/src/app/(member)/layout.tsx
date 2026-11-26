import type { ReactNode } from "react";
import { AuthGuard } from "@/components/layout/auth-guard";

export default function MemberLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}