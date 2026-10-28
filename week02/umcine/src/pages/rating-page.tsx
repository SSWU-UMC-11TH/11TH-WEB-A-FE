import { useState } from "react";
import {
  getMemberRatings,
  type RatingResponse,
} from "../api/members";

export function MyRatingsPage() {
  const [memberId, setMemberId] = useState("1");
  const [ratings, setRatings] = useState<RatingResponse[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function loadRatings(nextPage = 0) {
    const id = Number(memberId);

    if (!Number.isInteger(id) || id <= 0) {
      setError("올바른 회원 ID를 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    setError("");
    setHasSearched(false);

    try {
      const response = await getMemberRatings(id, nextPage, 10);
      setRatings(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setPage(response.number);
      setHasSearched(true);
    } catch {
      setError("평점 목록을 불러오지 못했어요.");
      setRatings([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] px-5 py-12">
      <div className="mx-auto max-w-[700px]">
        <h1 className="mb-2 text-3xl font-extrabold text-[#17191E]">
          회원별 평점 모아보기
        </h1>

        <p className="mb-8 text-sm text-[#969DA8]">
          회원 ID를 입력하면 해당 회원의 영화 평점을 조회할 수 있어요.
        </p>

        <div className="flex gap-3">
          <input
            type="number"
            min="1"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="회원 ID"
            className="h-12 min-w-0 flex-1 rounded-lg border border-[#E3E6EB] bg-white px-4 text-sm outline-none"
          />
          <button
            type="button"
            disabled={isLoading}
            onClick={() => loadRatings(0)}
            className="rounded-lg bg-[#2563EB] px-6 text-sm font-bold text-white disabled:opacity-50"
          >
            {isLoading ? "조회 중" : "조회"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-500">{error}</p>
        )}

        {hasSearched && !error && (
          <section className="mt-8">
            <h2 className="mb-4 text-lg font-bold text-[#17191E]">
              평점 목록 ({totalElements}개)
            </h2>

            {ratings.length === 0 ? (
              <p className="rounded-lg bg-white p-6 text-sm text-[#969DA8]">
                등록된 평점이 없어요.
              </p>
            ) : (
              <div className="space-y-3">
                {ratings.map((rating) => (
                  <div
                    key={rating.ratingId}
                    className="rounded-lg border border-[#E3E6EB] bg-white p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#17191E]">
                        영화 ID: {rating.movieId}
                      </p>
                      <p className="font-bold text-[#2563EB]">
                        ★ {rating.score}
                      </p>
                    </div>

                    {rating.comment && (
                      <p className="mt-3 text-sm text-[#606774]">
                        {rating.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={page === 0 || isLoading}
                  onClick={() => loadRatings(page - 1)}
                  className="text-sm disabled:opacity-30"
                >
                  이전
                </button>

                <span className="text-sm">
                  {page + 1} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page >= totalPages - 1 || isLoading}
                  onClick={() => loadRatings(page + 1)}
                  className="text-sm disabled:opacity-30"
                >
                  다음
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
