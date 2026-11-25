"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export function AuthGuard({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && !accessToken) {
      router.replace("/login");
    }
  }, [hasHydrated, accessToken, router]);

  if (!hasHydrated) {
    return (
      <p className="py-20 text-center text-sm text-gray-500">
        로그인 정보를 확인하는 중입니다...
      </p>
    );
  }

  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
}