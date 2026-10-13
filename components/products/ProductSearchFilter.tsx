'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type StockFilter = 'all' | 'in-stock' | 'out-of-stock';
type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';

type Props = {
  total: number;
  search?: string;
  stock?: StockFilter;
  sort?: SortOption;
};

export default function ProductSearchFilter({
  total,
  search: initialSearch = '',
  stock: initialStock = 'all',
  sort: initialSort = 'newest',
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlSearch = searchParams.get('search') ?? initialSearch;

  const stockParam = searchParams.get('stock');
  const stockFilter: StockFilter =
    stockParam === 'in-stock' || stockParam === 'out-of-stock'
      ? stockParam
      : stockParam === 'all' || stockParam === null
        ? initialStock
        : 'all';

  const sortParam = searchParams.get('sort');
  const sortBy: SortOption =
    sortParam === 'price-low' ||
    sortParam === 'price-high' ||
    sortParam === 'name' ||
    sortParam === 'newest'
      ? sortParam
      : initialSort;

  const [search, setSearch] = useState(urlSearch);

  const updateUrl = useCallback(
    (nextSearch: string, nextStock: StockFilter, nextSort: SortOption) => {
      const params = new URLSearchParams(searchParams.toString());
      const keyword = nextSearch.trim();

      if (keyword) params.set('search', keyword);
      else params.delete('search');

      if (nextStock !== 'all') params.set('stock', nextStock);
      else params.delete('stock');

      if (nextSort !== 'newest') params.set('sort', nextSort);
      else params.delete('sort');

      // Reset pagination whenever filters change.
      params.delete('page');

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      startTransition(() => {
        router.replace(url, { scroll: false });
      });
    },
    [searchParams, pathname, router, startTransition],
  );

  // Debounce text searches.
  useEffect(() => {
    if (search.trim() === urlSearch) return;

    const timer = setTimeout(() => {
      updateUrl(search, stockFilter, sortBy);
    }, 350);

    return () => clearTimeout(timer);
  }, [search, urlSearch, stockFilter, sortBy, updateUrl]);

  function handleSearchChange(value: string) {
    setSearch(value);
  }

  function handleStockChange(value: StockFilter) {
    updateUrl(search, value, sortBy);
  }

  function handleSortChange(value: SortOption) {
    updateUrl(search, stockFilter, value);
  }

  function resetFilters() {
    setSearch('');

    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }

  return (
    <section>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_200px_200px]">
        <label className="relative block">
          <span className="sr-only">Search products</span>

          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>

          <input
            type="search"
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search by name, code, or description..."
            aria-label="Search products"
            className="w-full rounded-xl text-black border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#ff277f]"
          />
        </label>

        <label className="block">
          <span className="sr-only">Filter by stock</span>

          <select
            value={stockFilter}
            onChange={(event) =>
              handleStockChange(event.target.value as StockFilter)
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-black text-sm outline-none focus:border-[#ff277f]"
          >
            <option value="all">All stock statuses</option>
            <option value="in-stock">In stock</option>
            <option value="out-of-stock">Out of stock</option>
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Sort products</span>

          <select
            value={sortBy}
            onChange={(event) =>
              handleSortChange(event.target.value as SortOption)
            }
            className="w-full rounded-xl border border-gray-200 text-black bg-white px-3 py-3 text-sm outline-none focus:border-[#ff277f]"
          >
            <option value="newest">Newest first</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500" aria-live="polite">
          <span className="font-semibold text-black">
            {total.toLocaleString()}
          </span>{' '}
          {total === 1 ? 'product' : 'products'} found
        </p>

        {(search.trim() !== '' ||
          stockFilter !== 'all' ||
          sortBy !== 'newest') && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm font-medium text-primary hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {isPending && (
        <p className="mb-3 text-sm text-gray-500" role="status">
          Updating products...
        </p>
      )}
    </section>
  );
}
