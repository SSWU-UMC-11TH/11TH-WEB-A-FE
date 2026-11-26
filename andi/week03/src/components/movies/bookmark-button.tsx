
"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../../stores/auth-store";
import {
  useFavoriteMutation,
  useFavoriteStatus,
} from "../../hooks/use-favorites";
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
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);

  const favoriteQuery = useFavoriteStatus(movieId);
  const favoriteMutation = useFavoriteMutation(movieId);

  const isBookmarked = accessToken
    ? (favoriteQuery.data ?? false)
    : false;

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

  const handleClick = () => {
    if (!accessToken) {
      router.push("/login");
      return;
    }

    if (
      favoriteQuery.isPending ||
      favoriteQuery.isError ||
      favoriteMutation.isPending
    ) {
      return;
    }

    favoriteMutation.mutate(isBookmarked);
  };

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isBookmarked}
      onClick={handleClick}
      disabled={
        Boolean(accessToken) &&
        (favoriteQuery.isPending ||
          favoriteQuery.isError ||
          favoriteMutation.isPending)
      }
      className={cn(
        buttonStyles[variant],
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
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
