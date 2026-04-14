import Image from 'next/image';
import Link from 'next/link';
import { LuxuryNavigation } from '../components/LuxuryNavigation';
import { LuxuryFooter } from '../components/LuxuryFooter';
import { ScrollAnimations } from '../components/ScrollAnimations';
import toursData from '../../../../data/tours.json';

// Get featured tours from real data
const tours = toursData.filter(tour => tour.featured).slice(0, 3);

const stats = [
  { number: '500+', label: 'Happy Travelers', description: 'Satisfied customers worldwide' },
  { number: '50+', label: 'Destinations', description: 'Across East Africa' },
  { number: '15+', label: 'Years Experience', description: 'In luxury travel' },
  { number: '98%', label: 'Success Rate', description: 'Customer satisfaction' },
];

const features = [
  {
    title: 'Bespoke Experiences',
    description: 'Tailored journeys crafted to your unique preferences and desires.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: '24/7 Concierge Service',
    description: 'Round-the-clock support ensuring seamless travel experiences.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Exclusive Access',
    description: 'Private tours and VIP experiences unavailable to regular tourists.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
  {
    title: 'Local Expertise',
    description: 'Deep cultural knowledge and insider access to hidden gems.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Best Value Guarantee',
    description: 'Competitive pricing with unmatched quality and service standards.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Sustainable Tourism',
    description: 'Responsible travel that preserves destinations for future generations.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
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
      <LuxuryNavigation />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=2000"
            alt="Mountain Gorillas in Rwanda"
            fill
            className="object-cover"
            priority
          />
          <div className="hero-overlay" />
        </div>
        
        <div className="relative z-10 container-luxury text-center text-white">
          <div className="max-w-4xl mx-auto">
            <p className="label-text text-white mb-6 animate-fade-in">
              Luxury Travel Experiences
            </p>
            <h1 className="heading-xl mb-8 text-shadow-luxury animate-fade-in-up delay-200">
              Discover East Africa's
              <span className="block text-white">Hidden Treasures</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white max-w-2xl mx-auto animate-fade-in-up delay-400">
              Embark on extraordinary journeys through pristine landscapes, encounter magnificent wildlife, and immerse yourself in rich cultural heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-600">
              <Link href="/tours" className="btn-primary rounded-lg">
                Explore Tours
              </Link>
              <Link href="/contact" className="btn-outline rounded-lg">
                Plan Your Journey
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator animate-fade-in delay-800" />
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-luxury-dark-red text-white">
        <div className="container-luxury">
          <div className="grid-stats text-center">
            {stats.map((stat, index) => (
              <div key={index} className="fade-in-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="heading-lg text-red-200 mb-2">{stat.number}</div>
                <h3 className="heading-sm mb-2">{stat.label}</h3>
                <p className="text-red-100">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-luxury-off-white">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="label-text text-red-800 mb-4">Why Choose Intare Travels</p>
            <h2 className="heading-lg text-neutral-900 mb-6">
              Unparalleled Excellence in Every Journey
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We craft extraordinary experiences that go beyond traditional tourism, creating memories that last a lifetime.
            </p>
          </div>
          
          <div className="grid-luxury">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-luxury rounded-2xl p-8 text-center fade-in-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-800">
                  {feature.icon}
                </div>
                <h3 className="heading-sm text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="label-text text-red-800 mb-4">Featured Experiences</p>
            <h2 className="heading-lg text-neutral-900 mb-6">
              Signature Luxury Tours
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Discover our most sought-after experiences, carefully curated for the discerning traveler.
            </p>
          </div>
          
          {tours.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-neutral-600">No featured tours available at the moment.</p>
            </div>
          ) : (
            <div className="grid-luxury">
              {tours.map((tour, index) => (
                <div
                  key={tour.id}
                  className="card-luxury rounded-2xl overflow-hidden fade-in-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="image-hover-zoom relative h-64">
                    <Image
                      src={tour.image}
                      alt={tour.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {tour.duration}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="heading-sm text-neutral-900 mb-4">{tour.name}</h3>
                    <p className="text-neutral-600 mb-6 overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>{tour.description}</p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center text-red-600">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-2xl font-bold text-neutral-900">${tour.price}</span>
                    </div>
                    
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="btn-primary w-full text-center rounded-lg block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="label-text text-red-800 mb-4">Trusted Partners</p>
            <h2 className="heading-lg text-neutral-900 mb-6">
              World-Class Collaborations
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partnerLogos.map((partner, index) => (
              <div
                key={partner.name}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 fade-in-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-16 w-full">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-luxury-gradient text-white">
        <div className="container-luxury text-center">
          <h2 className="heading-lg mb-6 text-shadow-luxury">
            Ready to Begin Your Adventure?
          </h2>
          <p className="text-xl mb-12 text-red-100 max-w-2xl mx-auto">
            Let our travel experts craft the perfect East African experience tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="btn-outline rounded-lg">
              Start Planning
            </Link>
            <Link href="/tours" className="btn-primary bg-white text-red-800 hover:bg-red-50 rounded-lg">
              Browse Tours
            </Link>
          </div>
        </div>
      </section>

      <LuxuryFooter />
    </div>
  );
}