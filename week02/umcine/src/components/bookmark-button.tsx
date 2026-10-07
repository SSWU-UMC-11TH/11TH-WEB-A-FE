import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  variant?: "icon" | "detail";
}

export function BookmarkButton({
  movieId,
  variant = "icon",
}: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );

  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark,
  );

  if (variant === "detail") {
    return (
      <button
        type="button"
        onClick={() => toggleBookmark(movieId)}
        className={cn(
          "mt-5 flex h-[42px] items-center gap-2 rounded-lg px-5 text-sm font-bold text-white",
          isBookmarked ? "bg-[#17191E]" : "bg-[#2563EB]",
        )}
      >
        <img
          src={
            isBookmarked
              ? "/icons/bookmark.svg"
              : "/icons/bookmark-outline.svg"
          }
          alt=""
          className="h-4 w-4 brightness-0 invert"
        />
        {isBookmarked ? "즐겨찾기 해제" : "즐겨찾기"}
      </button>
    );
  }

  return (
    <button
      className={cn(
        "absolute top-[7.5px] right-[6px] flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-white bg-[#17191e] p-0",
        isBookmarked && "border-0 bg-[#2563eb]",
      )}
      type="button"
      onClick={() => toggleBookmark(movieId)}
      aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
    >
      <img
        className="block h-6 w-6 brightness-0 invert"
        src={
          isBookmarked
            ? "/icons/bookmark.svg"
            : "/icons/bookmark-outline.svg"
        }
        alt=""
      />
    </button>
  );
}