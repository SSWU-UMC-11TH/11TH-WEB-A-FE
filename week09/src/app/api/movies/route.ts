import { NextRequest, NextResponse } from "next/server";
import { HTTPError } from "ky";
import {
  getPopularMovies,
  searchMovies,
  getMovieDetail,
} from "@/api/movies-server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const type = params.get("type");
  const page = Number(params.get("page") ?? "1");

  try {
    switch (type) {
      case "popular":
      case "search": {
        if (!Number.isInteger(page) || page < 1 || page > 500) {
          return NextResponse.json(
            { message: "잘못된 페이지입니다." },
            { status: 400 },
          );
        }

        if (type === "popular") {
          return NextResponse.json(await getPopularMovies(page));
        }

        const query = params.get("query")?.trim();

        if (!query) {
          return NextResponse.json(
            { message: "검색어를 입력해주세요." },
            { status: 400 },
          );
        }

        return NextResponse.json(await searchMovies(query, page));
      }

      case "detail": {
        const movieId = Number(params.get("movieId"));

        if (!Number.isInteger(movieId) || movieId <= 0) {
          return NextResponse.json(
            { message: "잘못된 영화 ID입니다." },
            { status: 400 },
          );
        }

        return NextResponse.json(await getMovieDetail(movieId));
      }

      default:
        return NextResponse.json(
          { message: "잘못된 요청입니다." },
          { status: 400 },
        );
    }
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 404) {
      return NextResponse.json(
        { message: "영화를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "영화 조회에 실패했습니다." },
      { status: 502 },
    );
  }
}