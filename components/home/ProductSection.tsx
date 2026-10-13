import Link from 'next/link';

import ProductGrid from '@/components/products/ProductGrid';
import type { WebsiteProduct } from '@/repositories/product-repository';

type ProductSectionProps = {
  title: string;
  products: WebsiteProduct[];
  emptyMessage?: string;
};

export default function ProductSection({
  title,
  products,
  emptyMessage = 'No products available yet.',
}: ProductSectionProps) {
  return (
    <section className="py-8 sm:py-12">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>

        <Link
          href="/products"
          className="shrink-0 text-sm font-semibold text-primary hover:underline"
        >
          View all →
        </Link>
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 px-4 py-12 text-center text-sm text-gray-500">
          {emptyMessage}
        </div>
      )}
    </section>
  );
}
