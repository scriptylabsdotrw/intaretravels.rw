import Image from 'next/image';

type Partner = { name: string; src: string };

// Partner logos live in /public. Add a file there and list it here to include it.
const logos: Partner[] = [
  { name: 'RwandAir', src: '/RwandAir.jpg' },
  { name: 'Qatar Airways', src: '/aerolineas-images_0009_QatarAirways.png' },
  { name: 'Kenya Airways', src: '/Kenya_Airways-Logo.wine.png' },
  { name: 'Ethiopian Airlines', src: '/ethiopian-airlines-logo-png_seeklogo-49734.png' },
];

// Repeat the small logo set so a single lane is wider than the viewport, then
// each lane is rendered twice in the track — the -50% marquee animation shifts
// by exactly one base sequence for a seamless, gap-free loop.
const rowOneBase = [...logos, ...logos, ...logos];
const rowTwoBase = [...logos, ...logos, ...logos].reverse();

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="mx-3 flex h-28 w-52 flex-shrink-0 items-center justify-center rounded-2xl border border-neutral-100 bg-white px-7 shadow-sm md:mx-4 md:h-32 md:w-64">
      <div className="relative h-16 w-full md:h-20">
        <Image
          src={partner.src}
          alt={partner.name}
          fill
          className="object-contain opacity-100 grayscale-0 transition-all duration-300 hover:opacity-70 hover:grayscale"
          sizes="260px"
        />
      </div>
    </div>
  );
}

export function PartnersMarquee() {
  return (
    <section className="overflow-hidden border-y border-neutral-100 bg-luxury-off-white py-16">
      <div className="container-luxury mb-10 text-center">
        <p className="label-text mb-4 text-emerald-600">Trusted Worldwide</p>
        <h2 className="heading-md text-neutral-900">Our Airline Partners</h2>
        <div className="gold-divider mx-auto mt-4" />
      </div>

      {/* Row 1 — drifts left */}
      <div className="marquee">
        <div className="marquee-track animate-marquee-left">
          {[...rowOneBase, ...rowOneBase].map((partner, i) => (
            <PartnerCard key={`r1-${partner.name}-${i}`} partner={partner} />
          ))}
        </div>
      </div>

      {/* Row 2 — drifts right */}
      <div className="marquee mt-5">
        <div className="marquee-track animate-marquee-right">
          {[...rowTwoBase, ...rowTwoBase].map((partner, i) => (
            <PartnerCard key={`r2-${partner.name}-${i}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
