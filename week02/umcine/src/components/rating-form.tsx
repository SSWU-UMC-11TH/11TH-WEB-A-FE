import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useMeQuery } from "../hooks/use-me-query";
import { useAuthStore } from "../stores/auth-store";
import { ratingQueries } from "../queries/rating-queries";
import {
  useCreateRatingMutation,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
} from "../hooks/use-rating-mutation";
import { cn } from "../utils/cn";

interface RatingFormProps {
  movieId: number;
}

export function RatingForm({ movieId }: RatingFormProps) {
  const navigate = useNavigate();

  const accessToken = useAuthStore(
    (state) => state.accessToken,
  );

  const meQuery = useMeQuery();
  const memberId = meQuery.data?.memberId ?? 0;

  const myRatingQuery = useQuery({
    ...ratingQueries.myMovie(memberId, movieId),
    enabled: Boolean(accessToken) && memberId > 0,
  });

  const myRating = myRatingQuery.data;

  const [editedRating, setRating] = useState<number | null>(null);
  const [editedReview, setReview] = useState<string | null>(null);

  const rating = editedRating ?? myRating?.score ?? 0;
  const review = editedReview ?? myRating?.comment ?? "";

  const createMutation = useCreateRatingMutation();
  const updateMutation = useUpdateRatingMutation();
  const deleteMutation = useDeleteRatingMutation();

  const isPending =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const canEdit =
    Boolean(accessToken) &&
    myRatingQuery.isSuccess &&
    !isPending;

  function resetForm() {
    setRating(null);
    setReview(null);
  }

  function handleSave() {
    if (!canEdit || rating < 1 || rating > 5) return;

    if (myRating) {
      updateMutation.mutate(
        {
          ratingId: myRating.ratingId,
          body: {
            score: rating,
            comment: review.trim(),
          },
        },
        { onSuccess: resetForm },
      );
    } else {
      createMutation.mutate(
        {
          movieId,
          score: rating,
          comment: review.trim(),
        },
        { onSuccess: resetForm },
      );
    }
  }

  function handleDelete() {
    if (!myRating || !canEdit) return;

    if (!confirm("평점을 삭제하시겠어요?")) return;

    deleteMutation.mutate(myRating.ratingId, {
      onSuccess: resetForm,
    });
  }

  return (
    <aside className="w-full min-w-0 border-t border-[#E3E6EB] pt-6 xl:w-[390px] xl:shrink-0 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-8">
      <h2 className="text-[21px] font-bold text-[#17191E]">
        내 평점
      </h2>

      {!accessToken ? (
        <div className="mt-4">
          <p className="text-sm text-[#606774]">
            로그인 후 평점을 작성할 수 있어요.
          </p>

          <button
            type="button"
            onClick={() => navigate({ to: "/login" })}
            className="mt-3 h-[42px] w-full rounded-lg bg-[#2563EB] text-sm font-bold text-white"
          >
            로그인
          </button>
        </div>
      ) : meQuery.isError || myRatingQuery.isError ? (
        <p className="mt-4 text-sm text-red-500">
          평점 정보를 불러오지 못했어요.
        </p>
      ) : meQuery.isLoading || myRatingQuery.isPending ? (
        <p className="mt-4 text-sm text-[#969DA8]">
          평점을 불러오는 중이에요...
        </p>
      ) : (
        <>
          <p className="mt-1 text-xs text-[#969DA8]">
            별점을 클릭하거나 선택하세요.
          </p>

          <div className="mt-3 flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`${star}점`}
                disabled={!canEdit}
                onClick={() => setRating(star)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg border border-[#E3E6EB] bg-white text-2xl text-[#606774]",
                  star <= rating &&
                    "border-[#2563EB] text-[#2563EB]",
                )}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={review}
            disabled={!canEdit}
            onChange={(event) => setReview(event.target.value)}
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            className="mt-3 h-[105px] w-full resize-none rounded-lg border border-[#E3E6EB] bg-white p-4 text-sm outline-none placeholder:text-[#969DA8]"
          />

          <button
            type="button"
            onClick={handleSave}
            disabled={!canEdit || rating === 0}
            className="mt-3 h-[42px] w-full rounded-lg bg-[#17191E] text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending
              ? "처리 중..."
              : myRating
                ? "평점 수정"
                : "평점 저장"}
          </button>

          {myRating && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={!canEdit}
              className="mt-2 h-[42px] w-full rounded-lg border border-[#D92D20] bg-white text-sm font-bold text-[#D92D20] disabled:opacity-50"
            >
              평점 삭제
            </button>
          )}
        </>
      )}
    </aside>
  );
}