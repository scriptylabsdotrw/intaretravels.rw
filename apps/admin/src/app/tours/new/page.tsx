'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Add New Tour</h1>
            <p className="text-neutral-600">Create a new tour package for the website</p>
          </div>
          <Link href="/tours" className="text-primary-700 hover:underline">
            ← Back to Tours
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Tour Name *</label>
                <input
                  type="text"
                  required
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="7-Day Rwanda Discovery Package"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Slug (URL) *</label>
                <input
                  type="text"
                  required
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="rwanda-discovery-7-days"
                />
                <p className="text-sm text-neutral-500 mt-1">URL-friendly version (lowercase, hyphens)</p>
              </div>

              <div>
                <label className="block font-medium mb-2">Description *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Complete Rwanda experience from Kigali culture to Nyungwe canopy walks..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Price (USD) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="775"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Duration *</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="6 days"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2">Image URL</label>
                <input
                  type="url"
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                />
                <p className="text-sm text-neutral-500 mt-1">Leave empty for default image</p>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-primary-700 rounded focus:ring-2 focus:ring-primary-500"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <span className="font-medium">Featured Tour (show on homepage)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Tour Highlights</h2>
            <p className="text-neutral-600 mb-4">Enter one highlight per line</p>
            <textarea
              rows={6}
              className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              placeholder="Nyungwe Forest canopy walkway&#10;Mount Bisoke crater lake hike&#10;Coffee farm experience with tasting&#10;King's Palace in Nyanza"
            />
          </div>

          {/* What's Included */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">What's Included</h2>
            <p className="text-neutral-600 mb-4">Enter one item per line</p>
            <textarea
              rows={6}
              className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
              value={formData.included}
              onChange={(e) => setFormData({ ...formData, included: e.target.value })}
              placeholder="Accommodation (5 nights at Senita B&B)&#10;All park/museum entries & guide fees&#10;Coffee tour & canopy walk&#10;Private transport for full trip"
            />
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Day-by-Day Itinerary</h2>
                <p className="text-neutral-600">Add activities for each day of the tour</p>
              </div>
              <button
                type="button"
                onClick={addItineraryDay}
                className="bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 text-sm"
              >
                + Add Day
              </button>
            </div>

            <div className="space-y-6">
              {itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Day {day.day}</h3>
                    {itinerary.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItineraryDay(dayIndex)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove Day
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block font-medium mb-2 text-sm">Day Title</label>
                      <input
                        type="text"
                        className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={day.title}
                        onChange={(e) => updateItineraryDay(dayIndex, 'title', e.target.value)}
                        placeholder="Arrival & Welcome to Kigali"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block font-medium text-sm">Activities</label>
                        <button
                          type="button"
                          onClick={() => addActivity(dayIndex)}
                          className="text-primary-700 hover:text-primary-800 text-sm"
                        >
                          + Add Activity
                        </button>
                      </div>
                      <div className="space-y-2">
                        {day.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex gap-2">
                            <input
                              type="text"
                              className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              value={activity}
                              onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value)}
                              placeholder="Airport or city pickup & hotel check-in"
                            />
                            {day.activities.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeActivity(dayIndex, activityIndex)}
                                className="text-red-600 hover:text-red-700 px-3"
                              >
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
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">SEO Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2">SEO Title</label>
                <input
                  type="text"
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="6-Day Rwanda Discovery - Culture, Nature & Adventure"
                />
                <p className="text-sm text-neutral-500 mt-1">Recommended: 50-60 characters</p>
              </div>

              <div>
                <label className="block font-medium mb-2">SEO Description</label>
                <textarea
                  rows={3}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="Explore Rwanda's best: Kigali culture, Nyungwe forest, volcano hikes, and royal history. Complete 6-day package with accommodation."
                />
                <p className="text-sm text-neutral-500 mt-1">Recommended: 150-160 characters</p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 font-medium text-lg"
            >
              Create Tour
            </button>
            <Link
              href="/tours"
              className="border-2 border-neutral-300 px-8 py-4 rounded-lg hover:bg-neutral-50 font-medium text-lg inline-block"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
