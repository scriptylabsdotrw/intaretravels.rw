'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Section, Grid, Card, Button, Badge, Breadcrumb } from '@tourism/ui';
import Link from 'next/link';

const cities = [
  'All Cities',
  'Kigali',
  'Nairobi', 
  'Dar es Salaam',
  'Johannesburg',
  'Dubai',
  'Lagos',
  'Addis Ababa'
];

const partners = [
  { name: 'RwandAir', description: "Rwanda's national carrier", logo: '/RwandAir.jpg' },
  { name: 'Qatar Airways', description: 'Luxury Middle East flights', logo: '/aerolineas-images_0009_QatarAirways.png' },
  { name: 'Kenya Airways', description: 'East African connections', logo: '/Kenya_Airways-Logo.wine.png' },
  { name: 'Ethiopian Airlines', description: 'Pan-African network', logo: '/ethiopian-airlines-logo-png_seeklogo-49734.png' },
];

const faqs = [
  { question: 'How do I book a flight?', answer: 'Click "Book Now" on any flight deal to open the booking form. Fill in your details and our team will contact you within 24 hours to confirm your booking.' },
  { question: 'Are these prices guaranteed?', answer: 'Promotional prices are valid until the specified date and subject to availability. We recommend booking early to secure the best rates.' },
  { question: 'Can I book directly online?', answer: 'Yes! Use our booking form to submit your request. Our team will process it and send you payment details and confirmation.' },
  { question: 'What payment methods do you accept?', answer: 'We accept bank transfers, mobile money, and major credit cards. Payment details will be provided when you contact us.' },
];

export default function TicketingPage() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromCity, setFromCity] = useState('All Cities');
  const [toCity, setToCity] = useState('All Cities');
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [fromSearchQuery, setFromSearchQuery] = useState('');
  const [toSearchQuery, setToSearchQuery] = useState('');
  const [tripType, setTripType] = useState<'return' | 'oneway' | 'multicity'>('return');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);
  const [passengersDropdownOpen, setPassengersDropdownOpen] = useState(false);
  const promotionsPerPage = 6;

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await fetch('/api/promotions');
      const data = await response.json();
      // Only show active promotions on the client side
      setPromotions(data.filter((p: any) => p.active));
    } catch (error) {
      console.error('Failed to fetch promotions:', error);
    } finally {
      setLoading(false);
    }
  };
  // Filter cities based on search query
  const filteredFromCities = cities.filter(city => 
    city.toLowerCase().includes(fromSearchQuery.toLowerCase())
  );
  
  const filteredToCities = cities.filter(city => 
    city.toLowerCase().includes(toSearchQuery.toLowerCase())
  );

  // Filter promotions based on search
  const filteredPromotions = promotions.filter(promo => {
    const fromMatch = fromCity === 'All Cities' || promo.from === fromCity;
    const toMatch = toCity === 'All Cities' || promo.destination === toCity;
    return fromMatch && toMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPromotions.length / promotionsPerPage);
  const indexOfLastPromotion = currentPage * promotionsPerPage;
  const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
  const currentPromotions = filteredPromotions.slice(indexOfFirstPromotion, indexOfLastPromotion);

  // Reset to page 1 when filters change
  const handleFromChange = (city: string) => {
    setFromCity(city);
    setCurrentPage(1);
    setFromDropdownOpen(false);
    setFromSearchQuery('');
  };

  const handleToChange = (city: string) => {
    setToCity(city);
    setCurrentPage(1);
    setToDropdownOpen(false);
    setToSearchQuery('');
  };

  return (
    <>
      <div className="relative bg-neutral-900 text-white py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000"
            alt="Airplane in flight"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/50 to-neutral-900/80" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Flight Deals' }]} theme="dark" />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Exclusive Flight Deals
            </h1>
            <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed">
              Partner with top airlines for unbeatable prices across Africa and beyond
            </p>
          </div>
        </div>
      </div>
      {/* Flight Search Section */}
      <div className="relative -mt-16 z-20 mb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-2xl overflow-visible">
            {/* Header with Title */}
            <div className="bg-white px-8 py-8 border-b border-neutral-200">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-neutral-900">Search Flights</h2>
            </div>

            <div className="p-8 md:p-12">
              {/* Trip Type Selection */}
              <div className="flex items-center gap-8 mb-10">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div 
                    onClick={() => setTripType('return')}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
                      tripType === 'return' ? 'border-red-700 bg-red-700' : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {tripType === 'return' && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-neutral-700">Return</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div 
                    onClick={() => setTripType('oneway')}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
                      tripType === 'oneway' ? 'border-red-700 bg-red-700' : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {tripType === 'oneway' && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-neutral-700">One way</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div 
                    onClick={() => setTripType('multicity')}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
                      tripType === 'multicity' ? 'border-red-700 bg-red-700' : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {tripType === 'multicity' && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium text-neutral-700">Multi-city</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer ml-auto">
                  <div 
                    onClick={() => setDirectFlightsOnly(!directFlightsOnly)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                      directFlightsOnly ? 'border-red-700 bg-red-700' : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {directFlightsOnly && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium text-neutral-700">Direct flights only</span>
                </label>
              </div>
              {/* Search Form */}
              <div className="space-y-6">
                {/* First Row: Origin and Destination */}
                <div className="grid md:grid-cols-7 gap-6">
                  {/* From - 3 columns */}
                  <div className="md:col-span-3 relative">
                    <label className="flex items-center gap-3 text-sm font-medium text-neutral-600 mb-3">
                      <svg className="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Origin
                    </label>
                    <button
                      onClick={() => {
                        setFromDropdownOpen(!fromDropdownOpen);
                        setToDropdownOpen(false);
                      }}
                      className="w-full px-5 py-4 border-2 border-red-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-red-400 transition-colors focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <div>
                        <div className="text-xs text-neutral-500">Where from?</div>
                        <div className="font-semibold text-neutral-900">{fromCity}</div>
                      </div>
                      <svg className={`w-5 h-5 text-red-700 transition-transform ${fromDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {fromDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setFromDropdownOpen(false)} />
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-red-300 rounded-lg shadow-xl z-50 overflow-hidden">
                          <div className="p-3 border-b border-neutral-200">
                            <div className="relative">
                              <input
                                type="text"
                                value={fromSearchQuery}
                                onChange={(e) => setFromSearchQuery(e.target.value)}
                                placeholder="Search cities..."
                                className="w-full px-4 py-2 pl-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <svg className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {filteredFromCities.length > 0 ? (
                              filteredFromCities.map((city) => (
                                <button
                                  key={city}
                                  onClick={() => handleFromChange(city)}
                                  className={`w-full px-4 py-3 text-left hover:bg-red-50 transition-colors ${
                                    fromCity === city ? 'bg-red-100 font-semibold text-red-700' : 'text-neutral-700'
                                  }`}
                                >
                                  {city}
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-8 text-center text-neutral-500">No cities found</div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {/* Swap Button */}
                  <div className="md:col-span-1 flex items-end justify-center pb-4">
                    <button
                      onClick={() => {
                        const temp = fromCity;
                        handleFromChange(toCity);
                        handleToChange(temp);
                      }}
                      className="p-4 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </button>
                  </div>

                  {/* To - 3 columns */}
                  <div className="md:col-span-3 relative">
                    <label className="flex items-center gap-3 text-sm font-medium text-neutral-600 mb-3">
                      <svg className="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Destination
                    </label>
                    <button
                      onClick={() => {
                        setToDropdownOpen(!toDropdownOpen);
                        setFromDropdownOpen(false);
                      }}
                      className="w-full px-5 py-4 border-2 border-red-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-red-400 transition-colors focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <div>
                        <div className="text-xs text-neutral-500">Where to?</div>
                        <div className="font-semibold text-neutral-900">{toCity}</div>
                      </div>
                      <svg className={`w-5 h-5 text-red-700 transition-transform ${toDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {toDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setToDropdownOpen(false)} />
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-red-300 rounded-lg shadow-xl z-50 overflow-hidden">
                          <div className="p-3 border-b border-neutral-200">
                            <div className="relative">
                              <input
                                type="text"
                                value={toSearchQuery}
                                onChange={(e) => setToSearchQuery(e.target.value)}
                                placeholder="Search cities..."
                                className="w-full px-4 py-2 pl-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <svg className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {filteredToCities.length > 0 ? (
                              filteredToCities.map((city) => (
                                <button
                                  key={city}
                                  onClick={() => handleToChange(city)}
                                  className={`w-full px-4 py-3 text-left hover:bg-red-50 transition-colors ${
                                    toCity === city ? 'bg-red-100 font-semibold text-red-700' : 'text-neutral-700'
                                  }`}
                                >
                                  {city}
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-8 text-center text-neutral-500">No cities found</div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* Second Row: Dates and Passengers */}
                <div className={`grid gap-6 ${
                  tripType === 'return' 
                    ? 'md:grid-cols-3' 
                    : tripType === 'oneway' 
                      ? 'md:grid-cols-2' 
                      : 'md:grid-cols-2'
                }`}>
                  {/* Departure Date */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-3">Departure Date</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={departureDate}
                        onFocus={(e) => e.target.type = 'date'}
                        onBlur={(e) => {
                          if (!e.target.value) e.target.type = 'text';
                        }}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        placeholder="Select date"
                        className="w-full px-5 py-4 border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                      />
                      <svg className="w-5 h-5 text-neutral-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Return Date - Only show for return trips */}
                  {tripType === 'return' && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-600 mb-3">Return Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={returnDate}
                          onFocus={(e) => e.target.type = 'date'}
                          onBlur={(e) => {
                            if (!e.target.value) e.target.type = 'text';
                          }}
                          onChange={(e) => setReturnDate(e.target.value)}
                          min={departureDate || new Date().toISOString().split('T')[0]}
                          placeholder="Select date"
                          className="w-full px-5 py-4 border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                        />
                        <svg className="w-5 h-5 text-neutral-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {/* Passengers */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-600 mb-3">Passengers</label>
                    <div className="relative">
                      <button
                        onClick={() => setPassengersDropdownOpen(!passengersDropdownOpen)}
                        className="w-full flex items-center gap-3 px-5 py-4 border-2 border-neutral-300 rounded-lg bg-white hover:border-red-400 transition-colors focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="font-semibold text-neutral-900 flex-1 text-left">{passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}</span>
                        <svg className={`w-5 h-5 text-neutral-600 transition-transform ${passengersDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {passengersDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setPassengersDropdownOpen(false)} />
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-red-300 rounded-lg shadow-xl z-50 p-4">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-neutral-700">Passengers</span>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                  disabled={passengers <= 1}
                                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                                >
                                  <svg className="w-4 h-4 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>
                                <span className="w-8 text-center font-bold text-neutral-900">{passengers}</span>
                                <button
                                  onClick={() => setPassengers(Math.min(9, passengers + 1))}
                                  disabled={passengers >= 9}
                                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                                >
                                  <svg className="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">Maximum 9 passengers per booking</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Active Filters & Search Button */}
              <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Active Filters */}
                {(fromCity !== 'All Cities' || toCity !== 'All Cities') && (
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-sm font-medium text-neutral-700">Active search:</span>
                    {fromCity !== 'All Cities' && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        From: {fromCity}
                        <button onClick={() => handleFromChange('All Cities')} className="hover:text-red-900">×</button>
                      </span>
                    )}
                    {toCity !== 'All Cities' && (
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        To: {toCity}
                        <button onClick={() => handleToChange('All Cities')} className="hover:text-red-900">×</button>
                      </span>
                    )}
                    <button
                      onClick={() => {
                        handleFromChange('All Cities');
                        handleToChange('All Cities');
                      }}
                      className="text-sm text-red-700 hover:text-red-800 font-medium underline"
                    >
                      Clear all
                    </button>
                  </div>
                )}

                {/* Search Button */}
                <div className="ml-auto">
                  <button className="px-10 py-4 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 transition-all shadow-lg font-semibold text-lg">
                    Search Flights
                  </button>
                </div>
              </div>

              {/* Results Count */}
              {(fromCity !== 'All Cities' || toCity !== 'All Cities') && (
                <div className="mt-8 pt-8 border-t border-neutral-200 text-center">
                  <p className="text-neutral-600 text-lg">
                    Found <span className="font-bold text-red-700">{filteredPromotions.length}</span> available {filteredPromotions.length === 1 ? 'flight' : 'flights'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Section title="Available Flight Deals" subtitle={filteredPromotions.length === 0 ? "No flights found for your search" : "Limited-time offers"}>
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
            <p className="text-neutral-600">Loading flight deals...</p>
          </div>
        ) : currentPromotions.length > 0 ? (
          <>
            <Grid cols={3}>
              {currentPromotions.map((promo) => (
            <Card key={promo.id} className="overflow-hidden">
              <div className="aspect-[4/3] relative bg-neutral-200 overflow-hidden">
                <Image
                  src={promo.image}
                  alt={promo.destination}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="primary">{promo.discount}</Badge>
                </div>
              </div>
              <div className="p-8">
                {/* Airline Logo */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">From {promo.from}</p>
                    <h3 className="text-2xl font-bold">{promo.destination}</h3>
                  </div>
                  <div className="relative w-16 h-10 bg-white rounded border border-neutral-200 p-1">
                    <Image
                      src={promo.logo}
                      alt={promo.airline}
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                    />
                  </div>
                </div>
                
                <p className="text-neutral-600 text-sm mb-6">via {promo.airline}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary-700">${promo.price}</span>
                  <span className="text-neutral-600 ml-2">round trip</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Valid until {new Date(promo.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                
                <Link href={`/book-flight?destination=${encodeURIComponent(promo.destination)}&price=${promo.price}&airline=${encodeURIComponent(promo.airline)}`}>
                  <Button className="w-full">
                    Book Now
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </Grid>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-red-700 to-red-900 text-white shadow-md'
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
              className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
        </>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-neutral-700 mb-2">No flights found</h3>
            <p className="text-neutral-600 mb-6">Try adjusting your search criteria</p>
            <button
              onClick={() => {
                handleFromChange('All Cities');
                handleToChange('All Cities');
              }}
              className="px-6 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 transition-all shadow-md font-medium"
            >
              Clear Search
            </button>
          </div>
        )}
      </Section>
      <Section title="Our Airline Partners" subtitle="Trusted carriers for your journey" className="bg-neutral-50">
        <div className="space-y-12 overflow-hidden">
          {/* First Row - Sliding Left to Right */}
          <div className="relative">
            <div className="flex gap-12 animate-scroll-right">
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div 
                  key={`row1-${index}`}
                  className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Sliding Right to Left */}
          <div className="relative">
            <div className="flex gap-12 animate-scroll-left">
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div 
                  key={`row2-${index}`}
                  className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Details Below */}
        <div className="mt-20">
          <Grid cols={4}>
            {partners.map((partner) => (
              <div key={partner.name} className="text-center">
                <h3 className="font-bold mb-2 text-lg">{partner.name}</h3>
                <p className="text-neutral-600 text-sm">{partner.description}</p>
              </div>
            ))}
          </Grid>
        </div>
      </Section>
      <Section title="Frequently Asked Questions">
        <div className="max-w-3xl mx-auto space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-neutral-200 pb-8">
              <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
              <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-primary-700 text-white">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help Booking?</h2>
          <p className="text-xl mb-8 text-primary-100">Our team is here to assist you</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="secondary" size="lg" href="tel:+250780100064">Call +250 780 100 064</Button>
            <Button variant="outline" size="lg" href="mailto:booking@intaretravels.rw">Email Us</Button>
          </div>
        </div>
      </Section>
    </>
  );
}