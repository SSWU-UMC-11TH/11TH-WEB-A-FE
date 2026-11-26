import Link from "next/link";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="w-full">
      <div className="relative aspect-[241/274] w-full overflow-hidden rounded-lg">
        <Link href={`/movies/${movie.id}`}>
          {movie.posterPath ? (
            <Image
              className="block h-full w-full object-cover"
              src={movie.posterPath}
              alt={`${movie.title} 포스터`}
              fill
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#E3E6EB] text-sm text-[#969DA8]">
              포스터 없음
            </div>
          )}
        </Link>

        <BookmarkButton movieId={movie.id} />
      </div>

      <Link href={`/movies/${movie.id}`}>
        <h2 className="mt-[10px] mb-[2px] overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-[1.4] font-extrabold">
          {movie.title}
        </h2>
      </Link>

      <p className="m-0 text-xs leading-[1.4] font-normal text-[#969DA8]">
        {movie.releaseDate}
      </p>
    </article>
  );
}