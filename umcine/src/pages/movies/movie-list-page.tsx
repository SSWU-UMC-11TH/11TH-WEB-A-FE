import { useState, useEffect } from 'react';
import MovieGrid from '../../components/movies/movie-grid';
import { useBookmarkStore } from '../../stores/bookmark-store';
import { getMovies } from '../../api/movies/get-movies';
import type { TmdbMovieListItem } from '../../api/movies/models';

export function MovieListPage() {
  // 1. 영화 목록 상태
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 2. 기존 4주차 북마크 기능
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  // 3. TMDB API 요청
  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovies({ page: 1 });

        if (!ignore) {
          setMovies(response.results);
        }
      } catch {
        if (!ignore) {
          setErrorMessage('영화 목록을 불러오지 못했어요.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, []);

  // 4. 기존 JSX 유지 + 상태별 UI
  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 flex-col gap-5 px-20 pb-10 pt-6">
      <h1 className="text-[38px] font-bold text-[#17191e]">영화 목록</h1>

      {isLoading ? (
        <p>영화 목록을 불러오는 중이에요.</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : movies.length === 0 ? (
        <p>조건에 맞는 영화가 없어요.</p>
      ) : (
        <MovieGrid movies={movies} onToggleBookmark={toggleBookmark} />
      )}
    </main>
  );
}
