import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/intareTravelslogo.png" 
              alt="Intare Travels" 
              width={220} 
              height={80}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/tours" className="text-neutral-700 hover:text-primary-700 font-medium transition-colors">
              Tours
            </Link>
            <Link href="/accommodation" className="text-neutral-700 hover:text-primary-700 font-medium transition-colors">
              Accommodation
            </Link>
            <Link href="/ticketing" className="text-neutral-700 hover:text-primary-700 font-medium transition-colors">
              Book Flights
            </Link>
            <Link href="/about" className="text-neutral-700 hover:text-primary-700 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="bg-primary-700 text-white px-6 py-2 rounded-lg hover:bg-primary-800 transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
