export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-4 w-12 rounded bg-gray-200" />
          <div className="h-4 w-3 rounded bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="h-4 w-3 rounded bg-gray-200" />
          <div className="h-4 w-28 rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Image gallery skeleton */}
          <section>
            <div className="aspect-square rounded-3xl border border-gray-100 bg-gray-200" />

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 w-20 shrink-0 rounded-xl bg-gray-200 sm:h-24 sm:w-24"
                />
              ))}
            </div>
          </section>

          {/* Product information skeleton */}
          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            {/* Item code */}
            <div className="mb-4 h-4 w-24 rounded bg-gray-200" />

            {/* Product title */}
            <div className="space-y-3">
              <div className="h-8 w-full max-w-md rounded-lg bg-gray-200" />
              <div className="h-8 w-3/4 max-w-sm rounded-lg bg-gray-200" />
            </div>

            {/* Stock status */}
            <div className="mt-6 h-8 w-28 rounded-full bg-gray-200" />

            {/* Price */}
            <div className="mt-7 border-b border-gray-100 pb-7">
              <div className="mb-3 h-4 w-16 rounded bg-gray-200" />
              <div className="h-10 w-48 rounded-lg bg-gray-200" />
              <div className="mt-3 h-4 w-32 rounded bg-gray-200" />
            </div>

            {/* Description */}
            <div className="space-y-4 py-7">
              <div className="h-5 w-44 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-4/5 rounded bg-gray-200" />
            </div>

            {/* Product information */}
            <div className="rounded-2xl bg-gray-100 p-4 sm:p-5">
              <div className="mb-5 h-5 w-40 rounded bg-gray-200" />

              <div className="space-y-5">
                <div className="flex justify-between gap-4">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                  <div className="h-4 w-28 rounded bg-gray-200" />
                </div>

                <div className="flex justify-between gap-4">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="mt-6 h-12 w-full rounded-xl bg-gray-200" />
          </section>
        </div>
      </div>
    </main>
  );
}
