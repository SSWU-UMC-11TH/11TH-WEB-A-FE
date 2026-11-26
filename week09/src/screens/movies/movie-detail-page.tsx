import Link from "next/link";
import { toMovieDetail } from "../../api/movie-adapter";
import { BookmarkButton } from "../../components/bookmark-button";
import { RatingForm } from "../../components/rating-form";
import Image from "next/image";

export function MovieDetailPage({
  movie,
}: {
  movie: ReturnType<typeof toMovieDetail>;
}) {
  return (
    <main className="min-h-[calc(100vh-91px)] bg-[#f7f8fa]">
      {/* 영화 배경 이미지 */}
      <section className="relative h-[360px] overflow-hidden">
        {movie.backdropPath && (
          <Image
            src={movie.backdropPath}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            fill
          />
        )}

        <div className="absolute inset-0 bg-black/35" />

        {/* 영화 목록으로 이동 */}
        <Link
          href="/"
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
        <RatingForm key={movie.id} movieId={movie.id} />
      </section>
    </main>
  );
}
