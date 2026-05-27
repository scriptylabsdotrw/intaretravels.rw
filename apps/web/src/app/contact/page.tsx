'use client';

import { useState } from 'react';
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

const contactCards = [
  {
    title: 'Call Us',
    meta: 'Mon–Fri · 8AM – 6PM EAT',
    lines: [
      { text: '+250 780 100 064', href: 'tel:+250780100064' },
      { text: '+250 791 946 733', href: 'tel:+250791946733' },
    ],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
  },
  {
    title: 'Email Us',
    meta: 'We reply within 24 hours',
    lines: [
      { text: 'booking@intaretravels.rw', href: 'mailto:booking@intaretravels.rw' },
      { text: 'intaretourtravels@gmail.com', href: 'mailto:intaretourtravels@gmail.com' },
    ],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    title: 'Visit Us',
    meta: 'By appointment',
    lines: [
      { text: 'KK 186 St, Kicukiro — Niboye', href: undefined },
      { text: 'Kigali, Rwanda', href: undefined },
    ],
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </>
    ),
  },
];

const socials = [
  { name: 'Facebook', href: '#', d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { name: 'Instagram', href: '#', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { name: 'Twitter', href: '#', d: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
];

export default function ContactPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Travel Enquiry${selectedInterest ? ` — ${selectedInterest}` : ''}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || '—'}`,
      `Interested in: ${selectedInterest || '—'}`,
      '',
      form.message,
    ].join('\n');
    window.location.href = `mailto:booking@intaretravels.rw?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen">
      <ScrollAnimations />

      {/* Hero */}
      <section className="relative min-h-[72vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/16122283/pexels-photo-16122283.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt="Gorilla in its natural habitat"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="hero-overlay" />
        </div>

        <div className="relative z-10 container-luxury text-center text-white">
          <nav className="flex items-center justify-center gap-2 text-sm mb-6 animate-fade-in text-white/80">
            <Link href="/" className="hover:text-gold-300 transition-colors">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </nav>
          <p className="label-text text-gold-300 mb-5 animate-fade-in">We&apos;d Love to Hear From You</p>
          <h1 className="heading-xl mb-6 animate-fade-in-up delay-200">
            Let&apos;s Plan Your
            <span className="block text-luxury-gradient">Rwandan Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up delay-400">
            Share your travel dreams with our specialists. We&apos;ll craft a private itinerary of safaris, stays, and flights — tailored entirely to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-9 animate-fade-in-up delay-600">
            <a href="tel:+250780100064" className="btn-gold rounded-lg">Call a Travel Expert</a>
            <a href="#enquiry" className="btn-outline rounded-lg">Send an Enquiry</a>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="section-padding bg-luxury-off-white">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="label-text text-red-800 mb-4">Reach Us</p>
            <h2 className="heading-lg text-neutral-900 mb-4">Speak With Our Team</h2>
            <div className="gold-divider mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactCards.map((card, index) => (
              <div
                key={card.title}
                className="card-luxury rounded-2xl p-8 text-center fade-in-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-red-50 ring-1 ring-gold-200 flex items-center justify-center mx-auto mb-6 text-red-800">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="heading-sm text-neutral-900 mb-3">{card.title}</h3>
                <div className="space-y-1 mb-3">
                  {card.lines.map((line) =>
                    line.href ? (
                      <a key={line.text} href={line.href} className="block text-red-800 hover:text-red-900 font-medium transition-colors break-words">
                        {line.text}
                      </a>
                    ) : (
                      <p key={line.text} className="text-neutral-700 font-medium">{line.text}</p>
                    )
                  )}
                </div>
                <p className="text-sm text-neutral-500">{card.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + map */}
      <section id="enquiry" className="section-padding">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Form */}
            <div className="fade-in-scroll">
              <p className="label-text text-red-800 mb-4">Start the Conversation</p>
              <h2 className="heading-md text-neutral-900 mb-3">Send Us a Message</h2>
              <p className="text-neutral-600 mb-8">Tell us a little about your plans and we&apos;ll respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">Full Name *</label>
                    <input id="name" name="name" required value={form.name} onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">Email Address *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="jane@example.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">Phone Number</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="+250 XXX XXX XXX" />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-semibold text-neutral-700 mb-2">I&apos;m Interested In *</label>
                    <div className="relative">
                      <button
                        type="button"
                        id="interest"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white text-left flex items-center justify-between"
                      >
                        <span className={selectedInterest ? 'text-neutral-900' : 'text-neutral-500'}>
                          {selectedInterest || 'Select an option'}
                        </span>
                        <svg className={`w-5 h-5 text-neutral-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                          <div className="absolute z-20 w-full mt-2 bg-white border-2 border-neutral-200 rounded-xl shadow-lg overflow-hidden">
                            {interestOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => { setSelectedInterest(option.label); setIsDropdownOpen(false); }}
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
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">Your Message *</label>
                  <textarea id="message" name="message" required rows={6} value={form.message} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                    placeholder="Tell us about your dream trip — dates, travellers, and what you'd love to experience..." />
                </div>

                <button type="submit" className="btn-primary w-full rounded-xl text-base py-4">
                  Send Message
                </button>
                <p className="text-sm text-neutral-500 text-center">
                  By submitting, you agree to be contacted about your enquiry.
                </p>
              </form>
            </div>

            {/* Side panel: hours, map, social */}
            <div className="fade-in-scroll delay-200 flex flex-col gap-6">
              <div className="bg-luxury-dark-bg text-white rounded-2xl p-8">
                <h3 className="heading-sm mb-6">Office Hours</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex justify-between"><span>Monday – Friday</span><span className="text-gold-300">8:00 – 18:00</span></li>
                  <li className="flex justify-between"><span>Saturday</span><span className="text-gold-300">9:00 – 14:00</span></li>
                  <li className="flex justify-between"><span>Sunday</span><span className="text-white/50">By appointment</span></li>
                </ul>
                <div className="border-t border-white/10 mt-6 pt-6">
                  <p className="text-sm text-white/70 mb-4">Follow our journeys</p>
                  <div className="flex gap-3">
                    {socials.map((s) => (
                      <a key={s.name} href={s.href} aria-label={s.name}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-gold-500 hover:text-charcoal transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d={s.d} /></svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm flex-1 min-h-[300px]">
                <iframe
                  title="Intare Travels office location in Kigali"
                  src="https://www.google.com/maps?q=Kicukiro%20Niboye%20Kigali%20Rwanda&output=embed"
                  className="w-full h-full min-h-[300px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-luxury-gradient text-white">
        <div className="container-luxury text-center">
          <h2 className="heading-lg mb-6">Prefer to Talk It Through?</h2>
          <p className="text-lg md:text-xl mb-10 text-red-100 max-w-2xl mx-auto">
            Our travel experts are a phone call away, ready to help you plan the perfect African adventure.
          </p>
          <a href="tel:+250780100064" className="btn-gold rounded-lg">Call +250 780 100 064</a>
        </div>
      </section>
    </div>
  );
}
