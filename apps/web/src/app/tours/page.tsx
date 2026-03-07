'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Section, Grid, Card, Button, Breadcrumb } from '@tourism/ui';
import toursData from '../../../../../data/tours.json';

const countries = [
  { name: 'All', flag: '🌍', code: '' },
  { name: 'Angola', flag: '🇦🇴', code: 'AO' },
  { name: 'Zambia', flag: '🇿🇲', code: 'ZM' },
  { name: 'Malawi', flag: '🇲🇼', code: 'MW' },
  { name: 'Mauritius', flag: '🇲🇺', code: 'MU' },
  { name: 'Ghana', flag: '🇬🇭', code: 'GH' },
];
const durations = ['All', '3 days', '7 days'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $1000', min: 0, max: 1000 },
  { label: '$1000 - $2000', min: 1000, max: 2000 },
  { label: 'Over $2000', min: 2000, max: Infinity },
];

export default function ToursPage() {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('featured');

  // Filter tours
  let filteredTours = toursData.filter(tour => {
    const countryMatch = selectedCountry === 'All' || tour.name.includes(selectedCountry);
    const durationMatch = selectedDuration === 'All' || tour.duration === selectedDuration;
    const priceRange = priceRanges[selectedPriceRange];
    const priceMatch = tour.price >= priceRange.min && tour.price <= priceRange.max;
    
    return countryMatch && durationMatch && priceMatch;
  });

  // Get selected country flag for display
  const selectedCountryData = countries.find(c => c.name === selectedCountry);

  // Sort tours
  filteredTours = [...filteredTours].sort((a, b) => {
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
    return 0;
  });

  return (
    <>
      <div className="bg-neutral-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tours' }]} theme="dark" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 mt-8">
            Discover Africa
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl">
            Handcrafted tours across five incredible destinations. From Victoria Falls to pristine beaches, cultural heritage to wildlife safaris.
          </p>
        </div>
      </div>

      <Section>
        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {filteredTours.length} {filteredTours.length === 1 ? 'Tour' : 'Tours'} Available
              </h2>
              <p className="text-neutral-600">Find your perfect African adventure</p>
            </div>
            
            {/* Sort */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-neutral-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="space-y-6">
            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">Destination</label>
              <div className="flex flex-wrap gap-3">
                {countries.map((country) => (
                  <button
                    key={country.name}
                    onClick={() => setSelectedCountry(country.name)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-2.5 ${
                      selectedCountry === country.name
                        ? 'bg-primary-700 text-white shadow-lg scale-105'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:scale-105'
                    }`}
                  >
                    <span 
                      className="text-2xl w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm"
                      style={{ 
                        fontSize: '1.5rem', 
                        lineHeight: '1',
                        fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif'
                      }}
                    >
                      {country.flag}
                    </span>
                    {country.code && (
                      <span className="font-bold text-sm tracking-wide">{country.code}</span>
                    )}
                    <span className="whitespace-nowrap">{country.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">Duration</label>
              <div className="flex flex-wrap gap-3">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                      selectedDuration === duration
                        ? 'bg-primary-700 text-white shadow-lg scale-105'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">Price Range</label>
              <div className="flex flex-wrap gap-3">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPriceRange(index)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                      selectedPriceRange === index
                        ? 'bg-primary-700 text-white shadow-lg scale-105'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCountry !== 'All' || selectedDuration !== 'All' || selectedPriceRange !== 0) && (
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                <span className="text-sm font-medium text-neutral-700">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedCountry !== 'All' && selectedCountryData && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                      <span 
                        className="text-lg w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm"
                        style={{ 
                          fontSize: '1rem', 
                          lineHeight: '1',
                          fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif'
                        }}
                      >
                        {selectedCountryData.flag}
                      </span>
                      {selectedCountryData.code && (
                        <span className="font-bold text-xs">{selectedCountryData.code}</span>
                      )}
                      {selectedCountry}
                      <button onClick={() => setSelectedCountry('All')} className="hover:text-primary-900 ml-1 w-5 h-5 flex items-center justify-center rounded-full hover:bg-primary-200 transition-colors">
                        ×
                      </button>
                    </span>
                  )}
                  {selectedDuration !== 'All' && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                      {selectedDuration}
                      <button onClick={() => setSelectedDuration('All')} className="hover:text-primary-900 ml-1 w-5 h-5 flex items-center justify-center rounded-full hover:bg-primary-200 transition-colors">
                        ×
                      </button>
                    </span>
                  )}
                  {selectedPriceRange !== 0 && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                      {priceRanges[selectedPriceRange].label}
                      <button onClick={() => setSelectedPriceRange(0)} className="hover:text-primary-900 ml-1 w-5 h-5 flex items-center justify-center rounded-full hover:bg-primary-200 transition-colors">
                        ×
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSelectedCountry('All');
                      setSelectedDuration('All');
                      setSelectedPriceRange(0);
                    }}
                    className="text-sm text-primary-700 hover:text-primary-800 font-medium px-3 py-1 hover:bg-primary-50 rounded-full transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tours Grid */}
        {filteredTours.length > 0 ? (
          <Grid cols={3}>
            {filteredTours.map((tour) => (
              <Link key={tour.id} href={`/tours/${tour.slug}`} className="group">
                <Card hover>
                  <div className="aspect-[4/3] relative bg-neutral-200 overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {tour.featured && (
                      <div className="absolute top-4 right-4 bg-primary-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-neutral-600">{tour.duration}</span>
                      <span className="text-neutral-300">•</span>
                      <span className="text-sm text-primary-700 font-medium">
                        {tour.highlights.length} highlights
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary-700 transition-colors">
                      {tour.name}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-2">
                      {tour.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-neutral-500">From</span>
                        <div className="text-2xl font-bold text-primary-700">
                          ${tour.price}
                          <span className="text-sm text-neutral-600 font-normal">/person</span>
                        </div>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </Grid>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-neutral-700 mb-2">No tours found</h3>
            <p className="text-neutral-600 mb-6">Try adjusting your filters to see more results</p>
            <Button
              onClick={() => {
                setSelectedCountry('All');
                setSelectedDuration('All');
                setSelectedPriceRange(0);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Section>

      <Section className="bg-primary-700 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            We can create a custom itinerary just for you
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="tel:+250780100064" size="lg" variant="secondary">
              Call +250 780 100 064
            </Button>
            <Button href="mailto:booking@intaretravels.rw" size="lg" variant="outline">
              Email Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
