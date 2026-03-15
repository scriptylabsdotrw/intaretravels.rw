'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminLayout } from '../../../components/AdminLayout';

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export default function NewTour() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    duration: '',
    image: '',
    highlights: '',
    included: '',
    featured: false,
    seoTitle: '',
    seoDescription: '',
  });

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { day: 1, title: '', activities: [''] }
  ]);

  const addItineraryDay = () => {
    setItinerary([...itinerary, { day: itinerary.length + 1, title: '', activities: [''] }]);
  };

  const removeItineraryDay = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  const updateItineraryDay = (index: number, field: 'title', value: string) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const addActivity = (dayIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.push('');
    setItinerary(updated);
  };

  const updateActivity = (dayIndex: number, activityIndex: number, value: string) => {
    const updated = [...itinerary];
    updated[dayIndex].activities[activityIndex] = value;
    setItinerary(updated);
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities = updated[dayIndex].activities.filter((_, i) => i !== activityIndex);
    setItinerary(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tour = {
      ...formData,
      price: parseFloat(formData.price),
      currency: 'USD',
      image: formData.image || `https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800`,
      highlights: formData.highlights.split('\n').filter(Boolean),
      included: formData.included.split('\n').filter(Boolean),
      itinerary: itinerary.map(day => ({
        day: day.day,
        title: day.title,
        activities: day.activities.filter(Boolean)
      }))
    };

    const response = await fetch('/api/tours', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tour),
    });

    if (response.ok) {
      router.push('/tours');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-1">Add New Tour</h1>
            <p className="text-neutral-600">Create a new tour package for the website</p>
          </div>
          <Link href="/tours" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tours
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-5 pb-3 border-b border-neutral-100">Basic Information</h2>
            
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Tour Name *</label>
                <input
                  type="text" required
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="7-Day Rwanda Discovery Package"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Slug (URL) *</label>
                <input
                  type="text" required
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-neutral-50"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="rwanda-discovery-7-days"
                />
                <p className="text-xs text-neutral-400 mt-1">URL-friendly version (lowercase, hyphens)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Price (USD) *</label>
                <input
                  type="number" required step="0.01"
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="775"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Duration *</label>
                <input
                  type="text" required
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="6 days"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description *</label>
                <textarea
                  required rows={4}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Complete Rwanda experience from Kigali culture to Nyungwe canopy walks..."
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Image URL</label>
                <input
                  type="url"
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                />
                <p className="text-xs text-neutral-400 mt-1">Leave empty for default image</p>
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <div
                  onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${formData.featured ? 'border-red-700 bg-red-700' : 'border-neutral-300 bg-white'}`}
                >
                  {formData.featured && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium text-neutral-700 cursor-pointer" onClick={() => setFormData({ ...formData, featured: !formData.featured })}>
                  Featured Tour (show on homepage)
                </span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-1">Tour Highlights</h2>
            <p className="text-sm text-neutral-500 mb-4">Enter one highlight per line</p>
            <textarea
              rows={6}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm resize-none"
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              placeholder={"Nyungwe Forest canopy walkway\nMount Bisoke crater lake hike\nCoffee farm experience with tasting\nKing's Palace in Nyanza"}
            />
          </div>

          {/* What's Included */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-1">What's Included</h2>
            <p className="text-sm text-neutral-500 mb-4">Enter one item per line</p>
            <textarea
              rows={6}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm resize-none"
              value={formData.included}
              onChange={(e) => setFormData({ ...formData, included: e.target.value })}
              placeholder={"Accommodation (5 nights at Senita B&B)\nAll park/museum entries & guide fees\nCoffee tour & canopy walk\nPrivate transport for full trip"}
            />
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
              <div>
                <h2 className="text-lg font-bold text-neutral-900">Day-by-Day Itinerary</h2>
                <p className="text-sm text-neutral-500">Add activities for each day of the tour</p>
              </div>
              <button
                type="button" onClick={addItineraryDay}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 text-sm font-medium transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Day
              </button>
            </div>

            <div className="space-y-4">
              {itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="border border-neutral-200 rounded-xl p-5 bg-neutral-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-700 to-red-900 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm">
                        {day.day}
                      </div>
                      <span className="font-semibold text-neutral-800">Day {day.day}</span>
                    </div>
                    {itinerary.length > 1 && (
                      <button type="button" onClick={() => removeItineraryDay(dayIndex)} className="text-sm text-neutral-400 hover:text-red-600 transition-colors">
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Day Title</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                        value={day.title}
                        onChange={(e) => updateItineraryDay(dayIndex, 'title', e.target.value)}
                        placeholder="Arrival & Welcome to Kigali"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium text-neutral-700">Activities</label>
                        <button type="button" onClick={() => addActivity(dayIndex)} className="text-xs text-red-700 hover:text-red-800 font-medium">
                          + Add Activity
                        </button>
                      </div>
                      <div className="space-y-2">
                        {day.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex gap-2">
                            <input
                              type="text"
                              className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                              value={activity}
                              onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value)}
                              placeholder="Airport or city pickup & hotel check-in"
                            />
                            {day.activities.length > 1 && (
                              <button type="button" onClick={() => removeActivity(dayIndex, activityIndex)} className="px-3 text-neutral-400 hover:text-red-600 transition-colors text-lg leading-none">
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-1">SEO Settings</h2>
            <p className="text-sm text-neutral-500 mb-5">Optimize for search engines</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">SEO Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="6-Day Rwanda Discovery - Culture, Nature & Adventure"
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-neutral-400">Recommended: 50–60 characters</p>
                  <p className={`text-xs ${formData.seoTitle.length > 60 ? 'text-red-500' : 'text-neutral-400'}`}>{formData.seoTitle.length}/60</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">SEO Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="Explore Rwanda's best: Kigali culture, Nyungwe forest, volcano hikes, and royal history. Complete 6-day package with accommodation."
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-neutral-400">Recommended: 150–160 characters</p>
                  <p className={`text-xs ${formData.seoDescription.length > 160 ? 'text-red-500' : 'text-neutral-400'}`}>{formData.seoDescription.length}/160</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pb-8">
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-xl hover:from-red-800 hover:to-red-950 font-semibold text-lg transition-all shadow-md"
            >
              Create Tour
            </button>
            <Link href="/tours" className="flex-1 py-3 border-2 border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 font-semibold text-lg text-center transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
