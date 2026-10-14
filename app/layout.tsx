import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/home/Footer';

export const metadata: Metadata = {
  title: 'Wujugar',
  description: 'Hamster စျေးဆိုင်',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
