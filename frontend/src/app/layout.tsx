import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import './layout.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Peccu',
  description: 'Saying it, Say it right.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.className}`}>
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
