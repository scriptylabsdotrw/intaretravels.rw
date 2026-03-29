'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminLayout } from '../../../components/AdminLayout';

export default function NewApartment() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [amenityInput, setAmenityInput] = useState('');
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    name: '', slug: '', description: '',
    pricePerNight: '', currency: 'USD',
    bedrooms: '1', bathrooms: '1', maxGuests: '2',
    address: '', image: '', featured: false,
    seoTitle: '', seoDescription: '',
    amenities: [] as string[],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setForm(prev => ({ ...prev, name, slug: autoSlug(name) }));
  };

  const set = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const addAmenity = () => {
    const val = amenityInput.trim();
    if (val && !form.amenities.includes(val)) {
      setForm(prev => ({ ...prev, amenities: [...prev.amenities, val] }));
    }
    setAmenityInput('');
  };

  const removeAmenity = (a: string) =>
    setForm(prev => ({ ...prev, amenities: prev.amenities.filter(x => x !== a) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        pricePerNight: parseFloat(form.pricePerNight) || 0,
        bedrooms: parseInt(form.bedrooms) || 1,
        bathrooms: parseInt(form.bathrooms) || 1,
        maxGuests: parseInt(form.maxGuests) || 2,
        image: form.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800',
      };
      const res = await fetch('/api/apartments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) router.push('/apartments');
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-1">Add New Apartment</h1>
              <p className="text-neutral-600">Create a new accommodation listing</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-700 mb-4"></div>
              <p className="text-neutral-600">Loading...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-1">Add New Apartment</h1>
            <p className="text-neutral-600">Create a new accommodation listing</p>
          </div>
          <Link href="/apartments" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Apartments
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-5 pb-3 border-b border-neutral-100">Basic Information</h2>
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Property Name *</label>
                <input
                  type="text" required value={form.name} onChange={handleNameChange}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g. Kigali Heights Luxury Apartment"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Slug (URL) *</label>
                <input
                  type="text" required value={form.slug} onChange={e => set('slug', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-neutral-50"
                  placeholder="kigali-heights-luxury-apartment"
                />
                <p className="text-xs text-neutral-400 mt-1">Auto-generated from name</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Price per Night (USD) *</label>
                <input
                  type="number" required min="0" step="0.01" value={form.pricePerNight}
                  onChange={e => set('pricePerNight', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Bedrooms</label>
                <input
                  type="number" min="1" value={form.bedrooms} onChange={e => set('bedrooms', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Bathrooms</label>
                <input
                  type="number" min="1" value={form.bathrooms} onChange={e => set('bathrooms', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Max Guests</label>
                <input
                  type="number" min="1" value={form.maxGuests} onChange={e => set('maxGuests', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Address / Location</label>
                <input
                  type="text" value={form.address} onChange={e => set('address', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Kicukiro - Niboye, Kigali, Rwanda"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description *</label>
                <textarea
                  required rows={4} value={form.description} onChange={e => set('description', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Describe the apartment, its surroundings, and what makes it special..."
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Image URL</label>
                <input
                  type="url" value={form.image} onChange={e => set('image', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="https://images.unsplash.com/..."
                />
                <p className="text-xs text-neutral-400 mt-1">Leave empty to use a default image</p>
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <div
                  onClick={() => set('featured', !form.featured)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${form.featured ? 'border-red-700 bg-red-700' : 'border-neutral-300 bg-white'}`}
                >
                  {form.featured && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium text-neutral-700 cursor-pointer" onClick={() => set('featured', !form.featured)}>
                  Mark as Featured (shown on homepage)
                </span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-1">Amenities</h2>
            <p className="text-sm text-neutral-500 mb-5">Add features and facilities available in this apartment</p>
            <div className="flex gap-2 mb-4">
              <input
                type="text" value={amenityInput}
                onChange={e => setAmenityInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="e.g. WiFi, Parking, Air conditioning, Kitchen..."
              />
              <button type="button" onClick={addAmenity} className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">
                Add
              </button>
            </div>
            {form.amenities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {form.amenities.map(a => (
                  <span key={a} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-800 rounded-full text-sm font-medium">
                    {a}
                    <button type="button" onClick={() => removeAmenity(a)} className="hover:text-red-900 font-bold leading-none">×</button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-400 italic">No amenities added yet. Type above and press Enter or click Add.</p>
            )}
            <div className="mt-4 pt-4 border-t border-neutral-100">
              <p className="text-xs text-neutral-500 mb-2">Common amenities:</p>
              <div className="flex flex-wrap gap-2">
                {['WiFi', 'Parking', 'Kitchen', 'Air conditioning', 'TV', 'Washing machine', 'City view', 'Pool', 'Gym', 'Security'].map(a => (
                  <button
                    key={a} type="button"
                    onClick={() => { if (!form.amenities.includes(a)) setForm(prev => ({ ...prev, amenities: [...prev.amenities, a] })); }}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${form.amenities.includes(a) ? 'bg-red-100 border-red-300 text-red-700' : 'border-neutral-200 text-neutral-600 hover:border-red-300 hover:text-red-700'}`}
                  >
                    {form.amenities.includes(a) ? '✓ ' : '+ '}{a}
                  </button>
                ))}
              </div>
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
                  type="text" value={form.seoTitle} onChange={e => set('seoTitle', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Luxury Apartment in Kigali - Intare Travels"
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-neutral-400">Recommended: 50–60 characters</p>
                  <p className={`text-xs ${form.seoTitle.length > 60 ? 'text-red-500' : 'text-neutral-400'}`}>{form.seoTitle.length}/60</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">SEO Description</label>
                <textarea
                  rows={3} value={form.seoDescription} onChange={e => set('seoDescription', e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Stay in our premium apartment with modern amenities in central Kigali..."
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-neutral-400">Recommended: 150–160 characters</p>
                  <p className={`text-xs ${form.seoDescription.length > 160 ? 'text-red-500' : 'text-neutral-400'}`}>{form.seoDescription.length}/160</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pb-8">
            <button
              type="submit" disabled={saving}
              className="flex-1 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-xl hover:from-red-800 hover:to-red-950 font-semibold text-lg transition-all shadow-md disabled:opacity-60"
            >
              {saving ? 'Creating...' : 'Create Apartment'}
            </button>
            <Link href="/apartments" className="flex-1 py-3 border-2 border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 font-semibold text-lg text-center transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
