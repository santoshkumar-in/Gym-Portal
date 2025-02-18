"use client";
import { useState } from "react";
interface Props {
  total?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({
  total = 1244,
  currentPage = 1,
  onPageChange = () => null,
}: Props) => {
  const [perPage, setPerPage] = useState<number>(10);
  const totalPages = Math.ceil(total / perPage);
  const maxPageNumbersToShow = 9;

  if (totalPages < 2) {
    return null;
  }
  const disablePrev = currentPage === 1;
  const disableNext = currentPage === totalPages;

  const handlePageChange = (e: React.MouseEvent, p: number) => {
    e.preventDefault();
    if (p >= 1 && p <= totalPages) {
      onPageChange(p);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const halfRange = Math.floor(maxPageNumbersToShow / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    if (endPage - startPage < maxPageNumbersToShow - 1) {
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    // Show first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Show last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setPerPage(Number(e.target.value));
  };

  return (
    <div className="mt-4 flex items-center justify-center rounded-sm border border-gray-100 bg-white px-5 py-3 shadow-default dark:border-gray-800 dark:bg-boxdark sm:px-7.5 sm:py-3">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-8 px-6 py-4 sm:justify-normal">
          <button
            onClick={(e) => handlePageChange(e, currentPage - 1)}
            className="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 sm:px-3.5 sm:py-2.5"
            disabled={disablePrev}
          >
            <span className="inline">
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.58203 9.99868C2.58174 10.1909 2.6549 10.3833 2.80152 10.53L7.79818 15.5301C8.09097 15.8231 8.56584 15.8233 8.85883 15.5305C9.15183 15.2377 9.152 14.7629 8.85921 14.4699L5.13911 10.7472L16.6665 10.7472C17.0807 10.7472 17.4165 10.4114 17.4165 9.99715C17.4165 9.58294 17.0807 9.24715 16.6665 9.24715L5.14456 9.24715L8.85919 5.53016C9.15199 5.23717 9.15184 4.7623 8.85885 4.4695C8.56587 4.1767 8.09099 4.17685 7.79819 4.46984L2.84069 9.43049C2.68224 9.568 2.58203 9.77087 2.58203 9.99715C2.58203 9.99766 2.58203 9.99817 2.58203 9.99868Z"
                  fill=""
                ></path>
              </svg>
            </span>
            <span className="hidden sm:inline">Previous</span>
          </button>
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-400 sm:hidden">
            Page {currentPage} of {totalPages}
          </span>

          <ul className="hidden items-center gap-0.5 sm:flex">
            {getPageNumbers().map((page, index) =>
              typeof page === "number" ? (
                <li key={index}>
                  <a
                    href="#"
                    className={`rounded border px-3 py-1 ${
                      currentPage === page
                        ? "flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-medium text-white hover:bg-blue-800"
                        : "hover:bg-brand-500 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:text-white dark:text-gray-400 dark:hover:text-white"
                    }`}
                    onClick={(e) => handlePageChange(e, page)}
                  >
                    {page}
                  </a>
                </li>
              ) : (
                <li key={index}>
                  <span className="px-2">...</span>
                </li>
              ),
            )}
          </ul>
          <button
            disabled={disableNext}
            onClick={(e) => handlePageChange(e, currentPage + 1)}
            className="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 sm:px-3.5 sm:py-2.5"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="inline">
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.4165 9.9986C17.4168 10.1909 17.3437 10.3832 17.197 10.53L12.2004 15.5301C11.9076 15.8231 11.4327 15.8233 11.1397 15.5305C10.8467 15.2377 10.8465 14.7629 11.1393 14.4699L14.8594 10.7472L3.33203 10.7472C2.91782 10.7472 2.58203 10.4114 2.58203 9.99715C2.58203 9.58294 2.91782 9.24715 3.33203 9.24715L14.854 9.24715L11.1393 5.53016C10.8465 5.23717 10.8467 4.7623 11.1397 4.4695C11.4327 4.1767 11.9075 4.17685 12.2003 4.46984L17.1578 9.43049C17.3163 9.568 17.4165 9.77087 17.4165 9.99715C17.4165 9.99763 17.4165 9.99812 17.4165 9.9986Z"
                  fill=""
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="ml-auto flex items-center font-medium">
        <select
          className="w-20 bg-transparent pl-2"
          onChange={handlePerPageChange}
          value={perPage}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <p className="pl-2 text-black dark:text-white">Entries Per Page</p>
      </div>
    </div>
  );
};

export default Pagination;
