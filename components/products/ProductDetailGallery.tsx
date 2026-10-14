'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  images: string[];
  productName: string;
};

export default function ProductDetailGallery({ images, productName }: Props) {
  const validImages = images.filter(Boolean);
  const [activeImage, setActiveImage] = useState(0);

  const currentImage = validImages[activeImage];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-100 bg-white">
        {currentImage ? (
          <Image
            src={currentImage}
            alt={productName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-4 sm:p-8"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No image available
          </div>
        )}

        {validImages.length > 1 && (
          <span className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            {activeImage + 1}/{validImages.length}
          </span>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {validImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`View product image ${index + 1}`}
              aria-pressed={activeImage === index}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition sm:h-24 sm:w-24 ${
                activeImage === index
                  ? 'border-[#ff277f]'
                  : 'border-gray-200 hover:border-[#ff277d6e]'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} image ${index + 1}`}
                fill
                sizes="96px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
