"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && !accessToken) {
      const callbackUrl = pathname + window.location.search;

      router.replace(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
  }, [hasHydrated, accessToken, router, pathname]);

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
