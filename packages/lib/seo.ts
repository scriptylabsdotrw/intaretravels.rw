import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const SITE_NAME = 'Tourism Platform';
const COUNTRY = 'YourCountry';

export function generateSEO({
  title,
  description,
  path,
  image = '/og-image.jpg',
  type = 'website',
  keywords = []
}: SEOProps): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SITE_NAME }],
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${image}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_URL}${image}`],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const ticketingKeywords = [
  `cheap flights in ${COUNTRY}`,
  `flight deals ${COUNTRY}`,
  `airline tickets near me`,
  `best flight prices ${COUNTRY}`,
  `discount flights ${COUNTRY}`,
  `book flights ${COUNTRY}`,
  `flight promotions ${COUNTRY}`,
];
