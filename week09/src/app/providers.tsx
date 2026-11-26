"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = getQueryClient();

  useEffect(() => {
    async function hydrateAuth() {
      try {
        await useAuthStore.persist.rehydrate();
      } catch (error) {
        console.error("로그인 상태 복원 실패:", error);
      } finally {
        useAuthStore.getState().setHasHydrated(true);
      }
    }

    void hydrateAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}