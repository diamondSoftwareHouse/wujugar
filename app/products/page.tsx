import { getProducts } from '@/repositories/product-repository';
import ProductSearchFilter from '@/components/products/ProductSearchFilter';
import Pagination from '@/components/products/Pagination';
import ProductGrid from '@/components/products/ProductGrid';
import NoProducts from '@/components/products/NoProduct';

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    stock?: string;
    sort?: string;
  }>;
};

type StockFilter = 'all' | 'in-stock' | 'out-of-stock';
type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  const parsedPage = Number(params.page ?? '1');
  const page =
    Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const stockValues: StockFilter[] = ['all', 'in-stock', 'out-of-stock'];

  const sortValues: SortOption[] = [
    'newest',
    'price-low',
    'price-high',
    'name',
  ];

  const stock: StockFilter = stockValues.includes(params.stock as StockFilter)
    ? (params.stock as StockFilter)
    : 'all';

  const sort: SortOption = sortValues.includes(params.sort as SortOption)
    ? (params.sort as SortOption)
    : 'newest';

  const search = (params.search ?? '').trim().slice(0, 100);

  const result = await getProducts({
    page,
    pageSize: 24,
    search,
    stock,
    sort,
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-black sm:text-3xl">
          Products
        </h1>

        <ProductSearchFilter
          total={result.total}
          search={search}
          stock={stock}
          sort={sort}
        />

        {result.products.length === 0 ? (
          <NoProducts hasProducts={result.total > 0} />
        ) : (
          <ProductGrid products={result.products} />
        )}

        <Pagination
          page={result.page}
          totalPages={result.totalPages}
          search={search}
          stock={stock}
          sort={sort}
        />
      </div>
    </main>
  );
}
