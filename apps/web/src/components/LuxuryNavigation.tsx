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

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tours', href: '/tours' },
    { name: 'Accommodation', href: '/accommodation' },
    { name: 'Ticketing', href: '/ticketing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className={`nav-fixed ${isScrolled ? 'nav-solid' : 'nav-transparent'}`}>
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
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
                  className={`nav-link transition-colors duration-300 ${
                    isScrolled ? 'text-neutral-800 hover:text-red-800' : 'text-white hover:text-red-200'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/book-flight"
                className={`btn-primary rounded-lg transition-all duration-300 ${
                  isScrolled ? '' : 'bg-white text-red-800 hover:bg-red-50'
                }`}
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-neutral-800 hover:text-red-800' : 'text-white hover:text-red-200'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : 'closed'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link text-white text-xl animate-slide-down"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/book-flight"
            className="btn-outline rounded-lg mt-8 animate-slide-down"
            style={{ animationDelay: '0.6s' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}