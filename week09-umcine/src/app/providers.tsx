'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuthStore } from '../stores/auth-store';
import { useBookmarkStore } from '../stores/bookmark-store';
export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
          },
        },
      }),
  );

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state, prevState) => {
      if (prevState.accessToken && state.accessToken === null) {
        queryClient.removeQueries({ queryKey: ['members'] });
        queryClient.removeQueries({ queryKey: ['favorites'] });
        queryClient.removeQueries({ queryKey: ['ratings'] });
      }
    });

    void useAuthStore.persist.rehydrate();
    void useAuthStore.persist.rehydrate();
    void useBookmarkStore.persist.rehydrate();
    return unsubscribe;
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
