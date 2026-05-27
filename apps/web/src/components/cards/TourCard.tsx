import Image from 'next/image';
import Link from 'next/link';

export interface TourCardData {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency?: string;
  duration: string;
  image: string;
  highlights?: string[];
  featured?: boolean;
}

function GoldStars() {
  return (
    <div className="flex items-center text-gold-500" aria-label="5 star rated">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TourCard({ tour, sizes = '(max-width: 768px) 100vw, 33vw' }: { tour: TourCardData; sizes?: string }) {
  return (
    <article className="card-luxury rounded-2xl overflow-hidden h-full flex flex-col">
      <Link href={`/tours/${tour.slug}`} className="flex flex-col h-full group">
        <div className="image-hover-zoom relative h-60">
          <Image
            src={tour.image}
            alt={tour.name}
            fill
            className="object-cover"
            sizes={sizes}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          {tour.featured && (
            <span className="absolute top-4 left-4 bg-gold-500 text-charcoal px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
              Featured
            </span>
          )}
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-white text-sm font-medium bg-black/35 backdrop-blur-sm px-3 py-1 rounded-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {tour.duration}
          </span>
        </div>

        <div className="p-7 flex flex-col flex-1">
          <h3 className="heading-sm text-neutral-900 mb-3 group-hover:text-forest-800 transition-colors">
            {tour.name}
          </h3>
          <p className="text-neutral-600 text-sm mb-5 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {tour.description}
          </p>

          {tour.highlights && tour.highlights.length > 0 && (
            <ul className="space-y-2 mb-6">
              {tour.highlights.slice(0, 3).map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="line-clamp-1">{h}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex items-center justify-between pt-5 border-t border-neutral-100">
            <div>
              <GoldStars />
              <p className="text-xs text-neutral-500 mt-1">From</p>
              <p className="text-2xl font-bold text-forest-800 leading-none">
                ${tour.price.toLocaleString()}
              </p>
            </div>
            <span className="btn-primary rounded-lg text-xs">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
