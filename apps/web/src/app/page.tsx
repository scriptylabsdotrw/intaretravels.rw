'use client';

import { Hero, Section, Grid, Card, Button, FeatureCard } from '@tourism/ui';
import { StructuredData, generateTravelAgencySchema } from '@tourism/lib';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Import tours data
import toursData from '../../../../data/tours.json';

export default function HomePage() {
  const schema = generateTravelAgencySchema(process.env.NEXT_PUBLIC_SITE_URL || '');
  const featuredTours = toursData.filter(tour => tour.featured).slice(0, 3);

  return (
    <>
      <StructuredData data={schema} />
      
      {/* Clean & Elegant Hero Section */}
      <div className="relative h-screen min-h-[100vh] overflow-hidden bg-black">
        {/* Single Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2400"
            alt="Luxury African Experience"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent"></div>
        </div>

        {/* Simple Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl text-center">
            
            {/* Clean Badge */}
            <div className="inline-flex items-center gap-3 mb-12 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-white font-medium text-sm tracking-wider uppercase">
                Luxury Travel Specialists
              </span>
            </div>

            {/* Simple Typography */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
              Extraordinary
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-500">
                African Journeys
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Curated luxury experiences across Africa's most breathtaking destinations. 
              Where every moment becomes a treasured memory.
            </p>
            
            {/* Clean CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/tours"
                className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl hover:from-red-700 hover:to-red-900 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-3"
              >
                Explore Tours
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link 
                href="/contact"
                className="px-10 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Simple Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
            <span className="text-white/70 text-xs font-medium tracking-wider uppercase">Scroll</span>
          </div>
        </div>
      </div>

      {/* Luxury Featured Tours */}
      <Section className="py-32 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-200 to-transparent"></div>
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-60"></div>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-red-50 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-red-700 font-semibold text-sm tracking-widest uppercase">Signature Experiences</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 tracking-tight">
              Curated for the
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800"> Discerning Traveler</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Each journey is meticulously crafted to deliver unparalleled luxury, authentic cultural immersion, 
              and memories that will last a lifetime.
            </p>
          </div>

          {/* Premium Tours Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredTours.map((tour, index) => (
              <Link key={tour.id} href={`/tours/${tour.slug}`} className="group">
                <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-red-300 transition-all duration-500 transform hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-6 right-6 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full border border-neutral-200">
                      <span className="text-neutral-900 font-bold text-lg">${tour.price.toLocaleString()}</span>
                      <span className="text-neutral-600 text-sm ml-1">per person</span>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-6 left-6 px-3 py-1.5 bg-red-800/90 backdrop-blur-sm rounded-full border border-red-700/50">
                      <span className="text-white font-semibold text-sm">{tour.duration}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-600 font-medium">{tour.name.split(' ')[0]}</span>
                      <span className="text-neutral-300">•</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-neutral-500 text-sm ml-1">(5.0)</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-red-800 transition-colors">
                      {tour.name}
                    </h3>
                    
                    <p className="text-neutral-600 mb-6 leading-relaxed line-clamp-3">
                      {tour.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 mb-6">
                      {tour.highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-neutral-600">
                          <svg className="w-4 h-4 text-red-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-red-800 font-semibold group-hover:text-red-900 transition-colors">
                        View Details
                      </span>
                      <svg className="w-5 h-5 text-red-800 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Tours CTA */}
          <div className="text-center">
            <Link 
              href="/tours"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-2xl hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-xl font-semibold text-lg"
            >
              Explore All Luxury Tours
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </Section>

      {/* Partner Logos Section */}
      <Section className="py-16 bg-white border-b border-neutral-100">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="text-center mb-12">
            <h3 className="text-lg font-semibold text-neutral-600 mb-8">Trusted Partners & Certifications</h3>
          </div>
          
          {/* Sliding Partner Logos */}
          <div className="relative overflow-hidden">
            {/* First Row - Left to Right */}
            <div className="flex animate-scroll-left mb-12">
              <div className="flex items-center gap-12 min-w-full">
                {/* Rwanda Development Board */}
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/RDB-1.png"
                      alt="Rwanda Development Board"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                {/* Chamber of Tourism */}
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/Chamber-of-tourism.png"
                      alt="Chamber of Tourism"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                {/* RTTA */}
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/rtta.png"
                      alt="Rwanda Tours and Travel Association"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                {/* TripAdvisor */}
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/Tripadvisor-Logo.png"
                      alt="TripAdvisor"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                {/* Qatar Airways */}
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/aerolineas-images_0009_QatarAirways.png"
                      alt="Qatar Airways"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                {/* Repeat for seamless loop */}
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/RDB-1.png"
                      alt="Rwanda Development Board"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/Chamber-of-tourism.png"
                      alt="Chamber of Tourism"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/rtta.png"
                      alt="Rwanda Tours and Travel Association"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row - Right to Left */}
            <div className="flex animate-scroll-right">
              <div className="flex items-center gap-12 min-w-full">
                {/* RwandAir */}
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/RwandAir.jpg"
                      alt="RwandAir"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                {/* Kenya Airways */}
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/Kenya_Airways-Logo.wine.png"
                      alt="Kenya Airways"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                {/* Ethiopian Airlines */}
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/ethiopian-airlines-logo-png_seeklogo-49734.png"
                      alt="Ethiopian Airlines"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                {/* TripAdvisor (repeat) */}
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/Tripadvisor-Logo.png"
                      alt="TripAdvisor"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                {/* Qatar Airways (repeat) */}
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/aerolineas-images_0009_QatarAirways.png"
                      alt="Qatar Airways"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                {/* Repeat for seamless loop */}
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/RwandAir.jpg"
                      alt="RwandAir"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/Kenya_Airways-Logo.wine.png"
                      alt="Kenya Airways"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
                
                <div className="flex-shrink-0 w-52 h-36 bg-white rounded-xl border border-neutral-200 p-8 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/ethiopian-airlines-logo-png_seeklogo-49734.png"
                      alt="Ethiopian Airlines"
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Revamped Why Choose Us Section */}
      <Section className="py-24 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-50 rounded-full blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-red-100 rounded-full">
              <div className="w-2 h-2 bg-red-800 rounded-full"></div>
              <span className="text-red-900 font-semibold text-sm tracking-wider uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Your Trusted Partner for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-900"> Extraordinary Adventures</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              With over a decade of expertise, we've crafted unforgettable journeys for discerning travelers worldwide.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Feature 1 */}
            <div className="group bg-white rounded-2xl p-8 border border-neutral-100 hover:border-red-300 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-800 to-red-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-red-800 transition-colors">
                Bespoke Experiences
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Every journey is uniquely crafted to your preferences, ensuring an experience as individual as you are.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-2xl p-8 border border-neutral-100 hover:border-red-300 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-800 to-red-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-red-800 transition-colors">
                24/7 Concierge Service
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Our dedicated travel concierges are available around the clock to ensure your journey exceeds expectations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white rounded-2xl p-8 border border-neutral-100 hover:border-red-300 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-800 to-red-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-red-800 transition-colors">
                Exclusive Access
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Private reserves, after-hours museum visits, and VIP experiences unavailable to regular tourists.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white rounded-2xl p-8 border border-neutral-100 hover:border-red-300 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-800 to-red-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-red-800 transition-colors">
                Local Expertise
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Our local guides and partners provide authentic insights and access to hidden gems across Africa.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-white rounded-2xl p-8 border border-neutral-100 hover:border-red-300 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-800 to-red-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-red-800 transition-colors">
                Best Value Guarantee
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Transparent pricing with everything included - no hidden fees or surprises, just exceptional value.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-white rounded-2xl p-8 border border-neutral-100 hover:border-red-300 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-800 to-red-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-red-800 transition-colors">
                Sustainable Tourism
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                We're committed to responsible travel that benefits local communities and preserves Africa's natural beauty.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200">
              <div className="text-4xl font-bold text-red-800 mb-2">10+</div>
              <div className="text-neutral-700 font-semibold">Years Experience</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200">
              <div className="text-4xl font-bold text-red-800 mb-2">500+</div>
              <div className="text-neutral-700 font-semibold">Happy Travelers</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200">
              <div className="text-4xl font-bold text-red-800 mb-2">15</div>
              <div className="text-neutral-700 font-semibold">Countries</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200">
              <div className="text-4xl font-bold text-red-800 mb-2">98%</div>
              <div className="text-neutral-700 font-semibold">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </Section>
      {/* Luxury Testimonials */}
      <Section className="py-32 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-red-50 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-red-700 font-semibold text-sm tracking-widest uppercase">Client Stories</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 tracking-tight">
              Testimonials from
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800"> Luxury Travelers</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Hear from discerning travelers who have experienced the magic of Africa with our expert guidance.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-neutral-100">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-neutral-700 mb-6 leading-relaxed italic">
                "The gorilla trekking experience was absolutely magical. Every detail was perfectly arranged, from the luxury lodge to the expert guides. Intare Travels exceeded all our expectations."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                  <span className="text-red-700 font-bold text-lg">S</span>
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">Sarah Mitchell</div>
                  <div className="text-neutral-600 text-sm">London, UK</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-neutral-100">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-neutral-700 mb-6 leading-relaxed italic">
                "Our Victoria Falls adventure was the trip of a lifetime. The attention to detail and personalized service made us feel like VIPs throughout the entire journey."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                  <span className="text-red-700 font-bold text-lg">M</span>
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">Michael Chen</div>
                  <div className="text-neutral-600 text-sm">New York, USA</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-neutral-100">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-neutral-700 mb-6 leading-relaxed italic">
                "Exceptional service from start to finish. The team's local knowledge and connections gave us access to experiences we never could have arranged ourselves."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                  <span className="text-red-700 font-bold text-lg">E</span>
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">Emma Thompson</div>
                  <div className="text-neutral-600 text-sm">Sydney, Australia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Luxury CTA Section */}
      <Section className="py-32 bg-gradient-to-br from-red-900 via-red-800 to-red-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/imigongo_bg.jpg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-red-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-6 md:px-12 max-w-7xl relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
              <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
              <span className="text-red-200 font-semibold text-sm tracking-widest uppercase">Start Your Journey</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              Ready for Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-red-300 to-red-400">
                Extraordinary Adventure?
              </span>
            </h2>
            
            <p className="text-2xl text-red-100 mb-12 leading-relaxed font-light">
              Let our luxury travel specialists craft your perfect African journey. 
              <span className="text-white font-medium">Every detail, every moment, perfectly curated.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="tel:+250780100064"
                className="group relative px-10 py-5 bg-white text-red-900 rounded-2xl hover:bg-red-50 transition-all duration-300 shadow-2xl font-bold text-xl flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-100/0 via-red-100/50 to-red-100/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <svg className="w-6 h-6 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="relative">Call +250 780 100 064</span>
              </Link>
              
              <Link 
                href="mailto:booking@intaretravels.rw"
                className="px-10 py-5 bg-white/15 backdrop-blur-xl border-2 border-white/40 text-white rounded-2xl hover:bg-white/25 hover:border-white/60 transition-all duration-300 font-bold text-xl flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Our Experts
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
                <div>
                  <h4 className="text-white font-semibold mb-2">Luxury Travel Specialists</h4>
                  <p className="text-red-200 text-sm">Available 24/7 for your convenience</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Kigali Office</h4>
                  <p className="text-red-200 text-sm">Kicukiro - Niboye - Nyakabanda KK 186 St</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
