'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollAnimations } from '../../components/ScrollAnimations';

const interestOptions = [
  { value: 'tours', label: 'Tours & Travel Packages' },
  { value: 'accommodation', label: 'Accommodation' },
  { value: 'flights', label: 'Flight Bookings' },
  { value: 'custom', label: 'Custom Itinerary' },
  { value: 'other', label: 'Other Inquiry' },
];

export default function ContactPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('');

  const handleSelectInterest = (value: string, label: string) => {
    setSelectedInterest(label);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=2000"
            alt="Rwanda Hills and Landscape"
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
              <span className="text-white">Contact</span>
            </nav>
            
            <p className="label-text text-white mb-6 animate-fade-in">
              Get In Touch
            </p>
            <h1 className="heading-xl mb-8 text-shadow-luxury animate-fade-in-up delay-200">
              Let's Plan Your
              <span className="block text-white">African Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white max-w-3xl mx-auto animate-fade-in-up delay-400">
              Our travel experts are ready to help you create unforgettable memories and extraordinary experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Cards - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              <div className="mb-8">
                <p className="label-text text-red-800 mb-4">Contact Information</p>
                <h2 className="heading-md text-neutral-900 mb-6">Get In Touch</h2>
              </div>
              
              {/* Phone Card */}
              <div className="card-luxury rounded-2xl p-8 hover:border-red-200 transition-colors fade-in-scroll">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 text-red-800">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-sm text-neutral-900 mb-2">Call Us</h3>
                    <a href="tel:+250780100064" className="text-red-800 hover:text-red-900 text-xl font-semibold block mb-1 transition-colors">
                      +250 780 100 064
                    </a>
                    <a href="tel:+250791946733" className="text-red-800 hover:text-red-900 text-xl font-semibold block mb-2 transition-colors">
                      +250 791 946 733
                    </a>
                    <p className="text-sm text-neutral-600">Mon-Fri: 8AM - 6PM EAT</p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="card-luxury rounded-2xl p-8 hover:border-red-200 transition-colors fade-in-scroll delay-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 text-red-800">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-sm text-neutral-900 mb-2">Email Us</h3>
                    <a href="mailto:booking@intaretravels.rw" className="text-red-800 hover:text-red-900 text-lg font-semibold block mb-1 break-all transition-colors">
                      booking@intaretravels.rw
                    </a>
                    <a href="mailto:intaretourtravels@gmail.com" className="text-red-800 hover:text-red-900 text-lg font-semibold block mb-2 break-all transition-colors">
                      intaretourtravels@gmail.com
                    </a>
                    <p className="text-sm text-neutral-600">Response within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="card-luxury rounded-2xl p-8 hover:border-red-200 transition-colors fade-in-scroll delay-200">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 text-red-800">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-sm text-neutral-900 mb-2">Visit Us</h3>
                    <p className="text-neutral-700 font-medium mb-1">Kicukiro - Niboye - Nyakabanda</p>
                    <p className="text-neutral-700 font-medium mb-2">KK 186 St, Kigali, Rwanda</p>
                    <p className="text-sm text-neutral-600">By appointment only</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-red-50 rounded-2xl p-8 fade-in-scroll delay-300">
                <h3 className="heading-sm text-neutral-900 mb-6">Follow Our Journey</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-red-800 hover:text-white transition-colors shadow-sm">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-red-800 hover:text-white transition-colors shadow-sm">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-red-800 hover:text-white transition-colors shadow-sm">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-3">
              <div className="card-luxury rounded-2xl p-8 md:p-10 fade-in-scroll delay-400">
                <h2 className="heading-md text-neutral-900 mb-2">Send Us a Message</h2>
                <p className="text-neutral-600 mb-8">Fill out the form and we'll get back to you within 24 hours</p>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="+250 XXX XXX XXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="interest" className="block text-sm font-semibold text-neutral-700 mb-2">
                        I'm Interested In *
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white text-left flex items-center justify-between"
                        >
                          <span className={selectedInterest ? 'text-neutral-900' : 'text-neutral-500'}>
                            {selectedInterest || 'Select an option'}
                          </span>
                          <svg 
                            className={`w-5 h-5 text-neutral-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {isDropdownOpen && (
                          <>
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setIsDropdownOpen(false)}
                            />
                            <div className="absolute z-20 w-full mt-2 bg-white border-2 border-neutral-200 rounded-xl shadow-lg overflow-hidden">
                              {interestOptions.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => handleSelectInterest(option.value, option.label)}
                                  className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors text-neutral-900 border-b border-neutral-100 last:border-b-0"
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                      placeholder="Tell us about your travel plans and how we can help..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full rounded-xl text-lg py-4">
                    Send Message
                  </button>

                  <p className="text-sm text-neutral-600 text-center">
                    By submitting this form, you agree to our privacy policy
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-luxury-gradient text-white">
        <div className="container-luxury text-center">
          <h2 className="heading-lg mb-6 text-shadow-luxury">Need Immediate Assistance?</h2>
          <p className="text-xl mb-12 text-red-100 max-w-3xl mx-auto">
            Our travel experts are available to answer your questions and help you plan your perfect African adventure right away.
          </p>
          <a href="tel:+250780100064" className="btn-outline rounded-lg">
            Call +250 780 100 064
          </a>
        </div>
      </section>

    </div>
  );
}
