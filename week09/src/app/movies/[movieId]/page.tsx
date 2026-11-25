import { MovieDetailPage } from "@/screens/movies/movie-detail-page";
import { getMovieDetail } from "@/api/movies";
import { toMovieDetail } from "@/api/movie-adapter";

export default async function Page({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId: movieIdParam } = await params;
  const movieId = Number(movieIdParam);

  if (!Number.isInteger(movieId) || movieId <= 0) {
    return (
      <main className="flex min-h-[calc(100vh-91px)] items-center justify-center bg-[#f7f8fa]">
        <p className="text-lg font-bold text-[#17191E]">
          올바르지 않은 영화 번호예요.
        </p>
      </main>
    );
  }

  try {
    const data = await getMovieDetail(movieId);
    const movie = toMovieDetail(data);

    return <MovieDetailPage movie={movie} />;
  } catch {
    return (
      <main className="flex min-h-[calc(100vh-91px)] items-center justify-center bg-[#f7f8fa]">
        <p className="text-lg font-bold text-[#17191E]">
          영화 정보를 불러오지 못했어요.
        </p>
      </main>
    );
  }
}