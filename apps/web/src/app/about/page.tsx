import { Metadata } from 'next';
import Image from 'next/image';
import { Section, Grid, Button, Breadcrumb, Badge } from '@tourism/ui';
import { generateSEO } from '@tourism/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'About Us - IATA Accredited Travel Agency',
  description: 'Intare Tours & Travel Agency - Your IATA-accredited travel partner in Rwanda. Specializing in global air ticketing and unforgettable African adventures.',
  path: '/about',
  keywords: ['IATA accredited', 'Rwanda travel agency', 'flight booking', 'African tours', 'gorilla trekking'],
});

export default function AboutPage() {
  return (
    <>
      <div className="relative bg-neutral-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1534567110243-8875d64ca8ff?q=80&w=2000"
            alt="Giraffe in the African wild"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/50 to-neutral-900/80" />
        </div>

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} theme="dark" />
          <div className="mt-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="primary">IATA Accredited</Badge>
              <Badge variant="secondary">Licensed & Insured</Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Gateway to Extraordinary Adventures
            </h1>
            <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed">
              Premier IATA-accredited travel partner in Rwanda, specializing in comprehensive air ticketing services and unforgettable tour experiences across Africa and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Global Air Travel Solutions */}
      <Section>
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">Our Primary Service</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Global Air Travel Solutions</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            IATA Accredited Flight Booking Excellence with direct access to airline systems worldwide
          </p>
        </div>

        <Grid cols={3}>
          <div className="bg-white border border-neutral-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Worldwide Connectivity</h3>
            <p className="text-neutral-600 mb-4">
              Access our extensive network of airline partnerships for seamless connections to any global destination.
            </p>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Regional African routes
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Intercontinental flights
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Competitive pricing
              </li>
            </ul>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Service Excellence</h3>
            <p className="text-neutral-600 mb-4">
              24/7 booking support with real-time fare monitoring and comprehensive travel assistance.
            </p>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Real-time fare monitoring
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Flexible change policies
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Travel document guidance
              </li>
            </ul>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Business Travel Solutions</h3>
            <p className="text-neutral-600 mb-4">
              Corporate account management with executive travel planning and meeting coordination.
            </p>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Corporate accounts
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Expense reporting
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Priority customer service
              </li>
            </ul>
          </div>
        </Grid>
      </Section>

      {/* Rwanda Tours */}
      <Section className="bg-neutral-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover Rwanda: The Land of a Thousand Hills</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Experience the magic of Rwanda with our expertly curated tours and safari adventures
          </p>
        </div>

        <Grid cols={2}>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?q=80&w=800"
                alt="Gorilla trekking"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">Gorilla Trekking Adventures</h3>
              <p className="text-neutral-600 mb-4">
                Experience the magic of encountering mountain gorillas in their pristine habitat at Volcanoes National Park. Includes permits, professional guides, and cultural village visits.
              </p>
              <Button href="/tours/gorilla-trekking-volcanoes" size="sm">Learn More</Button>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800"
                alt="Akagera safari"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">Akagera National Park Safaris</h3>
              <p className="text-neutral-600 mb-4">
                Journey through Rwanda's premier safari destination, home to the Big Five and over 480 bird species. Game drives, boat safaris, and luxury lodge accommodations.
              </p>
              <Button href="/tours/akagera-safari-day-tour" size="sm">Learn More</Button>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800"
                alt="Kigali city"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">Kigali Cultural Immersion</h3>
              <p className="text-neutral-600 mb-4">
                Discover the remarkable transformation of Rwanda's capital. Visit memorial sites, explore vibrant markets, experience local cuisine, and witness modern innovation.
              </p>
              <Button href="/tours/kigali-full-day-experience" size="sm">Learn More</Button>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?q=80&w=800"
                alt="Nyungwe forest"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">Nyungwe Forest Expeditions</h3>
              <p className="text-neutral-600 mb-4">
                Explore one of Africa's oldest rainforests. Track chimpanzees, walk the canopy bridge, and discover rare endemic species in this biodiversity hotspot.
              </p>
              <Button href="/tours/rwanda-discovery-6-days" size="sm">Learn More</Button>
            </div>
          </div>
        </Grid>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Intare Tours & Travel?</h2>
        </div>

        <Grid cols={4}>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">IATA Accredited</h3>
            <p className="text-neutral-600 text-sm">
              Direct airline access and industry credibility
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Competitive Pricing</h3>
            <p className="text-neutral-600 text-sm">
              Best available fares and exclusive deals
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">24/7 Support</h3>
            <p className="text-neutral-600 text-sm">
              Round-the-clock assistance and rebooking
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Local Expertise</h3>
            <p className="text-neutral-600 text-sm">
              Rwanda-based with global standards
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Sustainable Tourism</h3>
            <p className="text-neutral-600 text-sm">
              Committed to responsible travel
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Safety First</h3>
            <p className="text-neutral-600 text-sm">
              Your safety is our top priority
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Personalized Service</h3>
            <p className="text-neutral-600 text-sm">
              Tailored to your preferences
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Instant Ticketing</h3>
            <p className="text-neutral-600 text-sm">
              Immediate confirmation and e-tickets
            </p>
          </div>
        </Grid>
      </Section>

      {/* CTA */}
      <Section className="bg-primary-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Begin Your Adventure?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Contact our expert team today for flight bookings or tour packages
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/tours" size="lg" variant="secondary">
              Explore Tours
            </Button>
            <Button href="tel:+250791946733" size="lg" variant="outline">
              Call +250 791 946 733
            </Button>
            <Button href="mailto:intaretourtravels@gmail.com" size="lg" variant="outline">
              Email Us
            </Button>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-600">
            <p className="text-sm text-primary-200">
              IATA Accredited | Licensed & Insured | Member of Rwanda Tourism Association | Certified Sustainable Tourism Operator
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
