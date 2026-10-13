'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    image: '/hero-shopping.jpg',
    alt: 'Featured products at Wujugar',
  },
  {
    image: '/hero-eating.jpg',
    alt: 'New arrivals',
  },
  {
    image: '/hero-sleeping.jpg',
    alt: 'Featured collection',
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(nextSlide, 5000);

    return () => window.clearInterval(timer);
  }, [nextSlide]);

  return (
    <section
      aria-label="Featured products"
      aria-roledescription="carousel"
      className="relative w-full overflow-hidden"
    >
      {/* Slide image */}
      <div className="relative aspect-video w-full sm:aspect-21/8">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeIndex === index ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
            aria-hidden={activeIndex !== index}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {/* Previous button */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-2xl text-gray-900 shadow-md transition hover:bg-white sm:left-6 sm:h-12 sm:w-12"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="h-6 w-6 sm:h-7 sm:w-7"
          fill="currentColor"
        >
          <path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z" />
        </svg>
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-2xl text-gray-900 shadow-md transition hover:bg-white sm:right-6 sm:h-12 sm:w-12"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="h-6 w-6 rotate-180"
          fill="currentColor"
        >
          <path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z" />
        </svg>
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-5">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? 'w-7 bg-white'
                : 'w-2 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
