import Image from 'next/image';
import Link from 'next/link';
import { ScrollAnimations } from '../components/ScrollAnimations';
import { TourCard, type TourCardData } from '../components/cards/TourCard';
import { FlightDealCard, type FlightDealData } from '../components/cards/FlightDealCard';
import toursData from '../../../../data/tours.json';
import promotionsData from '../../../../data/promotions.json';

// Real content, curated for the homepage.
const featuredTours = (toursData as TourCardData[]).filter((t) => t.featured).slice(0, 3);
const flightDeals = (promotionsData as FlightDealData[]).filter((p: any) => p.active).slice(0, 3);

const stats = [
  { number: '15+', label: 'Years of Expertise' },
  { number: '50+', label: 'Destinations' },
  { number: '500+', label: 'Journeys Crafted' },
  { number: '98%', label: 'Guest Satisfaction' },
];

const destinations = [
  {
    name: 'Volcanoes National Park',
    tagline: 'Mountain gorilla trekking',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=1200',
  },
  {
    name: 'Lake Kivu',
    tagline: 'Lakeside retreats & sunsets',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200',
  },
  {
    name: 'Nyungwe Forest',
    tagline: 'Canopy walks & chimpanzees',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200',
  },
  {
    name: 'Akagera National Park',
    tagline: 'Big Five savannah safaris',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200',
  },
  {
    name: 'Kigali',
    tagline: 'Refined city escapes',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1200',
  },
];

const stays = [
  {
    name: 'City Apartments',
    location: 'Kigali',
    description: 'Elegant serviced residences in the heart of the capital.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000',
  },
  {
    name: 'Lakeside Retreats',
    location: 'Lake Kivu',
    description: 'Tranquil waterfront villas with panoramic views.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000',
  },
  {
    name: 'Safari Lodges',
    location: 'Akagera & Volcanoes',
    description: 'Immersive luxury lodges on the edge of the wild.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000',
  },
];

const features = [
  {
    title: 'Bespoke Itineraries',
    description: 'Every journey is designed around your pace, taste, and travel style.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.98 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    ),
  },
  {
    title: 'Local Expertise',
    description: 'Rwanda-based specialists with insider access to hidden gems.',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
  },
  {
    title: '24/7 Concierge',
    description: 'Seamless support before, during, and after your travels.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'IATA-Accredited Flights',
    description: 'Direct airline access for trusted, competitively priced ticketing.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
];

const testimonials = [
  {
    quote: 'Intare designed a gorilla trek and Lake Kivu retreat that exceeded every expectation. Flawless from first call to farewell.',
    name: 'Amara N.',
    detail: 'Gorilla Trek & Kivu Retreat',
  },
  {
    quote: 'The most seamless travel experience we have had in Africa. Thoughtful, discreet, and genuinely luxurious.',
    name: 'James & Lin',
    detail: 'Rwanda Discovery, 6 Days',
  },
  {
    quote: 'Their team handled our flights, lodges, and safaris with precision. We simply showed up and were taken care of.',
    name: 'Daniel K.',
    detail: 'Akagera Safari & Kigali',
  },
];

const faqs = [
  {
    q: 'When is the best time to visit Rwanda?',
    a: 'Rwanda is a year-round destination. The long dry seasons (June–September and December–February) offer the easiest gorilla trekking and game viewing, while the green seasons reward travellers with lush landscapes and fewer crowds.',
  },
  {
    q: 'Do you arrange gorilla trekking permits?',
    a: 'Yes. We secure your permits, guides, and park logistics as part of your itinerary, and advise on fitness and packing so your trek is comfortable and rewarding.',
  },
  {
    q: 'Can you book flights as well as tours and stays?',
    a: 'Absolutely. As an IATA-accredited agency we ticket regional and intercontinental flights, then connect them seamlessly with your accommodation and experiences.',
  },
  {
    q: 'How do I start planning a trip?',
    a: 'Share your dates, interests, and travel style with our team. We respond within 24 hours with a tailored proposal and refine it together until every detail is right.',
  },
];

const partnerLogos = [
  { name: 'Qatar Airways', src: '/aerolineas-images_0009_QatarAirways.png' },
  { name: 'RwandAir', src: '/RwandAir.jpg' },
  { name: 'Kenya Airways', src: '/Kenya_Airways-Logo.wine.png' },
  { name: 'Ethiopian Airlines', src: '/ethiopian-airlines-logo-png_seeklogo-49734.png' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <ScrollAnimations />

      {/* Hero */}
      <section className="hero-section">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=2000"
            alt="Mountain gorilla in the rainforest of Volcanoes National Park, Rwanda"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="hero-overlay" />
        </div>

        <div className="relative z-10 container-luxury text-center text-white">
          <div className="max-w-4xl mx-auto">
            <p className="label-text text-gold-300 mb-6 animate-fade-in">
              Luxury Travel · Rwanda &amp; East Africa
            </p>
            <h1 className="heading-xl mb-8 text-shadow-luxury animate-fade-in-up delay-200">
              Discover Rwanda in
              <span className="block text-luxury-gradient">Refined Comfort</span>
            </h1>
            <p className="text-lg md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto animate-fade-in-up delay-400">
              Curated safaris, luxury stays, seamless flights, and unforgettable local experiences — designed with precision and warmth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up delay-600">
              <Link href="/tours" className="btn-gold rounded-lg">
                Explore Tours
              </Link>
              <Link href="/contact" className="btn-outline rounded-lg">
                Plan Your Journey
              </Link>
            </div>
          </div>
        </div>

        <div className="scroll-indicator animate-fade-in delay-800" />
      </section>

      {/* Intro + Stats */}
      <section className="bg-luxury-dark-red text-white">
        <div className="container-luxury py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-scroll">
              <p className="label-text text-gold-300 mb-4">The Intare Difference</p>
              <h2 className="heading-md mb-6">
                Journeys crafted with precision, comfort, and local expertise.
              </h2>
              <p className="text-white/80 leading-relaxed">
                From Kigali city escapes to gorilla trekking and lakeside retreats, Intare Travels brings together the finest of Rwanda — refined accommodation, expert guides, and effortless logistics — so every moment feels considered.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="fade-in-scroll text-center lg:text-left" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="heading-lg text-gold-400 mb-1">{stat.number}</div>
                  <p className="text-white/70 text-sm tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="label-text text-emerald-600 mb-4">Signature Journeys</p>
              <h2 className="heading-lg text-neutral-900 mb-4">Curated Luxury Tours</h2>
              <div className="gold-divider" />
            </div>
            <Link href="/tours" className="btn-secondary rounded-lg self-start md:self-auto">
              View All Tours
            </Link>
          </div>

          {featuredTours.length === 0 ? (
            <p className="text-center text-neutral-600 py-12">New journeys are being curated. Please check back soon.</p>
          ) : (
            <div className="grid-luxury">
              {featuredTours.map((tour, index) => (
                <div key={tour.id} className="fade-in-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Destination Highlights */}
      <section className="section-padding bg-luxury-off-white">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="label-text text-emerald-600 mb-4">Where We Travel</p>
            <h2 className="heading-lg text-neutral-900 mb-4">Rwanda Destination Highlights</h2>
            <div className="gold-divider mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[18rem]">
            {destinations.map((dest, index) => (
              <Link
                key={dest.name}
                href="/tours"
                className={`group relative rounded-2xl overflow-hidden fade-in-scroll image-hover-zoom ${index === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="text-xs tracking-widest uppercase text-gold-300 mb-1">{dest.tagline}</p>
                  <h3 className="text-2xl font-serif font-semibold">{dest.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Stays */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="label-text text-emerald-600 mb-4">Where You Stay</p>
              <h2 className="heading-lg text-neutral-900 mb-4">Luxury Stays &amp; Apartments</h2>
              <div className="gold-divider" />
            </div>
            <Link href="/accommodation" className="btn-secondary rounded-lg self-start md:self-auto">
              View Accommodation
            </Link>
          </div>

          <div className="grid-luxury">
            {stays.map((stay, index) => (
              <Link
                key={stay.name}
                href="/accommodation"
                className="card-luxury rounded-2xl overflow-hidden group fade-in-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="image-hover-zoom relative aspect-[4/3]">
                  <Image
                    src={stay.image}
                    alt={`${stay.name} in ${stay.location}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-7">
                  <p className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-gold-600 mb-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {stay.location}
                  </p>
                  <h3 className="heading-sm text-neutral-900 mb-2 group-hover:text-forest-800 transition-colors">{stay.name}</h3>
                  <p className="text-neutral-600 text-sm">{stay.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flight Deals */}
      {flightDeals.length > 0 && (
        <section className="section-padding bg-luxury-off-white">
          <div className="container-luxury">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="label-text text-emerald-600 mb-4">Fly With Us</p>
                <h2 className="heading-lg text-neutral-900 mb-4">Featured Flight Deals</h2>
                <div className="gold-divider" />
              </div>
              <Link href="/ticketing" className="btn-secondary rounded-lg self-start md:self-auto">
                All Flight Deals
              </Link>
            </div>

            <div className="grid-luxury">
              {flightDeals.map((promo, index) => (
                <div key={promo.id} className="fade-in-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                  <FlightDealCard promo={promo} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Intare */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="label-text text-emerald-600 mb-4">Why Intare Travels</p>
            <h2 className="heading-lg text-neutral-900 mb-4">Unhurried Excellence, Every Step</h2>
            <div className="gold-divider mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center fade-in-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-forest-50 ring-1 ring-gold-200 flex items-center justify-center mx-auto mb-6 text-forest-800">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="heading-sm text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-luxury-dark-bg text-white">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="label-text text-gold-300 mb-4">Guest Stories</p>
            <h2 className="heading-lg mb-4">Trusted by Discerning Travellers</h2>
            <div className="gold-divider mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <figure
                key={t.name}
                className="glass-morphism rounded-2xl p-8 fade-in-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex text-gold-400 mb-4" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-white/90 leading-relaxed mb-6">“{t.quote}”</blockquote>
                <figcaption>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-white/60">{t.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white border-y border-neutral-100">
        <div className="container-luxury">
          <p className="text-center label-text text-neutral-400 mb-10">Our Airline Partners</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partnerLogos.map((partner) => (
              <div key={partner.name} className="relative h-12">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  sizes="200px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="label-text text-emerald-600 mb-4">Good to Know</p>
            <h2 className="heading-lg text-neutral-900 mb-4">Frequently Asked Questions</h2>
            <div className="gold-divider mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none font-medium text-neutral-900 marker:content-none">
                  <span className="text-lg">{faq.q}</span>
                  <svg className="w-5 h-5 text-forest-800 flex-shrink-0 transition-transform duration-300 group-open:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <p className="mt-3 text-neutral-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/contact" className="text-forest-800 font-semibold hover:text-gold-600 transition-colors">
              Have another question? Talk to a travel expert →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative section-padding text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000"
            alt="Sunrise over the Rwandan savannah"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/90 via-forest-900/80 to-forest-800/70" />
        </div>
        <div className="relative z-10 container-luxury text-center">
          <h2 className="heading-lg mb-6 text-shadow-luxury">Begin Your Rwandan Journey</h2>
          <p className="text-lg md:text-xl mb-10 text-white/85 max-w-2xl mx-auto">
            Tell us how you love to travel. Our experts will craft a private itinerary — flights, stays, and experiences — tailored entirely to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="/contact" className="btn-gold rounded-lg">
              Contact a Travel Expert
            </Link>
            <Link href="/tours" className="btn-outline rounded-lg">
              Browse Tours
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
