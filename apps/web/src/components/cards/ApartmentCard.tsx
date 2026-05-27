import Image from 'next/image';
import Link from 'next/link';

export interface ApartmentCardData {
  id: string;
  slug: string;
  name: string;
  description: string;
  pricePerNight: number;
  currency?: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests?: number;
  address: string;
  image: string;
  amenities: string[];
  featured?: boolean;
}

export function ApartmentCard({ apartment, sizes = '(max-width: 768px) 100vw, 33vw' }: { apartment: ApartmentCardData; sizes?: string }) {
  return (
    <article className="card-luxury rounded-2xl overflow-hidden h-full flex flex-col">
      <Link href={`/accommodation/${apartment.slug}`} className="flex flex-col h-full group">
        <div className="image-hover-zoom relative aspect-[4/3]">
          <Image
            src={apartment.image}
            alt={apartment.name}
            fill
            className="object-cover"
            sizes={sizes}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {apartment.featured && (
            <span className="absolute top-4 left-4 bg-gold-500 text-charcoal px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
              Featured
            </span>
          )}
        </div>

        <div className="p-7 flex flex-col flex-1">
          <div className="flex items-center gap-3 text-xs text-neutral-600 mb-3">
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {apartment.bedrooms} Bed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 11V5a2 2 0 012-2h2m-2 8h14m-14 0v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
              </svg>
              {apartment.bathrooms} Bath
            </span>
            {apartment.maxGuests ? (
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {apartment.maxGuests} Guests
              </span>
            ) : null}
          </div>

          <h3 className="heading-sm text-neutral-900 mb-1 group-hover:text-forest-800 transition-colors">
            {apartment.name}
          </h3>
          <p className="flex items-center gap-1.5 text-sm text-neutral-500 mb-4">
            <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {apartment.address}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {apartment.amenities.slice(0, 3).map((amenity, i) => (
              <span key={i} className="text-xs bg-sand-100 text-forest-800 px-2.5 py-1 rounded-full">
                {amenity}
              </span>
            ))}
            {apartment.amenities.length > 3 && (
              <span className="text-xs text-neutral-500 self-center">+{apartment.amenities.length - 3} more</span>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between pt-5 border-t border-neutral-100">
            <div>
              <span className="text-xs text-neutral-500">From</span>
              <p className="text-2xl font-bold text-forest-800 leading-none">
                ${apartment.pricePerNight.toLocaleString()}
                <span className="text-sm text-neutral-500 font-normal"> / night</span>
              </p>
            </div>
            <span className="btn-primary rounded-lg text-xs">
              View Stay
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
