'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { WebsiteProduct } from '@/repositories/product-repository';

type Props = {
  product: WebsiteProduct;
};

export default function ProductCard({ product }: Props) {
  const [activeImage, setActiveImage] = useState(0);

  const images =
    product.images?.filter(
      (image): image is string =>
        typeof image === 'string' && image.trim() !== '',
    ) ?? [];

  // Support the old single-image property as a fallback.
  const productImages =
    images.length > 0 ? images : product.image ? [product.image] : [];

  const inStock = product.quantity > 0;
  const price = Number(product.selling_price);

  const formattedPrice = Number.isFinite(price)
    ? `${price.toLocaleString('en-US')} ကျပ်`
    : 'Price unavailable';

  const currentImage = productImages[activeImage] ?? productImages[0];

  function showPreviousImage() {
    setActiveImage((current) =>
      current === 0 ? productImages.length - 1 : current - 1,
    );
  }

  function showNextImage() {
    setActiveImage((current) =>
      current === productImages.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-[#ff277f] hover:shadow-lg sm:rounded-2xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {currentImage ? (
          <Image
            key={currentImage}
            src={currentImage}
            alt={product.name}
            fill
            loading="eager"
            sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No image available
          </div>
        )}

        {productImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="Previous product image"
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow transition hover:bg-white"
            >
              <span aria-hidden="true">‹</span>
            </button>

            <button
              type="button"
              onClick={showNextImage}
              aria-label="Next product image"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow transition hover:bg-white"
            >
              <span aria-hidden="true">›</span>
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-2 py-1">
              {productImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={activeImage === index}
                  className={`h-1.5 rounded-full transition-all ${
                    activeImage === index
                      ? 'w-4 bg-white'
                      : 'w-1.5 bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>

            <span className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-1 text-[10px] font-medium text-white">
              {activeImage + 1}/{productImages.length}
            </span>
          </>
        )}

        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[10px] font-bold sm:left-3 sm:top-3 sm:text-xs ${
            inStock ? 'bg-white text-green-700' : 'bg-red-50 text-red-600'
          }`}
        >
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-primary sm:text-xs">
          {product.item_code}
        </p>

        <h2 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-gray-900 sm:text-base">
          {product.name}
        </h2>

        {product.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500 sm:text-sm">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-4">
          <p className="text-base font-bold text-primary sm:text-lg">
            {formattedPrice}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {inStock
              ? `${product.quantity} available`
              : 'Currently unavailable'}
          </p>
        </div>
      </div>
    </article>
  );
}
