import Image from 'next/image';
import Link from 'next/link';

export interface FlightDealData {
  id: string;
  destination: string;
  from: string;
  price: number;
  discount?: string;
  airline: string;
  logo: string;
  validUntil?: string;
  image: string;
}

export function FlightDealCard({ promo, sizes = '(max-width: 768px) 100vw, 33vw' }: { promo: FlightDealData; sizes?: string }) {
  const validLabel = promo.validUntil
    ? new Date(promo.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <article className="card-luxury rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="image-hover-zoom relative aspect-[4/3]">
        <Image
          src={promo.image}
          alt={`Flights to ${promo.destination}`}
          fill
          className="object-cover"
          sizes={sizes}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        {promo.discount && (
          <span className="absolute top-4 right-4 bg-gold-500 text-charcoal px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
            {promo.discount}
          </span>
        )}
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-xs text-white/80">From {promo.from}</p>
          <h3 className="text-2xl font-serif font-semibold leading-tight">{promo.destination}</h3>
        </div>
      </div>

      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-neutral-600">via {promo.airline}</p>
          <div className="relative w-14 h-9 bg-white rounded border border-neutral-200">
            <Image src={promo.logo} alt={promo.airline} fill className="object-contain p-1" sizes="56px" />
          </div>
        </div>

        <div className="mb-5">
          <span className="text-xs text-neutral-500">Round trip from</span>
          <p className="text-3xl font-bold text-forest-800 leading-none mt-1">${promo.price.toLocaleString()}</p>
        </div>

        {validLabel && (
          <p className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Valid until {validLabel}
          </p>
        )}

        <Link
          href={`/book-flight?destination=${encodeURIComponent(promo.destination)}&price=${promo.price}&airline=${encodeURIComponent(promo.airline)}`}
          className="btn-primary w-full text-center rounded-lg mt-auto"
        >
          Book Now
        </Link>
      </div>
    </article>
  );
}
