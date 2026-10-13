import ProductGridSkeleton from '@/components/products/ProductGridSkeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-8">
          <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
          <div className="mt-3 h-4 w-64 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_200px_200px]">
          <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
        </div>

        <ProductGridSkeleton />
      </div>
    </main>
  );
}
