'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollAnimations } from '../../components/ScrollAnimations';
import toursData from '../../../../../data/tours.json';

const countries = [
  { name: 'All', code: '', flagUrl: 'https://flagcdn.com/w40/un.png' },
  { name: 'Rwanda', code: 'RW', flagUrl: 'https://flagcdn.com/w40/rw.png' },
  { name: 'Angola', code: 'AO', flagUrl: 'https://flagcdn.com/w40/ao.png' },
  { name: 'Zambia', code: 'ZM', flagUrl: 'https://flagcdn.com/w40/zm.png' },
  { name: 'Malawi', code: 'MW', flagUrl: 'https://flagcdn.com/w40/mw.png' },
  { name: 'Mauritius', code: 'MU', flagUrl: 'https://flagcdn.com/w40/mu.png' },
  { name: 'Ghana', code: 'GH', flagUrl: 'https://flagcdn.com/w40/gh.png' },
];

const durations = ['All', '1 day', '3 days', '6 days', '7 days'];

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $500', min: 0, max: 500 },
  { label: '$500 - $1500', min: 500, max: 1500 },
  { label: '$1500 - $3000', min: 1500, max: 3000 },
  { label: 'Over $3000', min: 3000, max: Infinity },
];

export default function ToursPage() {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 9;

  // Filter tours
  let filteredTours = toursData.filter(tour => {
    // More flexible country matching - default to show all if "All" is selected
    const countryMatch = selectedCountry === 'All' || 
      (selectedCountry !== 'All' && (
        tour.name.toLowerCase().includes(selectedCountry.toLowerCase()) ||
        tour.description.toLowerCase().includes(selectedCountry.toLowerCase()) ||
        tour.slug.toLowerCase().includes(selectedCountry.toLowerCase())
      ));
    
    const durationMatch = selectedDuration === 'All' || tour.duration === selectedDuration;
    const priceRange = priceRanges[selectedPriceRange];
    const priceMatch = tour.price >= priceRange.min && tour.price <= priceRange.max;
    
    return countryMatch && durationMatch && priceMatch;
  });

  // Sort tours
  filteredTours = [...filteredTours].sort((a, b) => {
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTours.length / toursPerPage);
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

  const handleFilterChange = (filterSetter: Function, value: any) => {
    filterSetter(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000"
            alt="African Safari Wildlife"
            fill
            className="object-cover"
            priority
          />
          <div className="hero-overlay" />
        </div>
        
        <div className="relative z-10 container-luxury text-center text-white">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center justify-center space-x-2 text-sm mb-8 animate-fade-in">
              <Link href="/" className="text-white hover:text-red-200 transition-colors">
                Home
              </Link>
              <span className="text-white">/</span>
              <span className="text-white">Tours</span>
            </nav>
            
            <p className="label-text text-white mb-6 animate-fade-in">
              Curated Experiences
            </p>
            <h1 className="heading-xl mb-8 text-shadow-luxury animate-fade-in-up delay-200">
              Discover Africa's
              <span className="block text-white">Hidden Treasures</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white max-w-3xl mx-auto animate-fade-in-up delay-400">
              Handcrafted luxury tours across East Africa's most spectacular destinations. From Victoria Falls to pristine beaches, cultural heritage to wildlife safaris.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section-padding bg-luxury-off-white">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
            <div>
              <h2 className="heading-md text-neutral-900 mb-2">
                {filteredTours.length} Luxury {filteredTours.length === 1 ? 'Experience' : 'Experiences'}
              </h2>
              <p className="text-neutral-600">Discover your perfect African adventure</p>
            </div>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="label-text text-neutral-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white min-w-[200px]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="space-y-8">
            {/* Country Filter */}
            <div>
              <h3 className="heading-sm text-neutral-900 mb-4">Destinations</h3>
              <div className="flex flex-wrap gap-4">
                {countries.map((country) => (
                  <button
                    key={country.name}
                    onClick={() => handleFilterChange(setSelectedCountry, country.name)}
                    className={`px-6 py-4 rounded-xl font-medium transition-all flex items-center gap-3 hover-lift ${
                      selectedCountry === country.name
                        ? 'bg-red-800 text-white shadow-luxury'
                        : 'bg-white text-neutral-700 hover:bg-red-50 hover:text-red-800 border border-neutral-200'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-white shadow-sm">
                      {country.name === 'All' ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-800" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                          </svg>
                        </div>
                      ) : (
                        <Image 
                          src={country.flagUrl} 
                          alt={`${country.name} flag`}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <span>{country.name}</span>
                    {country.code && (
                      <span className="text-xs font-bold tracking-wider opacity-75">{country.code}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <h3 className="heading-sm text-neutral-900 mb-4">Duration</h3>
              <div className="flex flex-wrap gap-4">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handleFilterChange(setSelectedDuration, duration)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all hover-lift ${
                      selectedDuration === duration
                        ? 'bg-red-800 text-white shadow-luxury'
                        : 'bg-white text-neutral-700 hover:bg-red-50 hover:text-red-800 border border-neutral-200'
                    }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="heading-sm text-neutral-900 mb-4">Price Range</h3>
              <div className="flex flex-wrap gap-4">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => handleFilterChange(setSelectedPriceRange, index)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all hover-lift ${
                      selectedPriceRange === index
                        ? 'bg-red-800 text-white shadow-luxury'
                        : 'bg-white text-neutral-700 hover:bg-red-50 hover:text-red-800 border border-neutral-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          {filteredTours.length > 0 ? (
            <>
              <div className="grid-luxury">
                {currentTours.map((tour, index) => (
                  <div
                    key={tour.id}
                    className="card-luxury rounded-2xl overflow-hidden fade-in-scroll"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link href={`/tours/${tour.slug}`} className="block">
                      <div className="image-hover-zoom relative h-64">
                        <Image
                          src={tour.image}
                          alt={tour.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        {tour.featured && (
                          <div className="absolute top-4 right-4 bg-red-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Featured
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 text-white">
                          <span className="text-sm font-medium bg-black/30 px-2 py-1 rounded">
                            {tour.duration}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <h3 className="heading-sm text-neutral-900 mb-4 hover:text-red-800 transition-colors">
                          {tour.name}
                        </h3>
                        <p className="text-neutral-600 mb-6 overflow-hidden" style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical'
                        }}>
                          {tour.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center text-red-600">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-neutral-500">From</p>
                            <p className="text-2xl font-bold text-neutral-900">${tour.price}</p>
                          </div>
                        </div>
                        
                        <div className="btn-primary w-full text-center rounded-lg block">
                          View Experience
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-3 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-12 h-12 rounded-lg font-medium transition-all ${
                          currentPage === page
                            ? 'bg-red-800 text-white shadow-luxury'
                            : 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-md text-neutral-900 mb-4">No experiences found</h3>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                Try adjusting your filters to discover more luxury travel experiences
              </p>
              <button
                onClick={() => {
                  setSelectedCountry('All');
                  setSelectedDuration('All');
                  setSelectedPriceRange(0);
                }}
                className="btn-primary rounded-lg"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-luxury-gradient text-white">
        <div className="container-luxury text-center">
          <h2 className="heading-lg mb-6 text-shadow-luxury">
            Can't Find Your Perfect Experience?
          </h2>
          <p className="text-xl mb-12 text-red-100 max-w-2xl mx-auto">
            Our travel experts will craft a bespoke itinerary tailored to your unique preferences and desires.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="tel:+250780100064" className="btn-outline rounded-lg">
              Call +250 780 100 064
            </a>
            <a href="mailto:booking@intaretravels.rw" className="btn-primary bg-white text-red-800 hover:bg-red-50 rounded-lg">
              Email Our Experts
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}