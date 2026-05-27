'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollAnimations } from '../../components/ScrollAnimations';
import { TourCard, type TourCardData } from '../../components/cards/TourCard';
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
  { label: '$500 – $1,500', min: 500, max: 1500 },
  { label: '$1,500 – $3,000', min: 1500, max: 3000 },
  { label: 'Over $3,000', min: 3000, max: Infinity },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ToursPage() {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 9;

  // Filter tours
  let filteredTours = toursData.filter(tour => {
    const countryMatch = selectedCountry === 'All' ||
      tour.name.toLowerCase().includes(selectedCountry.toLowerCase()) ||
      tour.description.toLowerCase().includes(selectedCountry.toLowerCase()) ||
      tour.slug.toLowerCase().includes(selectedCountry.toLowerCase());

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

  const isFiltered = selectedCountry !== 'All' || selectedDuration !== 'All' || selectedPriceRange !== 0;
  const resetFilters = () => {
    setSelectedCountry('All');
    setSelectedDuration('All');
    setSelectedPriceRange(0);
    setCurrentPage(1);
  };

  const chip = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-forest-800 text-white shadow-sm'
        : 'bg-white text-neutral-700 border border-neutral-200 hover:border-gold-300 hover:text-forest-800'
    }`;

  return (
    <div className="min-h-screen">
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/35283497/pexels-photo-35283497.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt="Giraffe on the African savannah at golden hour"
            fill
            className="object-cover"
            priority
          />
          <div className="hero-overlay" />
        </div>

        <div className="relative z-10 container-luxury text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
              <span className="h-px w-10 bg-gold-400/70" />
              <p className="label-text text-gold-300">Curated Experiences</p>
              <span className="h-px w-10 bg-gold-400/70" />
            </div>
            <h1 className="heading-xl mb-8 text-shadow-luxury animate-fade-in-up delay-200">
              Discover Africa&apos;s
              <span className="block text-gold-300">Hidden Treasures</span>
            </h1>
            <p className="text-lg md:text-2xl mb-12 text-white/85 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400">
              Handcrafted luxury tours across East Africa&apos;s most spectacular destinations — from Victoria Falls to pristine beaches, cultural heritage to wildlife safaris.
            </p>
          </div>
        </div>
      </section>

      {/* Filters + Results */}
      <section className="py-16 md:py-20 bg-luxury-off-white">
        <div className="container-luxury">
          {/* Count + Sort bar */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
            <div>
              <h2 className="heading-md text-neutral-900">
                {filteredTours.length} Luxury {filteredTours.length === 1 ? 'Experience' : 'Experiences'}
              </h2>
              <p className="text-neutral-600 mt-1">Discover your perfect African adventure</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="label-text text-neutral-500">Sort</span>
              <select
                aria-label="Sort tours"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400 bg-white text-sm min-w-[190px]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          {/* Refined filter panel */}
          <div className="rounded-2xl border border-neutral-100 bg-white shadow-sm p-6 md:p-8 space-y-7">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-neutral-900">Refine Your Search</h3>
              {isFiltered && (
                <button type="button" onClick={resetFilters} className="text-sm font-medium text-forest-800 hover:text-gold-600 transition-colors inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear filters
                </button>
              )}
            </div>

            {/* Destinations */}
            <div>
              <p className="label-text text-gold-600 mb-3">Destination</p>
              <div className="flex flex-wrap gap-2.5">
                {countries.map((country) => (
                  <button
                    key={country.name}
                    type="button"
                    onClick={() => handleFilterChange(setSelectedCountry, country.name)}
                    className={`flex items-center gap-2 ${chip(selectedCountry === country.name)}`}
                  >
                    {country.name !== 'All' && (
                      <span className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-black/5">
                        <Image src={country.flagUrl} alt="" width={20} height={20} className="w-full h-full object-cover" />
                      </span>
                    )}
                    {country.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-7">
              {/* Duration */}
              <div>
                <p className="label-text text-gold-600 mb-3">Duration</p>
                <div className="flex flex-wrap gap-2.5">
                  {durations.map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={() => handleFilterChange(setSelectedDuration, duration)}
                      className={chip(selectedDuration === duration)}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="label-text text-gold-600 mb-3">Price Range</p>
                <div className="flex flex-wrap gap-2.5">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleFilterChange(setSelectedPriceRange, index)}
                      className={chip(selectedPriceRange === index)}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="pb-20 md:pb-28">
        <div className="container-luxury">
          {filteredTours.length > 0 ? (
            <>
              <motion.div layout className="grid-luxury">
                <AnimatePresence mode="popLayout">
                  {currentTours.map((tour) => (
                    <motion.div
                      key={tour.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <TourCard tour={tour as TourCardData} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-5 py-2.5 rounded-lg border border-neutral-200 text-neutral-700 hover:border-gold-300 hover:text-forest-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                  >
                    Previous
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`w-11 h-11 rounded-lg font-medium transition-all text-sm ${
                          currentPage === page
                            ? 'bg-forest-800 text-white shadow-sm'
                            : 'border border-neutral-200 text-neutral-700 hover:border-gold-300 hover:text-forest-800'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-5 py-2.5 rounded-lg border border-neutral-200 text-neutral-700 hover:border-gold-300 hover:text-forest-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <div className="w-20 h-20 rounded-full bg-forest-50 ring-1 ring-gold-200 flex items-center justify-center mx-auto mb-6 text-forest-800">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-md text-neutral-900 mb-4">No experiences found</h3>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                Try adjusting your filters to discover more luxury travel experiences.
              </p>
              <button type="button" onClick={resetFilters} className="btn-secondary rounded-lg">
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-28 text-white overflow-hidden bg-charcoal-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000"
            alt="Lush green Rwandan landscape"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="section-overlay-dark" />
        </div>
        <div className="relative z-10 container-luxury text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-10 bg-gold-400/70" />
            <p className="label-text text-gold-300">Bespoke Travel</p>
            <span className="h-px w-10 bg-gold-400/70" />
          </div>
          <h2 className="heading-lg mb-6 text-shadow-luxury">Can&apos;t Find Your Perfect Experience?</h2>
          <p className="text-lg md:text-xl mb-10 text-white/85 max-w-2xl mx-auto leading-relaxed">
            Our travel experts will craft a bespoke itinerary tailored to your unique preferences and desires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="tel:+250780100064" className="btn-outline rounded-lg">Call +250 780 100 064</Link>
            <Link href="mailto:booking@intaretravels.rw" className="btn-gold rounded-lg">Email Our Experts</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
