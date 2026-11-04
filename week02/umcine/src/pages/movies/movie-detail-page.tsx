import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { getMovieDetail } from "../../api/movies";
import { toMovieDetail } from "../../api/movie-adapter";
import { cn } from "../../utils/cn";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadMovieDetail() {
      try {
        setIsLoading(true);
        setError(null);
        setMovie(null);

        const id = Number(movieId);

        if (!Number.isInteger(id) || id <= 0) {
          throw new Error("잘못된 영화 ID입니다.");
        }

        const response = await getMovieDetail(id);

        if (!cancelled) {
          setMovie(toMovieDetail(response));
        }
      } catch (error) {
        console.error("영화 상세 조회 실패:", error);

        if (!cancelled) {
          setError("영화 정보를 불러오지 못했어요.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadMovieDetail();

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  if (isLoading) {
    return (
      <main className="flex min-h-[calc(100vh-91px)] items-center justify-center bg-[#f7f8fa]">
        <p className="text-lg text-[#606774]">
          영화 정보를 불러오는 중이에요...
        </p>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="flex min-h-[calc(100vh-91px)] items-center justify-center bg-[#f7f8fa]">
        <p className="text-lg font-bold text-[#17191E]">
          {error ?? "영화를 찾을 수 없어요."}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-91px)] bg-[#f7f8fa]">
      {/* 영화 배경 이미지 */}
      <section className="relative h-[360px] overflow-hidden">
        {movie.backdropPath && (
          <img
            src={movie.backdropPath}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/35" />

        {/* 영화 목록으로 이동 */}
        <Link
          to="/"
          className="absolute top-8 left-4 z-10 flex items-center gap-1 whitespace-nowrap text-sm font-bold text-white no-underline md:left-20"
        >
          <img
            src="/icons/chevron-left.svg"
            alt=""
            className="h-6 w-6 brightness-0 invert"
          />
          <span>영화 목록</span>
        </Link>

        {/* 영화 기본 정보 */}
        <div className="absolute right-4 bottom-7 left-4 z-10 text-white md:right-auto md:left-20">
          <h1 className="text-3xl leading-[1.3] font-bold md:text-[46px]">
            {movie.title}
          </h1>

          <p className="mt-2 text-sm">{movie.originalTitle}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-bold">
            <span>{movie.releaseDate}</span>

            {movie.genres.length > 0 && <span>{movie.genres.join(" · ")}</span>}

            {movie.runtime && <span>{movie.runtime}</span>}
          </div>
        </div>
      </section>

      {/* 상세 정보 */}
      <section className="flex flex-col gap-6 px-4 py-6 xl:flex-row xl:gap-0 xl:px-[80px]">
        {/* 포스터 */}
        <div className="shrink-0">
          {movie.posterPath ? (
            <img
              src={movie.posterPath}
              alt={`${movie.title} 포스터`}
              className="h-[286px] w-[200px] rounded-[10px] object-cover shadow-md"
            />
          ) : (
            <div className="flex h-[286px] w-[200px] items-center justify-center rounded-[10px] bg-[#E3E6EB] text-sm text-[#969DA8]">
              포스터 없음
            </div>
          )}
        </div>

        {/* 영화 설명 */}
        <div className="min-w-0 flex-1 px-0 xl:px-8">
          <h2 className="text-[21px] font-bold text-[#17191E]">
            {movie.tagline || movie.title}
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#606774]">
            {movie.overview || "등록된 줄거리가 없어요."}
          </p>

          <BookmarkButton movieId={movie.id} variant="detail" />
        </div>

        {/* 평점 */}
        <aside className="w-full min-w-0 border-t border-[#E3E6EB] pt-6 xl:w-[390px] xl:shrink-0 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-8">
          <h2 className="text-[21px] font-bold text-[#17191E]">내 평점</h2>

          <p className="mt-1 text-xs text-[#969DA8]">
            별점을 클릭하거나 선택하세요.
          </p>

          <div className="mt-3 flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`${star}점`}
                onClick={() => setRating(star)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg border border-[#E3E6EB] bg-white text-2xl text-[#606774]",
                  star <= rating && "border-[#2563EB] text-[#2563EB]",
                )}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={review}
            onChange={(event) => setReview(event.target.value)}
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            className="mt-3 h-[105px] w-full resize-none rounded-lg border border-[#E3E6EB] bg-white p-4 text-sm outline-none placeholder:text-[#969DA8]"
          />

          <button
            type="button"
            disabled
            className="mt-3 h-[42px] w-full cursor-not-allowed rounded-lg bg-[#17191E] text-sm font-bold text-white opacity-50"
          >
            평점 저장 (준비 중)
          </button>

          <p className="mt-2 text-xs text-[#969DA8]">
            평점 저장 기능은 아직 연결되지 않았어요.
          </p>
        </aside>
      </section>
    </main>
  );
}
