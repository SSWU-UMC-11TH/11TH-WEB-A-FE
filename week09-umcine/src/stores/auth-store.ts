'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  loginAttemptId: number;
  startLoginAttempt: () => number;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      accessToken: null,
      setAccessToken: (accessToken) => set({ accessToken }),

      loginAttemptId: 0,

      startLoginAttempt: () => {
        const nextId = get().loginAttemptId + 1;
        set({ loginAttemptId: nextId });
        return nextId;
      },
    }),
    {
      name: 'umcine-auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ accessToken: state.accessToken }),
      skipHydration: true,
    },
  ),
);
