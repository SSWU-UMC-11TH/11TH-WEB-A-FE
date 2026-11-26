import { cn } from '../../utils/cn';
import Link from 'next/link';
import type { TmdbMovieListItem } from '../../api/movies/models';
import Image from 'next/image';
interface MovieCardProps {
  movie: TmdbMovieListItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

function MovieCard({ movie, isBookmarked, onToggleBookmark }: MovieCardProps) {
  // TMDB 포스터 이미지 주소
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  console.log('영화 카드:', movie.id, isBookmarked);
  return (
    <article className="w-full min-w-0">
      <div className="relative h-[274px] w-full overflow-hidden rounded-lg bg-[#eee]">
        <Link
          href={`/movies/${movie.id}`}
          className="relative block h-full w-full"
        >
          {posterUrl && (
            <Image
              className="object-cover"
              src={posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          )}
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
          <Image
            className="block h-6 w-6 brightness-0 invert"
            src={
              isBookmarked
                ? '/icons/bookmark.svg'
                : '/icons/bookmark-outline.svg'
            }
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>

      <Link href={`/movies/${movie.id}`}>
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
