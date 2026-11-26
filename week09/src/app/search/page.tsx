import { Suspense } from "react";
import { SearchPage } from "@/screens/movies/search-page";
import { searchMovies } from "@/api/movies-server";

type SearchParams = Promise<{
  query?: string | string[];
}>;

async function SearchContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const query =
    typeof params.query === "string" ? params.query : "";

  const normalizedQuery = query.trim().toLowerCase();

  const initialData = normalizedQuery
    ? await searchMovies(normalizedQuery).catch(() => undefined)
    : undefined;

  return (
    <SearchPage
      key={query}
      query={query}
      initialData={initialData}
    />
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <Suspense fallback={<p>영화를 검색하는 중이에요...</p>}>
      <SearchContent searchParams={searchParams} />
    </Suspense>
  );
}