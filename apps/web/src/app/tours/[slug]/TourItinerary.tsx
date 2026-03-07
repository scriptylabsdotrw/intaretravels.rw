'use client';

import { Accordion, AccordionItem } from '@tourism/ui';

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

interface TourItineraryProps {
  itinerary: ItineraryDay[];
}

export function TourItinerary({ itinerary }: TourItineraryProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Day-by-Day Itinerary</h2>
      <Accordion>
        {itinerary.map((day, index) => (
          <AccordionItem
            key={day.day}
            title={`Day ${day.day}: ${day.title}`}
            defaultOpen={index === 0}
          >
            <ul className="space-y-3">
              {day.activities.map((activity, actIndex) => (
                <li key={actIndex} className="text-neutral-700 flex items-start">
                  <span className="text-primary-700 mr-3 mt-1 text-lg">•</span>
                  <span className="leading-relaxed">{activity}</span>
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
