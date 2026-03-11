'use client';

import { useState } from 'react';
import { Button, TourBookingModal } from '@tourism/ui';

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
      <div className="sticky top-24 bg-white border-2 border-neutral-200 rounded-2xl p-6 shadow-lg">
        <div className="mb-6">
          <p className="text-sm text-neutral-600 mb-2">Price per person</p>
          <div className="flex items-baseline">
            <span className="text-5xl font-bold text-primary-700">${price}</span>
            <span className="text-neutral-600 ml-2">USD</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between py-3 border-b border-neutral-200">
            <span className="text-neutral-600">Duration</span>
            <span className="font-medium">{duration}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-neutral-200">
            <span className="text-neutral-600">Group Size</span>
            <span className="font-medium">2-12 people</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-neutral-600">Availability</span>
            <span className="font-medium text-green-600">Available</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => setIsModalOpen(true)} 
            size="lg" 
            className="w-full"
          >
            Book Now
          </Button>
          <Button href="tel:+250780100064" variant="outline" size="lg" className="w-full">
            Call +250 780 100 064
          </Button>
        </div>

        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-900 font-medium mb-2">
            Need a custom itinerary?
          </p>
          <p className="text-sm text-primary-800">
            We can tailor this tour to your preferences. Contact us for a personalized quote.
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
