import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { generateSEO } from '@tourism/lib/seo';
import { Reveal, RevealGroup, RevealItem } from '../../components/motion/Reveal';

export const metadata: Metadata = generateSEO({
  title: 'About Us - IATA Accredited Travel Agency',
  description: 'Intare Tours & Travel Agency - Your IATA-accredited travel partner in Rwanda. Specializing in global air ticketing and unforgettable African adventures.',
  path: '/about',
  keywords: ['IATA accredited', 'Rwanda travel agency', 'flight booking', 'African tours', 'gorilla trekking'],
});

const airServices = [
  {
    title: 'Worldwide Connectivity',
    description: 'Access our extensive network of airline partnerships for seamless connections to any global destination.',
    points: ['Regional African routes', 'Intercontinental flights', 'Competitive pricing'],
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Service Excellence',
    description: '24/7 booking support with real-time fare monitoring and comprehensive travel assistance.',
    points: ['Real-time fare monitoring', 'Flexible change policies', 'Travel document guidance'],
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  {
    title: 'Business Travel Solutions',
    description: 'Corporate account management with executive travel planning and meeting coordination.',
    points: ['Corporate accounts', 'Expense reporting', 'Priority customer service'],
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
];

const tours = [
  {
    title: 'Gorilla Trekking Adventures',
    description: 'Encounter mountain gorillas in their pristine habitat at Volcanoes National Park — permits, expert guides, and cultural village visits included.',
    image: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?q=80&w=800',
    href: '/tours/gorilla-trekking-volcanoes',
  },
  {
    title: 'Akagera National Park Safaris',
    description: "Journey through Rwanda's premier safari destination, home to the Big Five and over 480 bird species, with game drives and luxury lodges.",
    image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?q=80&w=800',
    href: '/tours/akagera-safari-day-tour',
  },
  {
    title: 'Kigali Cultural Immersion',
    description: "Discover the remarkable transformation of Rwanda's capital — memorial sites, vibrant markets, local cuisine, and modern innovation.",
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800',
    href: '/tours/kigali-full-day-experience',
  },
  {
    title: 'Nyungwe Forest Expeditions',
    description: "Explore one of Africa's oldest rainforests — track chimpanzees, walk the canopy bridge, and discover rare endemic species.",
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800',
    href: '/tours/rwanda-discovery-6-days',
  },
];

const whyUs = [
  { title: 'IATA Accredited', desc: 'Direct airline access and industry credibility', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { title: 'Competitive Pricing', desc: 'Best available fares and exclusive deals', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: '24/7 Support', desc: 'Round-the-clock assistance and rebooking', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  { title: 'Local Expertise', desc: 'Rwanda-based with global standards', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Sustainable Tourism', desc: 'Committed to responsible travel', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { title: 'Safety First', desc: 'Your safety is our top priority', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { title: 'Personalized Service', desc: 'Tailored to your preferences', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
  { title: 'Instant Ticketing', desc: 'Immediate confirmation and e-tickets', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal-900 text-white py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/17069651/pexels-photo-17069651.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt="Giraffe in the African wild"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="section-overlay-dark" />
        </div>

        <div className="container-luxury relative z-10">
          <Reveal className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-gold-500 text-charcoal text-xs font-semibold tracking-widest uppercase">IATA Accredited</span>
              <span className="px-4 py-1.5 rounded-full border border-white/30 text-white text-xs font-semibold tracking-widest uppercase">Licensed &amp; Insured</span>
            </div>
            <h1 className="heading-xl mb-6 text-shadow-luxury">
              Your Gateway to Extraordinary Adventures
            </h1>
            <p className="text-lg md:text-2xl text-white/85 leading-relaxed max-w-3xl">
              Premier IATA-accredited travel partner in Rwanda, specialising in comprehensive air ticketing and unforgettable tour experiences across Africa and beyond.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Global Air Travel Solutions */}
      <section className="section-padding">
        <div className="container-luxury">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="label-text text-emerald-600 mb-4">Our Primary Service</p>
            <h2 className="heading-lg text-neutral-900 mb-4">Global Air Travel Solutions</h2>
            <div className="gold-divider mx-auto mb-5" />
            <p className="text-lg text-neutral-600">
              IATA-accredited flight booking excellence with direct access to airline systems worldwide.
            </p>
          </Reveal>

          <RevealGroup className="grid-luxury">
            {airServices.map((service) => (
              <RevealItem key={service.title} className="card-luxury rounded-2xl p-8">
                <div className="w-14 h-14 rounded-full bg-forest-50 ring-1 ring-gold-200 flex items-center justify-center mb-5 text-forest-800">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <h3 className="heading-sm text-neutral-900 mb-3">{service.title}</h3>
                <p className="text-neutral-600 mb-5 text-sm leading-relaxed">{service.description}</p>
                <ul className="space-y-2.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <svg className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Rwanda Tours */}
      <section className="section-padding bg-luxury-off-white">
        <div className="container-luxury">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="label-text text-emerald-600 mb-4">Curated Journeys</p>
            <h2 className="heading-lg text-neutral-900 mb-4">Discover Rwanda, Land of a Thousand Hills</h2>
            <div className="gold-divider mx-auto mb-5" />
            <p className="text-lg text-neutral-600">
              Experience the magic of Rwanda with our expertly curated tours and safari adventures.
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tours.map((tour) => (
              <RevealItem key={tour.title}>
                <Link href={tour.href} className="card-luxury rounded-2xl overflow-hidden group block h-full">
                  <div className="image-hover-zoom relative h-64">
                    <Image src={tour.image} alt={tour.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                  <div className="p-7">
                    <h3 className="heading-sm text-neutral-900 mb-3 group-hover:text-forest-800 transition-colors">{tour.title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">{tour.description}</p>
                    <span className="text-forest-800 font-semibold text-sm group-hover:text-gold-600 transition-colors">Learn More →</span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-luxury">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="label-text text-emerald-600 mb-4">The Intare Promise</p>
            <h2 className="heading-lg text-neutral-900 mb-4">Why Choose Intare Tours &amp; Travel</h2>
            <div className="gold-divider mx-auto" />
          </Reveal>

          <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.06}>
            {whyUs.map((item) => (
              <RevealItem key={item.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-forest-50 ring-1 ring-gold-200 flex items-center justify-center mx-auto mb-5 text-forest-800">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm">{item.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 text-white overflow-hidden bg-charcoal-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000"
            alt="Lush green Rwandan landscape"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="section-overlay-dark" />
        </div>
        <div className="relative z-10 container-luxury">
          <Reveal className="text-center max-w-3xl mx-auto">
            <h2 className="heading-lg mb-6 text-shadow-luxury">Ready to Begin Your Adventure?</h2>
            <p className="text-lg md:text-xl mb-10 text-white/85">
              Contact our expert team today for flight bookings or tour packages.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/tours" className="btn-gold rounded-lg">Explore Tours</Link>
              <Link href="tel:+250791946733" className="btn-outline rounded-lg">Call +250 791 946 733</Link>
              <Link href="mailto:intaretourtravels@gmail.com" className="btn-outline rounded-lg">Email Us</Link>
            </div>
            <p className="mt-10 pt-8 border-t border-white/15 text-sm text-white/55">
              IATA Accredited · Licensed &amp; Insured · Member of Rwanda Tourism Association · Certified Sustainable Tourism Operator
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
