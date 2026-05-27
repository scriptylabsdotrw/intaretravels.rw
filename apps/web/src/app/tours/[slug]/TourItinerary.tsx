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
      <h2 className="heading-md text-neutral-900 mb-6">Day-by-Day Itinerary</h2>
      <div className="space-y-4">
        {itinerary.map((day, index) => (
          <details
            key={day.day}
            open={index === 0}
            className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden transition-colors open:border-gold-200 open:shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 p-5 marker:content-none">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-forest-50 ring-1 ring-gold-200 text-forest-800 font-semibold">
                {day.day}
              </span>
              <span className="flex-1 font-semibold text-neutral-900">
                <span className="text-xs uppercase tracking-widest text-gold-600 block">Day {day.day}</span>
                {day.title}
              </span>
              <svg className="h-5 w-5 flex-shrink-0 text-forest-800 transition-transform duration-300 group-open:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </summary>
            <ul className="space-y-3 px-5 pb-6 pl-20">
              {day.activities.map((activity, actIndex) => (
                <li key={actIndex} className="flex items-start text-neutral-700">
                  <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500" />
                  <span className="leading-relaxed">{activity}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
