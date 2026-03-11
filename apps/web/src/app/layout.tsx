import type { Metadata } from 'next';
import { Sen } from 'next/font/google';
import { Navbar, Footer } from '@tourism/ui';
import './globals.css';

const sen = Sen({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sen',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://intaretravels.rw'),
  title: {
    default: 'Intare Travels - Tours, Apartments & Flight Deals in Rwanda',
    template: '%s | Intare Travels',
  },
  description: 'Discover premium tours, luxury apartments, and exclusive flight deals in Rwanda',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sen.variable}>
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
