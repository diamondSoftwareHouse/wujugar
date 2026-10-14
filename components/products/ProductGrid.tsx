import type { WebsiteProduct } from '@/repositories/product-repository';
import ProductCard from './ProductCard';

type Props = {
  products: WebsiteProduct[];
  basePath?: string;
};

export default function ProductGrid({
  products,
  basePath = '/products',
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} basePath={basePath} />
      ))}
    </div>
  );
}
