import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";

interface BookmarkStore {
  bookmarkedMovieIds: number[];
  toggleBookmark: (movieId: number) => void;
}

const safeStorage: StateStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch {
      console.warn("북마크 저장소를 읽을 수 없습니다.");
      return null;
    }
  },

  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
    } catch {
      console.warn("북마크를 저장하지 못했습니다.");
    }
  },

  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {
      console.warn("북마크 저장소에서 삭제하지 못했습니다.");
    }
  },
};

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set) => ({
      bookmarkedMovieIds: [],

      toggleBookmark: (movieId) =>
        set((state) => ({
          bookmarkedMovieIds: state.bookmarkedMovieIds.includes(movieId)
            ? state.bookmarkedMovieIds.filter((id) => id !== movieId)
            : [...state.bookmarkedMovieIds, movieId],
        })),
    }),
    {
      name: "umcine-bookmark-store",
      storage: createJSONStorage(() => safeStorage),

      partialize: (state) => ({
        bookmarkedMovieIds: state.bookmarkedMovieIds,
      }),
    },
  ),
);