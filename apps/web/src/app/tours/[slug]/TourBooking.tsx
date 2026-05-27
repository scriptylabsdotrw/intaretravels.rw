'use client';

import { useState } from 'react';
import { TourBookingModal } from '../../../../../../packages/ui/components/TourBookingModal';

interface TourBookingProps {
  tourName: string;
  price: number;
  duration: string;
  image: string;
}

export function TourBooking({ tourName, price, duration, image }: TourBookingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="sticky top-28 rounded-2xl border border-neutral-200 bg-white p-7 shadow-luxury">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Price per person</p>
          <div className="flex items-baseline">
            <span className="font-title text-5xl font-extrabold text-forest-800">${price}</span>
            <span className="ml-2 text-neutral-500">{`USD`}</span>
          </div>
        </div>

        <div className="mb-6 space-y-1">
          <div className="flex justify-between border-b border-neutral-100 py-3">
            <span className="text-neutral-500">Duration</span>
            <span className="font-medium text-neutral-900">{duration}</span>
          </div>
          <div className="flex justify-between border-b border-neutral-100 py-3">
            <span className="text-neutral-500">Group Size</span>
            <span className="font-medium text-neutral-900">2–12 people</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-neutral-500">Availability</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-forest-700">
              <span className="h-2 w-2 rounded-full bg-forest-500" /> Available
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-gold rounded-lg w-full"
          >
            Book Now
          </button>
          <a href="tel:+250780100064" className="btn-secondary rounded-lg w-full">
            Call +250 780 100 064
          </a>
        </div>

        <div className="mt-6 rounded-xl bg-luxury-off-white ring-1 ring-gold-100 p-4">
          <p className="mb-1 text-sm font-semibold text-neutral-900">Need a custom itinerary?</p>
          <p className="text-sm text-neutral-600">
            We can tailor this tour to your preferences. Contact us for a personalised quote.
          </p>
        </div>
      </div>

      <TourBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tourName={tourName}
        price={price}
        duration={duration}
        image={image}
      />
    </>
  );
}
