import { Suspense } from 'react';
import { SearchPage } from '../../features/movies/search-page';

export default function Page() {
  return (
    <Suspense fallback={<p>검색 페이지를 불러오는 중이에요.</p>}>
      <SearchPage />
    </Suspense>
  );
}
