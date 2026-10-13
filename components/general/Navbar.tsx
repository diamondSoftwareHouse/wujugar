'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
          aria-label="Wujugar Home"
        >
          <Image
            src="/kwisi.svg"
            alt="Wujugar Logo"
            width={40}
            height={40}
            priority
            className="h-7 w-7 shrink-0 object-contain sm:h-9 sm:w-9"
          />

          <span className="truncate text-lg font-bold tracking-tight text-primary sm:text-xl">
            Wujugar
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-4xl px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                  isActive ? 'bg-[#ff277f] text-white font-bold' : 'text-black'
                }`}
              >
                {link.label}

                {isActive && (
                  <Image
                    src="/kwisi.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="absolute -right-1 -top-1 h-5 w-5 object-contain"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
