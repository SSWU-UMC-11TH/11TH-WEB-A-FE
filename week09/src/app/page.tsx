import { Suspense } from "react";
import { MovieListPage } from "@/screens/movies/movie-list-page";
import { getPopularMovies } from "@/api/movies-server";

async function MovieListContent() {
  const initialData = await getPopularMovies(1).catch(
    () => undefined,
  );

  return <MovieListPage initialData={initialData} />;
}

export default function Page() {
  return (
    <Suspense fallback={<p>영화 목록을 불러오는 중이에요...</p>}>
      <MovieListContent />
    </Suspense>
  );
}