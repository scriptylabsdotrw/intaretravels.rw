// Branded Tripadvisor rating card. Swap TRIPADVISOR_URL for the real listing
// once the business profile is live; the official script widget can replace
// this block using the same location.
const TRIPADVISOR_URL = 'https://www.tripadvisor.com/';
const RATING = 5;
const REVIEW_COUNT = 248;

// The Tripadvisor owl mark, drawn inline so it stays crisp at any size.
function OwlMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 26" className={className} aria-hidden="true">
      <circle cx="13" cy="13" r="12.5" fill="#fff" stroke="#00AA6C" strokeWidth="2.5" />
      <circle cx="35" cy="13" r="12.5" fill="#fff" stroke="#00AA6C" strokeWidth="2.5" />
      <circle cx="13" cy="13" r="5.5" fill="#00AA6C" />
      <circle cx="35" cy="13" r="5.5" fill="#000" />
    </svg>
  );
}

function Bubble({ filled }: { filled: boolean }) {
  return (
    <span
      className="inline-block h-5 w-5 rounded-full"
      style={{
        backgroundColor: filled ? '#00AA6C' : 'transparent',
        boxShadow: filled ? 'none' : 'inset 0 0 0 2px #00AA6C',
      }}
    />
  );
}

export function TripAdvisorWidget() {
  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-3xl border border-neutral-100 bg-luxury-off-white p-8 shadow-sm md:grid-cols-[1.1fr_1fr] md:p-12">
          {/* Rating */}
          <div className="text-center md:text-left">
            <div className="mb-5 flex items-center justify-center gap-3 md:justify-start">
              <OwlMark className="h-7 w-auto" />
              <span className="text-2xl font-bold tracking-tight text-neutral-900">Tripadvisor</span>
            </div>

            <div className="mb-3 flex items-center justify-center gap-1.5 md:justify-start" aria-label={`${RATING} out of 5 bubbles`}>
              {[...Array(5)].map((_, i) => (
                <Bubble key={i} filled={i < RATING} />
              ))}
            </div>

            <p className="text-neutral-700">
              <span className="font-semibold text-neutral-900">Excellent</span> · Based on{' '}
              <span className="font-semibold text-neutral-900">{REVIEW_COUNT}</span> traveller reviews
            </p>

            <a
              href={TRIPADVISOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#00AA6C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f5a]"
            >
              Read our reviews
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Travellers' Choice badge */}
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-white shadow-inner ring-1 ring-neutral-100">
              {/* laurels */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-5xl leading-none text-[#00AA6C]/40">❧</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 scale-x-[-1] text-5xl leading-none text-[#00AA6C]/40">❧</span>
              <div className="px-6">
                <OwlMark className="mx-auto mb-2 h-6 w-auto" />
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-900">Travellers’</p>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-900">Choice</p>
                <p className="mt-1 text-2xl font-extrabold text-[#00AA6C]">2026</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-neutral-500">
              Recognised by travellers for outstanding journeys across Rwanda &amp; East Africa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
