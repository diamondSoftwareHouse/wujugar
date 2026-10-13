type Props = {
  hasProducts: boolean;
  onReset?: () => void;
};

export default function NoProducts({ hasProducts, onReset }: Props) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m5 7 1-3h12l1 3" />
          <path d="M3 7h18l-1 13H4L3 7Z" />
          <path d="M9 11a3 3 0 0 0 6 0" />
        </svg>
      </div>

      <h2 className="text-lg font-semibold text-gray-900">
        {hasProducts ? 'No matching products' : 'No products available'}
      </h2>

      <p className="mt-2 max-w-sm text-sm text-gray-500">
        {hasProducts
          ? 'Try a different search term or change your filters.'
          : 'We couldn’t find any products right now. Please check back later.'}
      </p>

      {hasProducts && onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Clear search and filters
        </button>
      )}
    </div>
  );
}
