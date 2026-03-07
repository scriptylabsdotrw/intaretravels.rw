import { Hero, Section, Grid, Card, Button, FeatureCard } from '@tourism/ui';
import { StructuredData, generateTravelAgencySchema } from '@tourism/lib';
import Image from 'next/image';
import Link from 'next/link';

// Import tours data
import toursData from '../../../../data/tours.json';

export default function HomePage() {
  const schema = generateTravelAgencySchema(process.env.NEXT_PUBLIC_SITE_URL || '');
  const featuredTours = toursData.filter(tour => tour.featured).slice(0, 3);

  return (
    <>
      <StructuredData data={schema} />
      
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2400"
            alt="African Adventure"
            fill
            className="object-cover"
            priority
            quality={95}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Explore Africa's
                <br />
                Hidden Gems
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
                Discover unforgettable experiences across five incredible destinations
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/tours" size="lg" className="bg-primary-700 text-white hover:bg-primary-800">
                  View Tours
                </Button>
                <Button href="/contact" size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Quick Links */}
      <div className="relative -mt-32 z-20 mb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <Grid cols={4} gap={6}>
            <FeatureCard
              title="Angola Adventures"
              image="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800"
              href="/tours/angola-7-day-adventure"
            />
            <FeatureCard
              title="Victoria Falls"
              image="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800"
              href="/tours/zambia-victoria-falls-7-days"
            />
            <FeatureCard
              title="Lake Malawi"
              image="https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800"
              href="/tours/malawi-lake-paradise-7-days"
            />
            <FeatureCard
              title="Mauritius Paradise"
              image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800"
              href="/tours/mauritius-island-escape-3-days"
            />
          </Grid>
        </div>
      </div>

      {/* Featured Tours */}
      <Section title="Featured Tours" subtitle="Handpicked experiences across Africa">
        <Grid cols={3}>
          {featuredTours.map((tour) => (
            <Link key={tour.id} href={`/tours/${tour.slug}`} className="group">
              <Card hover>
                <div className="aspect-[4/3] relative bg-neutral-200 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-neutral-600">{tour.duration}</span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-sm text-primary-700 font-medium">
                      {tour.highlights.length} highlights
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-700 transition-colors">
                    {tour.name}
                  </h3>
                  <p className="text-neutral-600 mb-4 line-clamp-2">
                    {tour.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-neutral-500">From</span>
                      <div className="text-2xl font-bold text-primary-700">
                        ${tour.price}
                        <span className="text-sm text-neutral-600 font-normal">/person</span>
                      </div>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </Grid>
        
        <div className="text-center mt-12">
          <Button href="/tours" size="lg" variant="outline">
            View All Tours
          </Button>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section 
        title="Why Travel With Intare?" 
        subtitle="Your trusted partner for African adventures"
        className="bg-neutral-50"
      >
        <Grid cols={3}>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Expertly Curated</h3>
            <p className="text-neutral-600">
              Every itinerary is carefully designed for the perfect balance of adventure and relaxation
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Best Value</h3>
            <p className="text-neutral-600">
              Transparent pricing with everything included - no hidden fees or surprises
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-neutral-600">
              Our team is always available to ensure your journey is smooth and memorable
            </p>
          </div>
        </Grid>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready for Your African Adventure?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Contact us today to start planning your dream journey
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
