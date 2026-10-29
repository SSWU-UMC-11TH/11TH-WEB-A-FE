import { useState } from "react";
import { cn } from "../../utils/cn";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [1, 2, 3, 4, 5];

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="페이지 이동"
    >
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent p-0 text-sm font-medium text-[#969DA8]",
            currentPage === page && "bg-[#2563eb] text-white",
          )}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}
