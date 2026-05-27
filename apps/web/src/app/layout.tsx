import type { Metadata } from 'next';
import { Mulish, Cormorant_Garamond } from 'next/font/google';
import { ScrollAnimations } from '../components/ScrollAnimations';
import { LuxuryNavigation } from '../components/LuxuryNavigation';
import { LuxuryFooter } from '../components/LuxuryFooter';
import './globals.css';

const body = Mulish({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
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
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Strichpunkt+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <ScrollAnimations />
        <LuxuryNavigation />
        {children}
        <LuxuryFooter />
      </body>
    </html>
  );
}
