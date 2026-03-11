import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section, Grid, Card, Button, Breadcrumb, Badge } from '@tourism/ui';
import { generateSEO } from '@tourism/lib/seo';
import apartmentsData from '../../../../../data/apartments.json';

export const metadata: Metadata = generateSEO({
  title: 'Luxury Apartments & Accommodation',
  description: 'Discover our exclusive collection of luxury apartments across Africa. Premium stays with modern amenities in prime locations.',
  path: '/accommodation',
  keywords: ['luxury apartments', 'accommodation', 'hotels', 'vacation rentals', 'Africa accommodation'],
});

export default function AccommodationPage() {
  return (
    <>
      <div className="relative bg-neutral-900 text-white py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2000"
            alt="Luxury accommodation"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/50 to-neutral-900/80" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Accommodation' }]} theme="dark" />
          <div className="mt-8 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Luxury Accommodation
            </h1>
            <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed">
              Our exclusive properties offer the perfect blend of comfort, style, and location for your African adventure.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium">Prime Locations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-sm font-medium">Modern Amenities</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium">Verified Properties</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <Grid cols={3}>
          {apartmentsData.map((apartment) => (
            <Link key={apartment.id} href={`/accommodation/${apartment.slug}`} className="group">
              <Card hover>
                <div className="aspect-[4/3] relative bg-neutral-200 overflow-hidden">
                  <Image
                    src={apartment.image}
                    alt={apartment.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {apartment.featured && (
                    <div className="absolute top-4 right-4 bg-primary-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{apartment.bedrooms} Bedrooms</Badge>
                    <Badge variant="secondary">{apartment.bathrooms} Bathrooms</Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-700 transition-colors">
                    {apartment.name}
                  </h3>
                  <p className="text-neutral-600 mb-2 text-sm">{apartment.address}</p>
                  <p className="text-neutral-600 mb-4 line-clamp-2">
                    {apartment.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {apartment.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                    {apartment.amenities.length > 3 && (
                      <span className="text-xs text-neutral-500">+{apartment.amenities.length - 3} more</span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-neutral-500">From</span>
                      <div className="text-2xl font-bold text-primary-700">
                        ${apartment.pricePerNight}
                        <span className="text-sm text-neutral-600 font-normal">/night</span>
                      </div>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </Grid>
      </Section>

      <Section className="bg-neutral-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Properties?</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Every property is carefully selected and maintained to ensure your comfort
          </p>
        </div>
        <Grid cols={4}>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Prime Locations</h3>
            <p className="text-neutral-600 text-sm">
              Close to attractions and amenities
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Modern Amenities</h3>
            <p className="text-neutral-600 text-sm">
              WiFi, kitchen, and all essentials
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Verified & Safe</h3>
            <p className="text-neutral-600 text-sm">
              All properties are inspected
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">24/7 Support</h3>
            <p className="text-neutral-600 text-sm">
              We're here whenever you need us
            </p>
          </div>
        </Grid>
      </Section>

      <Section className="bg-primary-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Need Help Finding the Perfect Stay?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Our team can help you find accommodation that matches your needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="tel:+250780100064" size="lg" variant="secondary">
              Call +250 780 100 064
            </Button>
            <Button href="mailto:booking@intaretravels.rw" size="lg" variant="outline">
              Email Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
