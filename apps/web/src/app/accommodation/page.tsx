import { Metadata } from 'next';
import Image from 'next/image';
import { ScrollAnimations } from '../../components/ScrollAnimations';
import { ApartmentCard, type ApartmentCardData } from '../../components/cards/ApartmentCard';
import apartmentsData from '../../../../../data/apartments.json';

export const metadata: Metadata = {
  title: 'Luxury Apartments & Accommodation | Intare Travels',
  description: 'Discover our exclusive collection of luxury apartments across Africa. Premium stays with modern amenities in prime locations.',
  keywords: ['luxury apartments', 'accommodation', 'hotels', 'vacation rentals', 'Africa accommodation'],
};

export default function AccommodationPage() {
  return (
    <div className="min-h-screen">
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2000"
            alt="Luxury Safari Lodge"
            fill
            className="object-cover"
            priority
          />
          <div className="hero-overlay" />
        </div>

        <div className="relative z-10 container-luxury text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
              <span className="h-px w-10 bg-gold-400/70" />
              <p className="label-text text-gold-300">Premium Properties</p>
              <span className="h-px w-10 bg-gold-400/70" />
            </div>
            <h1 className="heading-xl mb-8 text-shadow-luxury animate-fade-in-up delay-200">
              Luxury
              <span className="block text-gold-300">Accommodation</span>
            </h1>
            <p className="text-lg md:text-2xl mb-12 text-white/85 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400">
              Our exclusive properties offer the perfect blend of comfort, style, and location for your African adventure.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up delay-600">
              <div className="flex items-center gap-2 glass-morphism px-4 py-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium">Prime Locations</span>
              </div>
              <div className="flex items-center gap-2 glass-morphism px-4 py-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-sm font-medium">Modern Amenities</span>
              </div>
              <div className="flex items-center gap-2 glass-morphism px-4 py-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium">Verified Properties</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation Grid Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="label-text text-red-800 mb-4">Curated Collection</p>
            <h2 className="heading-lg text-neutral-900 mb-6">
              Premium Properties
            </h2>
            <p className="text-xl text-neutral-600">Handpicked accommodations for discerning travelers</p>
          </div>

          <div className="grid-luxury">
            {apartmentsData.map((apartment, index) => (
              <div key={apartment.id} className="fade-in-scroll" style={{ animationDelay: `${index * 0.08}s` }}>
                <ApartmentCard apartment={apartment as ApartmentCardData} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-luxury-off-white">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="label-text text-red-800 mb-4">Why Choose Us</p>
            <h2 className="heading-lg text-neutral-900 mb-6">
              Why Choose Our Properties?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Every property is carefully selected and maintained to ensure your comfort and satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 fade-in-scroll">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-800">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="heading-sm text-neutral-900 mb-4">Prime Locations</h3>
              <p className="text-neutral-600">
                Close to attractions and amenities for maximum convenience
              </p>
            </div>

            <div className="text-center p-6 fade-in-scroll delay-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-800">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="heading-sm text-neutral-900 mb-4">Modern Amenities</h3>
              <p className="text-neutral-600">
                WiFi, kitchen, and all essentials for a comfortable stay
              </p>
            </div>

            <div className="text-center p-6 fade-in-scroll delay-200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-800">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="heading-sm text-neutral-900 mb-4">Verified & Safe</h3>
              <p className="text-neutral-600">
                All properties are thoroughly inspected and verified
              </p>
            </div>

            <div className="text-center p-6 fade-in-scroll delay-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-800">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="heading-sm text-neutral-900 mb-4">24/7 Support</h3>
              <p className="text-neutral-600">
                We're here whenever you need assistance or support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-luxury-gradient text-white">
        <div className="container-luxury text-center">
          <h2 className="heading-lg mb-6 text-shadow-luxury">
            Need Help Finding the Perfect Stay?
          </h2>
          <p className="text-xl mb-12 text-red-100 max-w-3xl mx-auto">
            Our accommodation specialists can help you find the perfect property that matches your needs, preferences, and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="tel:+250780100064" className="btn-outline rounded-lg">
              Call +250 780 100 064
            </a>
            <a href="mailto:booking@intaretravels.rw" className="btn-primary bg-white text-red-800 hover:bg-red-50 rounded-lg">
              Email Our Experts
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
