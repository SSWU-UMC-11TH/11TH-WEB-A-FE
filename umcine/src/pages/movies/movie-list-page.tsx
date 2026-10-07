import MovieGrid from '../../components/movies/movie-grid';
import { movies } from '../../data/movies';
import { useBookmarkStore } from '../../stores/bookmark-store';

export function MovieListPage() {
  const bookmarkedMovieIds = useBookmarkStore(
    (state) => state.bookmarkedMovieIds,
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  const moviesWithBookmark = movies.map((movie) => ({
    ...movie,
    isBookmarked: bookmarkedMovieIds.includes(movie.id),
  }));

  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 flex-col gap-5 px-20 pb-10 pt-6">
      <h1 className="text-[38px] font-bold text-[#17191e]">영화 목록</h1>

      <MovieGrid
        movies={moviesWithBookmark}
        onToggleBookmark={toggleBookmark}
      />
    </main>
  );
}
