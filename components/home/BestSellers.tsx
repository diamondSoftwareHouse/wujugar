import ProductSection from '@/components/home/ProductSection';
import type { WebsiteProduct } from '@/repositories/product-repository';

type BestSellersProps = {
  products: WebsiteProduct[];
};

export default function BestSellers({ products }: BestSellersProps) {
  return (
    <ProductSection
      title="Best Sellers"
      products={products}
      emptyMessage="Popular products will appear here soon."
    />
  );
}
