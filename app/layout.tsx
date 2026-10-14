import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/home/Footer';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Wujugar Hamster စျေးဆိုင်',
  description: 'Wujuga Hamster စျေးဆိုင်',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense
          fallback={
            <header className="h-14 border-b border-gray-200 bg-white sm:h-16" />
          }
        >
          <Navbar />
        </Suspense>

        {children}

        <Footer />
      </body>
      <Analytics />
    </html>
  );
}
