
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "../../stores/auth-store";
import { getMemberId } from "../../utils/get-member-id";
import {
  useMemberRatings,
  useCreateRating,
  useUpdateRating,
  useDeleteRating,
} from "../../hooks/use-ratings";

interface MovieRatingSectionProps {
  movieId: number;
}

export function MovieRatingSection({
  movieId,
}: MovieRatingSectionProps) {
  const accessToken = useAuthStore(
    (state) => state.accessToken,
  );

  const memberId = accessToken ? getMemberId() : null;

  return (
    <MovieRatingContent
      key={`${memberId}:${movieId}`}
      movieId={movieId}
      accessToken={accessToken}
      memberId={memberId}
    />
  );
}

interface MovieRatingContentProps {
  movieId: number;
  accessToken: string | null;
  memberId: number | null;
}

function MovieRatingContent({
  movieId,
  accessToken,
  memberId,
}: MovieRatingContentProps) {
  const ratingsQuery = useMemberRatings(memberId);
  const createMutation = useCreateRating(movieId);
  const updateMutation = useUpdateRating();
  const deleteMutation = useDeleteRating();

  const myRating = ratingsQuery.data?.find(
    (rating) => rating.movieId === movieId,
  );

  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (myRating && !isEditing) {
      setScore(myRating.score);
      setComment(myRating.comment ?? "");
    }
  }, [myRating, isEditing]);

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting || score < 1 || score > 5) {
      return;
    }

    const body = {
      score,
      comment: comment.trim(),
    };

    if (myRating) {
      updateMutation.mutate(
        { ratingId: myRating.ratingId, body },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
        },
      );
    } else {
      createMutation.mutate(body);
    }
  };

  const handleDelete = () => {
    if (!myRating || isSubmitting) return;

    if (!window.confirm("평점을 삭제하시겠습니까?")) {
      return;
    }

    deleteMutation.mutate(myRating.ratingId, {
      onSuccess: () => {
        setScore(5);
        setComment("");
        setIsEditing(false);
      },
    });
  };

  return (
    <section className="mt-10 border-t border-gray-200 pt-8">
      <h2 className="text-xl font-bold text-gray-900">
        내 영화 평점
      </h2>

      {!accessToken ? (
        <div className="mt-5 rounded-lg bg-white p-6">
          <p className="text-sm text-gray-600">
            평점을 남기려면 로그인이 필요합니다.
          </p>

          <Link
            href="/login"
            className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
          >
            로그인하기
          </Link>
        </div>
      ) : memberId === null ? (
        <p className="mt-5 text-sm text-red-500">
          회원 정보를 확인할 수 없습니다.
        </p>
      ) : ratingsQuery.isPending ? (
        <p className="mt-5 text-sm text-gray-500">
          평점을 불러오는 중입니다...
        </p>
      ) : ratingsQuery.isError ? (
        <p role="alert" className="mt-5 text-sm text-red-500">
          평점 조회에 실패했습니다.
        </p>
      ) : myRating && !isEditing ? (
        <div className="mt-5 rounded-lg bg-white p-6 shadow-sm">
          <p className="text-lg font-bold text-yellow-500">
            {"★".repeat(myRating.score)}
            {"☆".repeat(5 - myRating.score)}
          </p>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-700">
            {myRating.comment || "작성한 후기가 없습니다."}
          </p>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              수정
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting}
              className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 disabled:opacity-50"
            >
              {deleteMutation.isPending
                ? "삭제 중..."
                : "삭제"}
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-5 rounded-lg bg-white p-6 shadow-sm"
        >
          <label
            htmlFor="movie-rating-score"
            className="block text-sm font-semibold text-gray-900"
          >
            별점
          </label>

          <select
            id="movie-rating-score"
            value={score}
            onChange={(event) =>
              setScore(Number(event.target.value))
            }
            disabled={isSubmitting}
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value}점
              </option>
            ))}
          </select>

          <label
            htmlFor="movie-rating-comment"
            className="mt-5 block text-sm font-semibold text-gray-900"
          >
            후기
          </label>

          <textarea
            id="movie-rating-comment"
            value={comment}
            onChange={(event) =>
              setComment(event.target.value)
            }
            disabled={isSubmitting}
            rows={4}
            placeholder="영화에 대한 감상을 남겨주세요."
            className="mt-2 w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm"
          />

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {isSubmitting
                ? "저장 중..."
                : myRating
                  ? "수정 완료"
                  : "평점 등록"}
            </button>

            {isEditing && (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setScore(myRating?.score ?? 5);
                  setComment(myRating?.comment ?? "");
                  setIsEditing(false);
                }}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600"
              >
                취소
              </button>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
