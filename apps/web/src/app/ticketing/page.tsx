'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Section, Grid, Card, Button, Badge, Breadcrumb, BookingModal } from '@tourism/ui';

const promotions = [
  { id: 1, destination: 'Nairobi', price: 199, discount: '25% OFF', airline: 'RwandAir', logo: '/RwandAir.jpg', validUntil: '2026-05-31', image: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?q=80&w=800' },
  { id: 2, destination: 'Dubai', price: 599, discount: '30% OFF', airline: 'Qatar Airways', logo: '/aerolineas-images_0009_QatarAirways.png', validUntil: '2026-06-30', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800' },
  { id: 3, destination: 'Johannesburg', price: 299, discount: '20% OFF', airline: 'Kenya Airways', logo: '/Kenya_Airways-Logo.wine.png', validUntil: '2026-06-15', image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=800' },
  { id: 4, destination: 'Lagos', price: 349, discount: '25% OFF', airline: 'Ethiopian Airlines', logo: '/ethiopian-airlines-logo-png_seeklogo-49734.png', validUntil: '2026-07-01', image: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?q=80&w=800' },
  { id: 5, destination: 'Addis Ababa', price: 279, discount: '30% OFF', airline: 'Ethiopian Airlines', logo: '/ethiopian-airlines-logo-png_seeklogo-49734.png', validUntil: '2026-06-20', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800' },
  { id: 6, destination: 'Dar es Salaam', price: 189, discount: '20% OFF', airline: 'RwandAir', logo: '/RwandAir.jpg', validUntil: '2026-05-25', image: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?q=80&w=800' },
];

const partners = [
  { name: 'RwandAir', description: "Rwanda's national carrier", logo: '/RwandAir.jpg' },
  { name: 'Qatar Airways', description: 'Luxury Middle East flights', logo: '/aerolineas-images_0009_QatarAirways.png' },
  { name: 'Kenya Airways', description: 'East African connections', logo: '/Kenya_Airways-Logo.wine.png' },
  { name: 'Ethiopian Airlines', description: 'Pan-African network', logo: '/ethiopian-airlines-logo-png_seeklogo-49734.png' },
];

const faqs = [
  { question: 'How do I book a flight?', answer: 'Click "Book Now" on any flight deal to open the booking form. Fill in your details and our team will contact you within 24 hours to confirm your booking.' },
  { question: 'Are these prices guaranteed?', answer: 'Promotional prices are valid until the specified date and subject to availability. We recommend booking early to secure the best rates.' },
  { question: 'Can I book directly online?', answer: 'Yes! Use our booking form to submit your request. Our team will process it and send you payment details and confirmation.' },
  { question: 'What payment methods do you accept?', answer: 'We accept bank transfers, mobile money, and major credit cards. Payment details will be provided when you contact us.' },
];

export default function TicketingPage() {
  const [selectedFlight, setSelectedFlight] = useState<typeof promotions[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = (promo: typeof promotions[0]) => {
    setSelectedFlight(promo);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative bg-neutral-900 text-white py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000"
            alt="Airplane in flight"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/50 to-neutral-900/80" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Flight Deals' }]} theme="dark" />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Exclusive Flight Deals
            </h1>
            <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed">
              Partner with top airlines for unbeatable prices across Africa and beyond
            </p>
          </div>
        </div>
      </div>

      <Section title="Current Flight Promotions" subtitle="Limited-time offers on popular destinations">
        <Grid cols={3}>
          {promotions.map((promo) => (
            <Card key={promo.id} className="overflow-hidden">
              <div className="aspect-[4/3] relative bg-neutral-200 overflow-hidden">
                <Image
                  src={promo.image}
                  alt={promo.destination}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="primary">{promo.discount}</Badge>
                </div>
              </div>
              <div className="p-6">
                {/* Airline Logo */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{promo.destination}</h3>
                  <div className="relative w-16 h-10 bg-white rounded border border-neutral-200 p-1">
                    <Image
                      src={promo.logo}
                      alt={promo.airline}
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                    />
                  </div>
                </div>
                
                <p className="text-neutral-600 text-sm mb-4">via {promo.airline}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-700">${promo.price}</span>
                  <span className="text-neutral-600 ml-2">round trip</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Valid until {new Date(promo.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleBookNow(promo)}
                >
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section title="Our Airline Partners" subtitle="Trusted carriers for your journey" className="bg-neutral-50">
        <div className="space-y-8 overflow-hidden">
          {/* First Row - Sliding Left to Right */}
          <div className="relative">
            <div className="flex gap-8 animate-scroll-right">
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div 
                  key={`row1-${index}`}
                  className="flex-shrink-0 w-48 h-32 bg-white rounded-xl border border-neutral-200 p-6 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Sliding Right to Left */}
          <div className="relative">
            <div className="flex gap-8 animate-scroll-left">
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div 
                  key={`row2-${index}`}
                  className="flex-shrink-0 w-48 h-32 bg-white rounded-xl border border-neutral-200 p-6 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Details Below */}
        <div className="mt-16">
          <Grid cols={4}>
            {partners.map((partner) => (
              <div key={partner.name} className="text-center">
                <h3 className="font-bold mb-2 text-lg">{partner.name}</h3>
                <p className="text-neutral-600 text-sm">{partner.description}</p>
              </div>
            ))}
          </Grid>
        </div>
      </Section>

      <Section title="Frequently Asked Questions">
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-neutral-200 pb-6">
              <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
              <p className="text-neutral-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-primary-700 text-white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help Booking?</h2>
          <p className="text-xl mb-8 text-primary-100">Our team is here to assist you</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="secondary" size="lg" href="tel:+250780100064">Call +250 780 100 064</Button>
            <Button variant="outline" size="lg" href="mailto:booking@intaretravels.rw">Email Us</Button>
          </div>
        </div>
      </Section>

      {/* Booking Modal */}
      {selectedFlight && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          destination={selectedFlight.destination}
          price={selectedFlight.price}
          airline={selectedFlight.airline}
        />
      )}
    </>
  );
}
