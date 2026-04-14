import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ScrollAnimations } from '../components/ScrollAnimations';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://intaretravels.rw'),
  title: {
    default: 'Intare Travels - Luxury East African Experiences',
    template: '%s | Intare Travels',
  },
  description: 'Discover extraordinary luxury travel experiences across East Africa. Bespoke tours, exclusive accommodations, and premium flight services.',
  keywords: ['luxury travel', 'East Africa tours', 'Rwanda travel', 'gorilla trekking', 'safari', 'premium accommodation'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
