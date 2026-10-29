import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            영화를 찾을 수 없어요.
          </h1>

          <Link
            to="/"
            className="mt-5 inline-block text-sm font-semibold text-blue-600"
          >
            영화 목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Backdrop */}
      <section className="relative h-[320px] overflow-hidden bg-gray-900">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />

        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/35" />

        {/* 영화 목록 */}
        <div className="absolute inset-x-0 top-0 mx-auto max-w-[1280px] px-8 pt-7">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white"
          >
            <span aria-hidden="true">‹</span>
            영화 목록
          </Link>
        </div>

        {/* 영화 기본 정보 */}
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1280px] px-8 pb-7 text-white">
          <h1 className="text-3xl font-bold tracking-tight">
            {movie.title}
          </h1>

          <p className="mt-2 text-sm text-white/80">
            {movie.originalTitle}
          </p>

          <div className="mt-2 flex items-center gap-2 text-sm font-medium">
            <span>{movie.releaseDate}</span>
            <span>·</span>
            <span>{movie.genres.join(" · ")}</span>
            <span>·</span>
            <span>{movie.runtime}</span>
          </div>
        </div>
      </section>

      {/* 영화 상세 정보 */}
      <section className="mx-auto max-w-[1280px] px-8 py-7">
        <div className="flex gap-7">
          {/* Poster */}
          <img
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
            className="h-[300px] w-[200px] shrink-0 rounded-lg object-cover shadow-sm"
          />

          {/* Description */}
          <div className="min-w-0 flex-1 pt-1">
            <h2 className="text-xl font-bold text-gray-900">
              {movie.tagline}
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">
              {movie.overview}
            </p>

            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <img
                src={
                  movie.isBookmarked
                    ? "/icons/bookmark.svg"
                    : "/icons/bookmark-outline.svg"
                }
                alt=""
                aria-hidden="true"
                className="h-4 w-4 brightness-0 invert"
              />
              즐겨찾기
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}