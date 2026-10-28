import { cn } from '../../utils/cn';
import { Link } from '@tanstack/react-router';
import type { TmdbMovieListItem } from '../../api/movies/models';
import { useBookmarkStore } from '../../stores/bookmark-store';

interface MovieCardProps {
  movie: TmdbMovieListItem;
  onToggleBookmark: (id: number) => void;
}

function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  // Zustand에서 북마크 여부 확인
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movie.id),
  );

  // TMDB 포스터 이미지 주소
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/images/no-poster.png';
  console.log('영화 제목:', movie.title);
  console.log('포스터 경로:', movie.poster_path);
  console.log('최종 이미지 주소:', posterUrl);
  return (
    <article className="w-full min-w-0">
      <div className="relative h-[274px] w-full overflow-hidden rounded-lg bg-[#eee]">
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
          className="block h-full w-full"
        >
          <img
            className="block h-full w-full object-cover"
            src={posterUrl}
            alt={movie.title}
          />
        </Link>

        <button
          className={cn(
            'bookmark-btn absolute right-2 top-2 rounded-full p-2 text-white',
            isBookmarked ? 'bg-blue-600' : 'bg-black/60',
          )}
          onClick={() => onToggleBookmark(movie.id)}
          type="button"
          aria-label={`${movie.title} 북마크`}
          aria-pressed={isBookmarked}
        >
          <img
            className="block h-6 w-6 brightness-0 invert"
            src={
              isBookmarked
                ? '/icons/bookmark.svg'
                : '/icons/bookmark-outline.svg'
            }
            alt=""
          />
        </button>
      </div>

      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        <h2 className="my-[5px] truncate text-sm font-semibold">
          {movie.title}
        </h2>
      </Link>

      <p className="m-0 text-xs font-normal text-[#969da8]">
        {movie.release_date}
      </p>
    </article>
  );
}

export default MovieCard;
