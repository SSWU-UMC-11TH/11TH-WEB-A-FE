import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../stores/auth-store";
import { favoriteQueries } from "../queries/favorite-queries";
import {
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
} from "../hooks/use-favorite-mutation";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  variant?: "icon" | "detail";
}

export function BookmarkButton({
  movieId,
  variant = "icon",
}: BookmarkButtonProps) {
  const navigate = useNavigate();

  const accessToken = useAuthStore(
    (state) => state.accessToken,
  );

  // 즐겨찾기 여부 조회
  const favoriteStatusQuery = useQuery({
    ...favoriteQueries.status(movieId),
    enabled: Boolean(accessToken) && movieId > 0,
    retry: false,
  });

  const createFavoriteMutation = useCreateFavoriteMutation();
  const deleteFavoriteMutation = useDeleteFavoriteMutation();

  const isBookmarked =
    Boolean(accessToken) &&
    (favoriteStatusQuery.data?.isFavorite ?? false);

  const isPending =
    createFavoriteMutation.isPending ||
    deleteFavoriteMutation.isPending;

  const isDisabled =
    isPending ||
    (Boolean(accessToken) && !favoriteStatusQuery.isSuccess);

  function handleToggleBookmark(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    // 비로그인 사용자
    if (!accessToken) {
      alert("로그인이 필요한 기능이에요.");
      navigate({ to: "/login" });
      return;
    }

    if (isDisabled) return;

    if (isBookmarked) {
      deleteFavoriteMutation.mutate(movieId);
    } else {
      createFavoriteMutation.mutate({ movieId });
    }
  }

  if (variant === "detail") {
    return (
      <button
        type="button"
        onClick={handleToggleBookmark}
        disabled={isDisabled}
        className={cn(
          "mt-5 flex h-[42px] items-center gap-2 rounded-lg px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50",
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

        {isPending
          ? "처리 중..."
          : isBookmarked
            ? "즐겨찾기 해제"
            : "즐겨찾기"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggleBookmark}
      disabled={isDisabled}
      aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
      className={cn(
        "absolute top-[7.5px] right-[6px] flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-white bg-[#17191e] p-0 disabled:cursor-not-allowed disabled:opacity-50",
        isBookmarked && "border-0 bg-[#2563eb]",
      )}
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