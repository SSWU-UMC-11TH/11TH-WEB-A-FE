import { useState } from "react";
import "../styles/pagination.css";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [1, 2, 3, 4, 5];

  return (
    <nav className="pagination" aria-label="페이지 이동">
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`pagination__button ${
            currentPage === page ? "pagination__button--active" : ""
          }`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}
