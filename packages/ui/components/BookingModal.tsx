'use client';

import { useState, useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
  price: number;
  airline: string;
}

export function BookingModal({ isOpen, onClose, destination, price, airline }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    departure: '',
    return: '',
    passengers: '1',
    message: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    const bookingDetails = {
      ...formData,
      destination,
      price,
      airline,
    };
    console.log('Booking submitted:', bookingDetails);
    
    // For now, we'll create a mailto link
    const subject = `Flight Booking Request - ${destination}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Destination: ${destination}
Airline: ${airline}
Price: $${price}
Departure Date: ${formData.departure}
Return Date: ${formData.return}
Number of Passengers: ${formData.passengers}
Additional Message: ${formData.message}
    `.trim();
    
    window.location.href = `mailto:booking@intaretravels.rw?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="bg-primary-700 text-white p-8 rounded-t-2xl">
            <h2 className="text-3xl font-bold mb-2">Book Your Flight</h2>
            <p className="text-primary-100">Complete the form below to request a booking</p>
          </div>

          {/* Flight Details */}
          <div className="bg-primary-50 p-6 border-b border-primary-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Destination</p>
                <p className="text-2xl font-bold text-neutral-900">{destination}</p>
                <p className="text-sm text-neutral-600 mt-1">via {airline}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-600 mb-1">Price</p>
                <p className="text-3xl font-bold text-primary-700">${price}</p>
                <p className="text-sm text-neutral-600">round trip</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-bold mb-4">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+250 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label htmlFor="passengers" className="block text-sm font-medium text-neutral-700 mb-2">
                    Number of Passengers *
                  </label>
                  <select
                    id="passengers"
                    required
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Travel Dates */}
            <div>
              <h3 className="text-xl font-bold mb-4">Travel Dates</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="departure" className="block text-sm font-medium text-neutral-700 mb-2">
                    Departure Date *
                  </label>
                  <input
                    type="date"
                    id="departure"
                    required
                    value={formData.departure}
                    onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="return" className="block text-sm font-medium text-neutral-700 mb-2">
                    Return Date *
                  </label>
                  <input
                    type="date"
                    id="return"
                    required
                    value={formData.return}
                    onChange={(e) => setFormData({ ...formData, return: e.target.value })}
                    min={formData.departure || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                Additional Requests (Optional)
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Any special requests or preferences..."
              />
            </div>

            {/* Total Price */}
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-700">Price per person</span>
                <span className="font-medium">${price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-700">Number of passengers</span>
                <span className="font-medium">{formData.passengers}</span>
              </div>
              <div className="border-t border-neutral-300 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Estimated Total</span>
                  <span className="text-2xl font-bold text-primary-700">
                    ${price * parseInt(formData.passengers)}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mt-2">
                  Final price will be confirmed by our team
                </p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-colors font-medium text-lg"
              >
                Submit Booking Request
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-4 border-2 border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>

            <p className="text-sm text-neutral-600 text-center">
              By submitting, you agree to be contacted by our team regarding your booking request.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
