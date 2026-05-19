"use client";

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
  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  return (
    <div className="flex items-center justify-center gap-1 mt-8 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-green-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ← Prev
      </button>

      {pages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-9 h-9 rounded-lg text-sm font-medium bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-green-500/50 transition-colors"
          >
            1
          </button>
          {pages[0] > 2 && (
            <span className="text-gray-500 px-1">…</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-lg text-sm font-medium border transition-colors ${
            page === currentPage
              ? "bg-green-500/20 border-green-500/50 text-green-400"
              : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white hover:border-green-500/50"
          }`}
        >
          {page}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="text-gray-500 px-1">…</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-9 h-9 rounded-lg text-sm font-medium bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-green-500/50 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-800 border border-gray-700 text-gray-400 hover:text-white hover:border-green-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  );
}
