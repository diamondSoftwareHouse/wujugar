'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  page: number;
  totalPages: number;
  search?: string;
  stock?: 'all' | 'in-stock' | 'out-of-stock';
  sort?: 'newest' | 'price-low' | 'price-high' | 'name';
};

export default function Pagination({
  page,
  totalPages,
  search = '',
  stock = 'all',
  sort = 'newest',
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }

    if (stock !== 'all') {
      params.set('stock', stock);
    } else {
      params.delete('stock');
    }

    if (sort !== 'newest') {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }

    params.set('page', String(nextPage));

    router.push(`${pathname}?${params.toString()}`, {
      scroll: true,
    });
  };

  // Display a maximum of five page numbers around the current page.
  const startPage = Math.max(1, Math.min(page - 2, totalPages - 4));
  const endPage = Math.min(totalPages, startPage + 4);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <nav
      aria-label="Product pagination"
      className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row"
    >
      <p className="text-sm text-gray-500">
        Page <span className="font-semibold text-gray-900">{page}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          aria-label="Go to previous page"
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {startPage > 1 && (
          <>
            <PageButton number={1} currentPage={page} onClick={goToPage} />
            {startPage > 2 && (
              <span className="px-1 text-gray-400" aria-hidden="true">
                …
              </span>
            )}
          </>
        )}

        {pageNumbers.map((number) => (
          <PageButton
            key={number}
            number={number}
            currentPage={page}
            onClick={goToPage}
          />
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-1 text-gray-400" aria-hidden="true">
                …
              </span>
            )}
            <PageButton
              number={totalPages}
              currentPage={page}
              onClick={goToPage}
            />
          </>
        )}

        <button
          type="button"
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages}
          aria-label="Go to next page"
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </nav>
  );
}

type PageButtonProps = {
  number: number;
  currentPage: number;
  onClick: (page: number) => void;
};

function PageButton({ number, currentPage, onClick }: PageButtonProps) {
  const isActive = number === currentPage;

  return (
    <button
      type="button"
      onClick={() => onClick(number)}
      aria-label={`Go to page ${number}`}
      aria-current={isActive ? 'page' : undefined}
      className={`min-w-9 rounded-lg border px-3 py-2 text-sm font-medium transition ${
        isActive
          ? 'border-primary bg-primary text-white'
          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      {number}
    </button>
  );
}
