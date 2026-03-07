import { ReactNode } from 'react';
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  backgroundImage?: string;
  height?: 'small' | 'medium' | 'large' | 'full';
  overlay?: boolean;
  className?: string;
}

export function Hero({ 
  title, 
  subtitle, 
  children, 
  backgroundImage = '/hero-bg.jpg',
  height = 'large',
  overlay = true,
  className = '' 
}: HeroProps) {
  const heights = {
    small: 'h-[50vh]',
    medium: 'h-[70vh]',
    large: 'h-[85vh]',
    full: 'h-screen',
  };

  return (
    <section className={`relative ${heights[height]} flex items-center ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 animate-fade-in-delay">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="animate-fade-in-delay-2">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
