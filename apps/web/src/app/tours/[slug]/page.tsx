import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Section, Button, Badge, Breadcrumb } from '@tourism/ui';
import { generateSEO } from '@tourism/lib/seo';
import { StructuredData, generateTourSchema, generateBreadcrumbSchema } from '@tourism/lib/structured-data';
import toursData from '../../../../../../data/tours.json';
import { TourItinerary } from './TourItinerary';
import { TourBooking } from './TourBooking';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://intaretravels.rw';

export async function generateStaticParams() {
  return toursData.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = toursData.find(t => t.slug === slug);
  if (!tour) return {};

  return generateSEO({
    title: tour.seoTitle || tour.name,
    description: tour.seoDescription || tour.description,
    path: `/tours/${tour.slug}`,
    image: tour.image,
    keywords: ['tour', 'travel', 'vacation', tour.name],
  });
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = toursData.find(t => t.slug === slug);
  if (!tour) notFound();

  const tourSchema = generateTourSchema({
    name: tour.name,
    description: tour.description,
    price: tour.price,
    currency: tour.currency,
    image: tour.image,
    url: `${SITE_URL}/tours/${tour.slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tours', url: `${SITE_URL}/tours` },
    { name: tour.name, url: `${SITE_URL}/tours/${tour.slug}` },
  ]);

  return (
    <>
      <StructuredData data={tourSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Hero Image */}
      <div className="relative h-[60vh] bg-neutral-900">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Tours', href: '/tours' },
                { label: tour.name }
              ]} 
              theme="dark"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-6 mb-4">
              {tour.name}
            </h1>
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary">{tour.duration}</Badge>
              <Badge variant="secondary">{tour.highlights.length} Highlights</Badge>
              {tour.featured && <Badge variant="success">Featured</Badge>}
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
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="text-lg text-neutral-700 leading-relaxed">
                {tour.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Tour Highlights</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-primary-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            {tour.itinerary && <TourItinerary itinerary={tour.itinerary} />}

            {/* What's Included */}
            <div>
              <h2 className="text-3xl font-bold mb-6">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {tour.included.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-neutral-50 p-4 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <TourBooking
              tourName={tour.name}
              price={tour.price}
              duration={tour.duration}
              image={tour.image}
            />
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book This Adventure?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Contact us today to reserve your spot
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
