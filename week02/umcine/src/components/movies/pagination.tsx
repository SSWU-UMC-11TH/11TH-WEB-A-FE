import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;

  const pages = Array.from(
    { length: Math.min(5, totalPages - startPage + 1) },
    (_, index) => startPage + index,
  );

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="페이지 이동"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-2 text-xs disabled:opacity-30"
      >
        이전
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent p-0 text-xs font-medium text-[#969DA8]",
            currentPage === page && "bg-[#2563eb] text-white",
          )}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-2 text-sm disabled:opacity-30"
      >
        다음
      </button>
    </nav>
  );
}
