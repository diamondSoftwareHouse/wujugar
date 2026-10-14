import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/repositories/product-repository';
import ProductDetailGallery from '@/components/products/ProductDetailGallery';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const price = Number(product.selling_price);
  const inStock = product.quantity > 0;
  const images =
    product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="transition hover:text-[#ff277f]">
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <Link href="/products" className="transition hover:text-[#ff277f]">
            Products
          </Link>

          <span aria-hidden="true">/</span>

          <span className="max-w-[45%] truncate font-medium text-gray-900">
            {product.name}
          </span>
        </nav>

        {/* Product details */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Images */}
          <ProductDetailGallery images={images} productName={product.name} />

          {/* Information */}
          <section className="  p-5  sm:p-8 lg:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ff277f]">
              {product.item_code}
            </p>

            <h1 className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            {/* Stock status */}
            <div className="mt-5">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
                  inStock
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    inStock ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                />
                {inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 border-b border-gray-100 pb-7">
              <p className="mb-1 text-sm text-gray-500">Price</p>

              <p className="text-3xl font-extrabold tracking-tight text-[#ff277f] sm:text-4xl">
                {Number.isFinite(price)
                  ? `${price.toLocaleString('en-US')} ကျပ်`
                  : 'Price unavailable'}
              </p>

              {inStock && (
                <p className="mt-2 text-sm text-gray-500">
                  {product.quantity.toLocaleString()} available
                </p>
              )}
            </div>

            {/* Description */}
            <div className="py-7">
              <h2 className="mb-3 text-base font-bold text-gray-900">
                Product Description
              </h2>

              <p className="whitespace-pre-line wrap-break-wordbreak-words text-sm leading-7 text-gray-600 sm:text-base">
                {product.description?.trim() ||
                  'No description available for this product.'}
              </p>
            </div>

            {/* Product information */}
            <div className="rounded-2xl bg-gray-50  ">
              <h2 className="mb-4 text-sm font-bold text-gray-900">
                Product Information
              </h2>

              <dl className="space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-gray-500">Item Code</dt>
                  <dd className="break-all text-right font-semibold text-gray-900">
                    {product.item_code}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <dt className="text-gray-500">Availability</dt>
                  <dd
                    className={`text-right font-semibold ${
                      inStock ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {inStock ? 'Available' : 'Currently unavailable'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Back to products */}
            <Link
              href="/products"
              className="mt-6 flex w-full items-center justify-center rounded-xl border border-[#ff277f] px-5 py-3.5 text-sm font-bold text-[#ff277f] transition hover:bg-[#ff277f] hover:text-white"
            >
              Browse More Products
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
