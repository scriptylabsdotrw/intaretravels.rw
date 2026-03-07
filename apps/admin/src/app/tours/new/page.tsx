'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewTour() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    duration: '',
    highlights: '',
    included: '',
    featured: false,
    seoTitle: '',
    seoDescription: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tour = {
      ...formData,
      price: parseFloat(formData.price),
      currency: 'USD',
      image: `/tours/${formData.slug}.jpg`,
      highlights: formData.highlights.split('\n').filter(Boolean),
      included: formData.included.split('\n').filter(Boolean),
    };

    await fetch('/api/tours', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tour),
    });

    router.push('/tours');
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Add New Tour</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 space-y-6">
          <div>
            <label className="block font-medium mb-2">Tour Name</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-4 py-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Slug (URL)</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-4 py-2"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="kigali-city-tour"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              required
              rows={4}
              className="w-full border rounded-lg px-4 py-2"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Price (USD)</label>
              <input
                type="number"
                required
                className="w-full border rounded-lg px-4 py-2"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Duration</label>
              <input
                type="text"
                required
                className="w-full border rounded-lg px-4 py-2"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="3 days"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Highlights (one per line)</label>
            <textarea
              rows={4}
              className="w-full border rounded-lg px-4 py-2"
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Included (one per line)</label>
            <textarea
              rows={4}
              className="w-full border rounded-lg px-4 py-2"
              value={formData.included}
              onChange={(e) => setFormData({ ...formData, included: e.target.value })}
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              Featured on homepage
            </label>
          </div>

          <div>
            <label className="block font-medium mb-2">SEO Title</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2"
              value={formData.seoTitle}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">SEO Description</label>
            <textarea
              rows={3}
              className="w-full border rounded-lg px-4 py-2"
              value={formData.seoDescription}
              onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-primary-700 text-white px-8 py-3 rounded-lg hover:bg-primary-800"
            >
              Create Tour
            </button>
            <button
              type="button"
              onClick={() => router.push('/tours')}
              className="border border-neutral-300 px-8 py-3 rounded-lg hover:bg-neutral-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
