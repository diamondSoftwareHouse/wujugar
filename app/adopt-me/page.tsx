import HeroCarousel, {
  type CarouselSlide,
} from '@/components/home/HeroCarousel';
import { getHamsters } from '@/repositories/hamster-repository';
import ProductGrid from '@/components/products/ProductGrid';
import Pagination from '@/components/products/Pagination';
import NoProducts from '@/components/products/NoProduct';

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function AdoptMePage({ searchParams }: Props) {
  const params = await searchParams;

  const parsedPage = Number(params.page ?? '1');
  const page =
    Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const slides: CarouselSlide[] = [
    {
      image: '/adopt-me-banner1.png',
      alt: 'Adopt Me',
    },
    {
      image: '/adopt-me-banner2.png',
      alt: 'Adopt Me',
    },
  ];

  const result = await getHamsters({
    page,
    pageSize: 24,
    sort: 'newest',
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroCarousel slides={slides} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold text-black sm:text-3xl">
          ဟမ်းဟမ်းလေးများ
        </h1>

        {result.hamsters.length === 0 ? (
          <NoProducts hasProducts={result.total > 0} />
        ) : (
          <ProductGrid products={result.hamsters} basePath="/adopt-me" />
        )}

        <Pagination
          page={result.page}
          totalPages={result.totalPages}
          search=""
          stock="all"
          sort="newest"
        />
      </div>
    </main>
  );
}
