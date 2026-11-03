import MovieGrid from '../../components/movies/movie-grid';
import { movies } from '../../data/movies';

export function MovieListPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 flex-col gap-5 px-20 pb-10 pt-6">
      <h1 className="text-[38px] font-bold text-[#17191e]">영화 목록</h1>

      <MovieGrid movies={movies} />
    </main>
  );
}
