import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Section, Button, Badge } from '@tourism/ui';
import { generateSEO } from '@tourism/lib/seo';
import { StructuredData, generateApartmentSchema, generateBreadcrumbSchema } from '@tourism/lib/structured-data';
import apartmentsData from '../../../../../../data/apartments.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://intaretravels.rw';

export async function generateStaticParams() {
  return apartmentsData.map((apartment) => ({
    slug: apartment.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const apartment = apartmentsData.find(a => a.slug === slug);
  if (!apartment) return {};

  return generateSEO({
    title: apartment.seoTitle || apartment.name,
    description: apartment.seoDescription || apartment.description,
    path: `/accommodation/${apartment.slug}`,
    image: apartment.image,
    keywords: ['accommodation', 'apartment', 'hotel', apartment.name],
  });
}

export default async function AccommodationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const apartment = apartmentsData.find(a => a.slug === slug);
  if (!apartment) notFound();

  const apartmentSchema = generateApartmentSchema({
    name: apartment.name,
    description: apartment.description,
    pricePerNight: apartment.pricePerNight,
    currency: apartment.currency,
    image: apartment.image,
    url: `${SITE_URL}/accommodation/${apartment.slug}`,
    address: apartment.address,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Accommodation', url: `${SITE_URL}/accommodation` },
    { name: apartment.name, url: `${SITE_URL}/accommodation/${apartment.slug}` },
  ]);

  return (
    <>
      <StructuredData data={apartmentSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Hero Image */}
      <div className="relative h-[60vh] bg-neutral-900">
        <Image
          src={apartment.image}
          alt={apartment.name}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {apartment.name}
            </h1>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-lg">{apartment.address}</span>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div>
              <h2 className="text-3xl font-bold mb-4">About This Property</h2>
              <p className="text-lg text-neutral-700 leading-relaxed">
                {apartment.description}
              </p>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Property Details</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-neutral-50 p-6 rounded-lg text-center">
                  <svg className="w-8 h-8 text-primary-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <p className="text-2xl font-bold text-neutral-900">{apartment.bedrooms}</p>
                  <p className="text-neutral-600">Bedrooms</p>
                </div>

                <div className="bg-neutral-50 p-6 rounded-lg text-center">
                  <svg className="w-8 h-8 text-primary-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  <p className="text-2xl font-bold text-neutral-900">{apartment.bathrooms}</p>
                  <p className="text-neutral-600">Bathrooms</p>
                </div>

                <div className="bg-neutral-50 p-6 rounded-lg text-center">
                  <svg className="w-8 h-8 text-primary-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-2xl font-bold text-neutral-900">{apartment.maxGuests}</p>
                  <p className="text-neutral-600">Max Guests</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Amenities</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {apartment.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-neutral-50 p-4 rounded-lg">
                    <svg className="w-5 h-5 text-primary-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div>
              <h2 className="text-3xl font-bold mb-6">House Rules</h2>
              <div className="space-y-3 text-neutral-700">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-neutral-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Check-in: 2:00 PM - 10:00 PM</p>
                    <p className="text-sm text-neutral-600">Early check-in available upon request</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-neutral-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Check-out: 11:00 AM</p>
                    <p className="text-sm text-neutral-600">Late check-out available for additional fee</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-neutral-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  <p>No smoking inside the property</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-neutral-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Suitable for children and families</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border-2 border-neutral-200 rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <p className="text-sm text-neutral-600 mb-2">Price per night</p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-primary-700">${apartment.pricePerNight}</span>
                  <span className="text-neutral-600 ml-2">USD</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="text-neutral-600">Min. Stay</span>
                  <span className="font-medium">2 nights</span>
                </div>
                <div className="flex justify-between py-3 border-b border-neutral-200">
                  <span className="text-neutral-600">Max Guests</span>
                  <span className="font-medium">{apartment.maxGuests} people</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-neutral-600">Availability</span>
                  <span className="font-medium text-green-600">Available</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button href="tel:+250780100064" size="lg" className="w-full">
                  Call to Book
                </Button>
                <Button href="mailto:booking@intaretravels.rw" variant="outline" size="lg" className="w-full">
                  Email Inquiry
                </Button>
              </div>

              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-900 font-medium mb-2">
                  Special rates for long stays
                </p>
                <p className="text-sm text-primary-800">
                  Contact us for weekly and monthly rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Stay?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Contact us today to check availability
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="tel:+250780100064" size="lg" variant="secondary">
              Call +250 780 100 064
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

export const revalidate = 3600;
