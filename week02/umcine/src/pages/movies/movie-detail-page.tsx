import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { cn } from "../../utils/cn";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  if (!movie) {
    return (
      <main className="flex min-h-[calc(100vh-91px)] items-center justify-center bg-[#f7f8fa]">
        <p className="text-lg font-bold text-[#17191E]">
          영화를 찾을 수 없어요.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-91px)] bg-[#f7f8fa]">
      <section className="relative h-[360px] overflow-hidden">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />

        {/* 영화 목록 */}
        <Link
          to="/"
          className="absolute top-8 left-20 z-10 flex items-center gap-1 whitespace-nowrap text-sm font-bold text-white no-underline"
        >
          <img
            src="/icons/chevron-left.svg"
            alt=""
            className="h-6 w-6 brightness-0 invert"
          />
          <span>영화 목록</span>
        </Link>

        {/* 영화 기본 정보 */}
        <div className="absolute bottom-7 left-20 z-10 text-white">
          <h1 className="text-[46px] leading-[1.3] font-bold">{movie.title}</h1>

          <p className="mt-2 text-sm">{movie.originalTitle}</p>

          <div className="mt-2 flex items-center gap-2 text-sm font-bold">
            <span>{movie.releaseDate}</span>

            <span>{movie.genres.join(" · ")}</span>

            <span>{movie.runtime}</span>
          </div>
        </div>
      </section>

      {/* 상세 정보 */}
      <section className="flex px-[80px] py-[24px]">
        {/* 포스터 */}
        <div className="shrink-0">
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="h-[286px] w-[200px] rounded-[10px] object-cover shadow-md"
          />
        </div>

        {/* 영화 설명 */}
        <div className="min-w-0 flex-1 px-8">
          <h2 className="text-[21px] font-bold text-[#17191E]">
            {movie.tagline}
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#606774]">
            {movie.overview}
          </p>

          <BookmarkButton movieId={movie.id} variant="detail" />
        </div>

        {/* 평점 */}
        <aside className="w-[390px] shrink-0 border-l border-[#E3E6EB] pl-8">
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
                onClick={() => {
                  setRating(star);
                  setIsSaved(false);
                }}
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
            onChange={(event) => {
              setReview(event.target.value);
              setIsSaved(false);
            }}
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            className="mt-3 h-[105px] w-full resize-none rounded-lg border border-[#E3E6EB] bg-white p-4 text-sm outline-none placeholder:text-[#969DA8]"
          />

          <button
            type="button"
            onClick={() => setIsSaved(true)}
            className="mt-3 h-[42px] w-full rounded-lg bg-[#17191E] text-sm font-bold text-white"
          >
            평점 저장
          </button>

          {isSaved && (
            <p className="mt-2 text-xs text-[#606774]">
              평점이 저장되었습니다.
            </p>
          )}
        </aside>
      </section>
    </main>
  );
}
