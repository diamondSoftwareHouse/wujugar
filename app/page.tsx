import HeroCarousel from '@/components/home/HeroCarousel';
import NewArrivals from '@/components/home/NewArrivals';
import BestSellers from '@/components/home/BestSellers';

import {
  getProducts,
  type WebsiteProduct,
} from '@/repositories/product-repository';

export default async function Home() {
  let products: WebsiteProduct[] = [];

  try {
    const result = await getProducts({
      page: 1,
      pageSize: 24,
      sort: 'newest',
    });

    products = result.products;
  } catch (error: unknown) {
    console.error('Failed to load homepage products:', error);
  }

  const newArrivals = products.slice(0, 8);
  //const bestSellers = products.slice(8, 16);

  return (
    <>
      <HeroCarousel />
      <p className="text-center pt-10 text-primary text-xl">
        Wujugar မှကြိုဆိုပါ၏။
      </p>
      <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <NewArrivals products={newArrivals} />
        {/* <BestSellers products={bestSellers} /> */}
      </main>
    </>
  );
}
