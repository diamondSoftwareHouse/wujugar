import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Wujugar Home"
        >
          <Image
            src="/kwisi.svg"
            alt="Wujugar Logo"
            width={36}
            height={36}
            className="h-8 w-8 object-contain"
          />

          <span className="text-lg font-bold text-primary">Wujugar</span>
        </Link>

        <nav
          aria-label="Social media links"
          className="flex items-center gap-5 text-sm text-gray-600"
        >
          {/* TikTok */}
          <Link
            href="https://www.tiktok.com/@wujugar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Wujugar on TikTok"
            className="flex items-center gap-2 transition-colors hover:text-[#ff277f]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              aria-hidden="true"
              className="h-5 w-5 shrink-0 fill-current"
            >
              <path d="M448.5 209.9c-44 .1-87-13.6-122.8-39.2l0 178.7c0 33.1-10.1 65.4-29 92.6s-45.6 48-76.6 59.6-64.8 13.5-96.9 5.3-60.9-25.9-82.7-50.8-35.3-56-39-88.9 2.9-66.1 18.6-95.2 40-52.7 69.6-67.7 62.9-20.5 95.7-16l0 89.9c-15-4.7-31.1-4.6-46 .4s-27.9 14.6-37 27.3-14 28.1-13.9 43.9 5.2 31 14.5 43.7 22.4 22.1 37.4 26.9 31.1 4.8 46-.1 28-14.4 37.2-27.1 14.2-28.1 14.2-43.8l0-349.4 88 0c-.1 7.4 .6 14.9 1.9 22.2 3.1 16.3 9.4 31.9 18.7 45.7s21.3 25.6 35.2 34.6c19.9 13.1 43.2 20.1 67 20.1l0 87.4z" />
            </svg>
            <span>TikTok</span>
          </Link>

          {/* Telegram */}
          <Link
            href="https://t.me/wujugarr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Wujugar on Telegram"
            className="flex items-center gap-2 transition-colors hover:text-[#ff277f]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              aria-hidden="true"
              className="h-5 w-5 shrink-0 fill-current"
            >
              <path d="M256 8a248 248 0 1 0 0 496 248 248 0 1 0 0-496zM371 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5c-2.2 .5-37.1 23.5-104.6 69.1-9.9 6.8-18.9 10.1-26.9 9.9-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3 .6-4.5 6.7-9 18.4-13.7 72.3-31.5 120.5-52.3 144.6-62.3 68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9 2 1.7 3.2 4.1 3.5 6.7 .5 3.2 .6 6.5 .4 9.8z" />
            </svg>
            <span>Telegram</span>
          </Link>
        </nav>
        <p className="text-xs text-gray-500">
          © 2026 Wujugar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
