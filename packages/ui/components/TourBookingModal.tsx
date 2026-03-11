'use client';

import { useState, useEffect } from 'react';

interface TourBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourName: string;
  price: number;
  duration: string;
  image?: string;
}

export function TourBookingModal({ isOpen, onClose, tourName, price, duration, image }: TourBookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    participants: '2',
    accommodation: 'standard',
    dietaryRequirements: '',
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
    
    const subject = `Tour Booking Request - ${tourName}`;
    const body = `
Tour Booking Request

Tour Details:
- Tour Name: ${tourName}
- Duration: ${duration}
- Price: $${price} per person

Personal Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

Booking Details:
- Preferred Start Date: ${formData.startDate}
- Number of Participants: ${formData.participants}
- Accommodation Preference: ${formData.accommodation}
- Dietary Requirements: ${formData.dietaryRequirements || 'None'}

Additional Message:
${formData.message || 'None'}

Estimated Total: $${price * parseInt(formData.participants)}
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
            <h2 className="text-3xl font-bold mb-2">Book Your Tour</h2>
            <p className="text-primary-100">Complete the form below to request a booking</p>
          </div>

          {/* Tour Details */}
          <div className="bg-primary-50 p-6 border-b border-primary-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-neutral-600 mb-1">Tour Package</p>
                <p className="text-2xl font-bold text-neutral-900 mb-1">{tourName}</p>
                <p className="text-sm text-neutral-600">{duration}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-600 mb-1">Price</p>
                <p className="text-3xl font-bold text-primary-700">${price}</p>
                <p className="text-sm text-neutral-600">per person</p>
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

                <div className="md:col-span-2">
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
              </div>
            </div>

            {/* Tour Details */}
            <div>
              <h3 className="text-xl font-bold mb-4">Tour Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-2">
                    Preferred Start Date *
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="participants" className="block text-sm font-medium text-neutral-700 mb-2">
                    Number of Participants *
                  </label>
                  <select
                    id="participants"
                    required
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="accommodation" className="block text-sm font-medium text-neutral-700 mb-2">
                    Accommodation Preference *
                  </label>
                  <select
                    id="accommodation"
                    required
                    value={formData.accommodation}
                    onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dietaryRequirements" className="block text-sm font-medium text-neutral-700 mb-2">
                    Dietary Requirements
                  </label>
                  <input
                    type="text"
                    id="dietaryRequirements"
                    value={formData.dietaryRequirements}
                    onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Vegetarian, Vegan, etc."
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
                placeholder="Any special requests, questions, or preferences..."
              />
            </div>

            {/* Total Price */}
            <div className="bg-neutral-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-700">Price per person</span>
                <span className="font-medium">${price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-700">Number of participants</span>
                <span className="font-medium">{formData.participants}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-700">Accommodation</span>
                <span className="font-medium capitalize">{formData.accommodation}</span>
              </div>
              <div className="border-t border-neutral-300 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Estimated Total</span>
                  <span className="text-2xl font-bold text-primary-700">
                    ${price * parseInt(formData.participants)}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mt-2">
                  Final price will be confirmed by our team based on your preferences
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
