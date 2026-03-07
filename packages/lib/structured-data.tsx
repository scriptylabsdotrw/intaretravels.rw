import { ReactElement } from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps): ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateTravelAgencySchema(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Tourism Platform',
    url,
    description: 'Premium tours, apartments, and flight deals',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'YourCountry',
    },
  };
}

export function generateTourSchema(tour: {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.name,
    description: tour.description,
    image: tour.image,
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: tour.currency,
      url: tour.url,
      availability: 'https://schema.org/InStock',
    },
  };
}

export function generateApartmentSchema(apartment: {
  name: string;
  description: string;
  pricePerNight: number;
  currency: string;
  image: string;
  url: string;
  address: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    name: apartment.name,
    description: apartment.description,
    image: apartment.image,
    address: {
      '@type': 'PostalAddress',
      streetAddress: apartment.address,
    },
    priceRange: `${apartment.currency}${apartment.pricePerNight}+`,
    url: apartment.url,
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'TravelAgency',
      name: 'Tourism Platform',
    },
    areaServed: 'YourCountry',
    url: service.url,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
