import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  image: string;
  href: string;
}

export function FeatureCard({ title, image, href }: FeatureCardProps) {
  return (
    <a 
      href={href}
      className="group relative h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-bold text-lg">{title}</h3>
      </div>
    </a>
  );
}
