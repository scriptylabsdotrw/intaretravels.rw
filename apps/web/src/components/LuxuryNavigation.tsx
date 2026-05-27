'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function LuxuryNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Accommodation', href: '/accommodation' },
    { name: 'Flights', href: '/ticketing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className={`nav-fixed ${isScrolled ? 'nav-solid' : 'nav-transparent'}`}>
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center" aria-label="Intare Travels home">
              <div className="relative w-32 h-12">
                <Image
                  src="/intareTravelslogo.png"
                  alt="Intare Travels"
                  fill
                  className={`object-contain transition-all duration-300 ${
                    isScrolled ? 'brightness-100' : 'brightness-0 invert'
                  }`}
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${
                    isScrolled ? 'text-neutral-800 hover:text-forest-800' : 'text-white/90 hover:text-gold-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <Link href="/contact" className="btn-gold rounded-lg">
                Plan a Trip
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-neutral-800 hover:text-forest-800' : 'text-white hover:text-gold-300'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : 'closed'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-7 px-6">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white text-2xl font-serif hover:text-gold-300 transition-colors animate-slide-down"
              style={{ animationDelay: `${index * 0.07}s` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-gold rounded-lg mt-6 animate-slide-down"
            style={{ animationDelay: '0.5s' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Plan a Trip
          </Link>
        </div>
      </div>
    </>
  );
}
