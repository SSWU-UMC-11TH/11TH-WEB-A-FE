import { useBookmarkStore } from "../../stores/bookmark-store";
import { cn } from "../../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  variant?: "card" | "text" | "detail";
  className?: string;
}

function BookmarkButton({
  movieId,
  variant = "card",
  className,
}: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId)
  );

  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark
  );

  const label = isBookmarked ? "북마크 해제" : "북마크 추가";

  const buttonStyles = {
    card: cn(
      "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md",
      isBookmarked ? "bg-blue-600" : "bg-black/60"
    ),
    text: "ml-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600",
    detail:
      "mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white",
  };

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
      className={cn(buttonStyles[variant], className)}
    >
      <img
        src={
          isBookmarked
            ? "/icons/bookmark.svg"
            : "/icons/bookmark-outline.svg"
        }
        alt=""
        aria-hidden="true"
        className={cn(
          variant === "card" ? "h-5 w-5" : "h-4 w-4",
          variant !== "text" && "brightness-0 invert"
        )}
      />

      {variant !== "card" && label}
    </button>
  );
}

export default BookmarkButton;