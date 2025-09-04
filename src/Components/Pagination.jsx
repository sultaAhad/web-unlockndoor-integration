import React from "react";

const Pagination = ({ currentPage = 1, lastPage = 1, onPageChange }) => {
  if (lastPage <= currentPage) {
    return "";
  }
  const getPages = () => {
    const pages = [];
    if (lastPage <= 7) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", lastPage);
      } else if (currentPage >= lastPage - 3) {
        pages.push(
          1,
          "...",
          lastPage - 4,
          lastPage - 3,
          lastPage - 2,
          lastPage - 1,
          lastPage
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          lastPage
        );
      }
    }
    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination-container d-flex align-items-center mb-4 wrapper-pagination">
      <button
        className="btn btn-outline-primary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <ul className="pagination list-unstyled d-flex align-items-center mb-0">
        {getPages().map((page, idx) => (
          <li
            key={idx}
            className={`page-item${page === currentPage ? " active" : ""}${
              page === "..." ? " disabled" : ""
            }`}
          >
            {page === "..." ? (
              <span className="btn btn-outline-secondary mx-1 disabled">
                ...
              </span>
            ) : (
              <button
                className={`btn btn-outline-secondary mx-1${
                  page === currentPage ? " active" : ""
                }`}
                onClick={() => handlePageClick(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        className="btn btn-outline-primary"
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
