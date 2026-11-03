import type { TmdbMovieListItem } from '../../api/movies/models';
import MovieCard from './movie-card';

interface MovieGridProps {
  movies: TmdbMovieListItem[];
  onToggleBookmark: (id: number) => void;
}

function MovieGrid({ movies, onToggleBookmark }: MovieGridProps) {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </section>
  );
}

export default MovieGrid;
