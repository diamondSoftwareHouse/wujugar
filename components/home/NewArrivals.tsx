import ProductSection from '@/components/home/ProductSection';
import type { WebsiteProduct } from '@/repositories/product-repository';

type NewArrivalsProps = {
  products: WebsiteProduct[];
};

export default function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <ProductSection
      title="ပစ္စည်းအသစ်များ"
      products={products}
      emptyMessage="New products will appear here soon."
    />
  );
}
