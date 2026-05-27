'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function BookFlightContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const destination = searchParams.get('destination') || '';
  const price = searchParams.get('price') || '';
  const airline = searchParams.get('airline') || '';
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    passengers: '1',
    departureDate: '',
    returnDate: '',
    specialRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare mailto link
    const subject = `Flight Booking Request - ${destination}`;
    const body = `
Flight Booking Request

Destination: ${destination}
Airline: ${airline}
Price: $${price} per person

Personal Information:
- Full Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Number of Passengers: ${formData.passengers}

Travel Dates:
- Departure: ${formData.departureDate}
- Return: ${formData.returnDate}

Special Requests:
${formData.specialRequests || 'None'}

Please contact me to confirm this booking.
    `.trim();

    window.location.href = `mailto:booking@intaretravels.rw?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/ticketing');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-950 text-white pt-28 pb-12">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Book Your Flight</h1>
          <p className="text-red-100 text-lg">Complete the form below to request your booking</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    Personal Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-2">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="+250 XXX XXX XXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="passengers" className="block text-sm font-medium text-neutral-700 mb-2">
                        Number of Passengers <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="passengers"
                        name="passengers"
                        required
                        value={formData.passengers}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Travel Dates */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Travel Dates
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="departureDate" className="block text-sm font-medium text-neutral-700 mb-2">
                        Departure Date <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="date"
                        id="departureDate"
                        name="departureDate"
                        required
                        value={formData.departureDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="returnDate" className="block text-sm font-medium text-neutral-700 mb-2">
                        Return Date <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="date"
                        id="returnDate"
                        name="returnDate"
                        required
                        value={formData.returnDate}
                        onChange={handleChange}
                        min={formData.departureDate || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    Additional Requests
                  </h2>
                  
                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-neutral-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={4}
                      value={formData.specialRequests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                      placeholder="Any special requests or preferences..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-neutral-200">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-xl hover:from-red-800 hover:to-red-950 transition-all shadow-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : 'Submit Booking Request'}
                  </button>
                  <p className="text-sm text-neutral-600 text-center mt-4">
                    Our team will contact you within 24 hours to confirm your booking
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Booking Summary</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Destination</p>
                  <p className="text-lg font-bold">{destination}</p>
                </div>

                <div>
                  <p className="text-sm text-neutral-600 mb-1">Airline</p>
                  <p className="font-medium">{airline}</p>
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600 mb-1">Price per person</p>
                  <p className="text-3xl font-bold text-red-700">${price}</p>
                  <p className="text-sm text-neutral-600 mt-1">round trip</p>
                </div>

                {formData.passengers && parseInt(formData.passengers) > 1 && (
                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-neutral-600">Passengers</p>
                      <p className="font-medium">{formData.passengers}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold">Total Estimate</p>
                      <p className="text-2xl font-bold text-red-700">
                        ${parseInt(price) * parseInt(formData.passengers)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-start gap-3 text-sm text-neutral-600">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p>Final price confirmed after booking review</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-neutral-600 mt-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p>24/7 customer support available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookFlightPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <div className="h-12 w-12 rounded-full border-4 border-forest-800 border-t-transparent animate-spin" />
        </div>
      }
    >
      <BookFlightContent />
    </Suspense>
  );
}
