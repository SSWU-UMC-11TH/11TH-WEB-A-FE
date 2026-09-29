import { useState } from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { movies } from '../../data/movies';
import { cn } from '../../utils/cn';

export function MovieDetailPage() {
  const { movieId } = useParams({ from: '/movies/$movieId' });
  const movie = movies.find((item) => item.id === Number(movieId));
  const [isBookmarked, setIsBookmarked] = useState(
    movie?.isBookmarked ?? false,
  );
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  function handleSaveRating() {
    if (rating === 0) return;

    localStorage.setItem(
      `movie-rating-${movieId}`,
      JSON.stringify({
        rating,
        review,
      }),
    );
    alert('평점이 저장되었습니다!');
  }
  if (!movie) {
    return (
      <main className="mx-auto w-full max-w-[1440px] px-6 py-20 text-center">
        <h1 className="text-2x1 font-bold">영화를 찾을 수 없어요.</h1>
        <Link to="/" className="mt-6 inline-block text-blue-600">
          영화 목록으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8faff]">
      <section className="relative h-[360px] w-full overflow-hidden bg-[#222]">
        <img
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-[1280px] flex-col justify-between px-6 py-6 md:px-10">
          <Link
            to="/"
            className="flex w-fit items-center gap-1 text-[13px] font-bold leading-[16px] text-white"
          >
            <span aria-hidden="true">〈</span>
            <span>영화 목록</span>
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-white">{movie.title}</h1>

            <p className="mt-2 text-sm text-gray-200">{movie.originalTitle}</p>

            <div className="mt-2 flex flex-wrap gap-2 text-xs text-white">
              <span>{movie.releaseDate}</span>
              <span>·</span>
              <span>{movie.genres.join(' · ')}</span>
              <span>·</span>
              <span>{movie.runtime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 하단 영화 상세 정보 */}
      <section className="mx-auto flex max-w-[1280px] flex-col gap-8 px-6 py-6 md:flex-row md:px-10">
        {/* 영화 포스터 */}
        <img
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
          className="w-[200px] h-[286px] max-w-full self-start rounded-lg object-cover shadow-md"
        />

        {/* 영화 소개 */}
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-[#17191e]">{movie.tagline}</h2>

          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600">
            {movie.overview}
          </p>

          <button
            type="button"
            onClick={() => setIsBookmarked((prev) => !prev)}
            aria-pressed={isBookmarked}
            className={cn(
              'mt-4 flex h-[42px] w-[107px] items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-white px-2 text-[14px] font-extrabold text-white',
              isBookmarked ? 'bg-[#1d4ed8]' : 'bg-[#2563eb]',
            )}
          >
            <img
              src={
                isBookmarked
                  ? '/icons/bookmark.svg'
                  : '/icons/bookmark-outline.svg'
              }
              alt=""
              aria-hidden="true"
              className="h-4 w-4 brightness-0 invert"
            />

            {isBookmarked ? '즐겨찾기' : '즐겨찾기'}
          </button>
        </div>

        <aside className="w-full border-t border-[#E3E6EB] pt-5 lg:w-[329px] lg:shrink-0 lg:border-l-[1px] lg:border-t-0 lg:pl-6 lg:pt-0">
          <h2 className="text-lg font-bold text-[#17191e]">내 평점</h2>

          <p className="mt-1 text-[12px] text-[#969DA8]">
            별점은 필수,후기는 선택이에요.
          </p>

          <div className="mt-3 flex gap-[6px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                aria-label={`${star}점 선택`}
                aria-pressed={rating === star}
                className={cn(
                  'flex h-[38px] w-[38px] items-center justify-center rounded-lg border text-[26px]',
                  star <= rating
                    ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]'
                    : 'border-[#E3E6EB] bg-white text-[#606774]',
                )}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="영화를 보고 느낀 점을 남겨보세요."
            className="mt-3 h-[102px] w-full resize-none rounded-lg border border-[#E3E6EB] bg-white p-3 text-sm text-[#17191E] outline-none focus:border-[#2563EB] focus:ring-0"
          />

          <button
            type="button"
            onClick={handleSaveRating}
            disabled={rating === 0}
            className={cn(
              'mt-2 w-full h-[42px] rounded-md bg-[#17191e] py-3 text-sm font-Extrabold text-white',
            )}
          >
            평점 저장
          </button>
        </aside>
      </section>
    </main>
  );
}
