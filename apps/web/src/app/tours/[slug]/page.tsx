import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { generateSEO } from '@tourism/lib/seo';
import { StructuredData, generateTourSchema, generateBreadcrumbSchema } from '@tourism/lib/structured-data';
import toursData from '../../../../../../data/tours.json';
import { TourItinerary } from './TourItinerary';
import { TourBooking } from './TourBooking';
import { Reveal, RevealGroup, RevealItem } from '../../../components/motion/Reveal';

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

      {/* Hero */}
      <section className="relative h-[72vh] min-h-[520px] bg-charcoal-900">
        <Image src={tour.image} alt={tour.name} fill className="object-cover" priority sizes="100vw" />
        <div className="section-overlay-dark" />
        <div className="absolute bottom-0 left-0 right-0 pb-14">
          <div className="container-luxury">
            <Reveal y={20}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-4 py-1.5 rounded-full bg-gold-500 text-charcoal text-xs font-semibold tracking-widest uppercase">{tour.duration}</span>
                <span className="px-4 py-1.5 rounded-full border border-white/30 text-white text-xs font-semibold tracking-widest uppercase">{tour.highlights.length} Highlights</span>
                {tour.featured && (
                  <span className="px-4 py-1.5 rounded-full bg-forest-700 text-white text-xs font-semibold tracking-widest uppercase">Featured</span>
                )}
              </div>
              <h1 className="heading-xl text-white text-shadow-luxury max-w-4xl">{tour.name}</h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-14">
              {/* Overview */}
              <Reveal>
                <p className="label-text text-emerald-600 mb-4">Overview</p>
                <h2 className="heading-md text-neutral-900 mb-4">About This Journey</h2>
                <div className="gold-divider mb-6" />
                <p className="text-lg text-neutral-700 leading-relaxed">{tour.description}</p>
              </Reveal>

              {/* Highlights */}
              <div>
                <Reveal>
                  <h2 className="heading-md text-neutral-900 mb-6">Tour Highlights</h2>
                </Reveal>
                <RevealGroup className="grid md:grid-cols-2 gap-4" stagger={0.07}>
                  {tour.highlights.map((highlight, index) => (
                    <RevealItem key={index} className="flex items-start gap-3 rounded-xl bg-luxury-off-white border border-neutral-100 p-4">
                      <svg className="w-6 h-6 text-gold-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-neutral-700">{highlight}</span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>

              {/* Itinerary */}
              {tour.itinerary && (
                <Reveal>
                  <TourItinerary itinerary={tour.itinerary} />
                </Reveal>
              )}

              {/* What's Included */}
              <div>
                <Reveal>
                  <h2 className="heading-md text-neutral-900 mb-6">What&apos;s Included</h2>
                </Reveal>
                <RevealGroup className="grid md:grid-cols-2 gap-4" stagger={0.07}>
                  {tour.included.map((item, index) => (
                    <RevealItem key={index} className="flex items-center gap-3 bg-forest-50 ring-1 ring-forest-100 p-4 rounded-xl">
                      <svg className="w-5 h-5 text-forest-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-neutral-700">{item}</span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </div>

            {/* Booking sidebar */}
            <div className="lg:col-span-1">
              <TourBooking
                tourName={tour.name}
                price={tour.price}
                duration={tour.duration}
                image={tour.image}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-28 text-white overflow-hidden bg-charcoal-900">
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
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-10 bg-gold-400/70" />
              <p className="label-text text-gold-300">Your Journey Awaits</p>
              <span className="h-px w-10 bg-gold-400/70" />
            </div>
            <h2 className="heading-lg mb-6 text-shadow-luxury">Ready to Book This Adventure?</h2>
            <p className="text-lg md:text-xl mb-10 text-white/85">Contact us today to reserve your spot or tailor this journey to you.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="tel:+250780100064" className="btn-gold rounded-lg">Call +250 780 100 064</Link>
              <Link href="/contact" className="btn-outline rounded-lg">Contact Us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export const revalidate = 3600;
