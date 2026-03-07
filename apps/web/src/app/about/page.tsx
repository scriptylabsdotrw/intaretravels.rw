import { Metadata } from 'next';
import Image from 'next/image';
import { Section, Grid, Button, Breadcrumb } from '@tourism/ui';
import { generateSEO } from '@tourism/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'About Us - Your African Travel Experts',
  description: 'Learn about Intare Travels, your trusted partner for unforgettable African adventures. Expert-curated tours across Angola, Zambia, Malawi, Mauritius, and Ghana.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <div className="bg-neutral-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} theme="dark" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 mt-8">
            About Intare Travels
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl">
            Your gateway to unforgettable African experiences
          </p>
        </div>
      </div>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Crafting Memories Across Africa
            </h2>
            <p className="text-lg text-neutral-600 mb-4">
              At Intare Travels, we believe that travel is more than just visiting new places—it's about creating lasting memories, experiencing diverse cultures, and discovering the beauty that Africa has to offer.
            </p>
            <p className="text-lg text-neutral-600 mb-4">
              Founded with a passion for showcasing Africa's hidden gems, we specialize in curating exceptional travel experiences across Angola, Zambia, Malawi, Mauritius, and Ghana. Each itinerary is thoughtfully designed to balance adventure, relaxation, and cultural immersion.
            </p>
            <p className="text-lg text-neutral-600">
              Our team of travel experts brings years of local knowledge and international experience to ensure every journey exceeds expectations.
            </p>
          </div>
          <div className="relative h-96 md:h-full rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200"
              alt="African landscape"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section className="bg-neutral-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Intare Travels?</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            We're committed to making your African adventure seamless, memorable, and extraordinary
          </p>
        </div>
        <Grid cols={3}>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Expert Curation</h3>
            <p className="text-neutral-600">
              Every tour is carefully crafted by travel experts with deep local knowledge and years of experience
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Transparent Pricing</h3>
            <p className="text-neutral-600">
              All-inclusive packages with no hidden fees. What you see is what you pay
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
            <p className="text-neutral-600">
              Our dedicated team is always available to assist you before, during, and after your journey
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Local Partnerships</h3>
            <p className="text-neutral-600">
              Strong relationships with local guides, hotels, and service providers ensure authentic experiences
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Flexible Options</h3>
            <p className="text-neutral-600">
              Customize any itinerary to match your preferences, budget, and travel style
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Safety First</h3>
            <p className="text-neutral-600">
              Your safety and comfort are our top priorities on every journey
            </p>
          </div>
        </Grid>
      </Section>

      <Section className="bg-primary-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Let's create your perfect African journey together
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/tours" size="lg" variant="secondary">
              Explore Tours
            </Button>
            <Button href="tel:+250780100064" size="lg" variant="outline">
              Call +250 780 100 064
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
