'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayout } from '../../components/AdminLayout';

interface Apartment {
  id: string;
  name: string;
  slug: string;
  description: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  address: string;
  amenities: string[];
  image: string;
  featured: boolean;
}

const emptyApartment: Omit<Apartment, 'id'> = {
  name: '', slug: '', description: '', pricePerNight: 0,
  bedrooms: 1, bathrooms: 1, maxGuests: 2,
  address: '', amenities: [], image: '', featured: false,
};

export default function ApartmentsManagement() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Apartment | null>(null);
  const [form, setForm] = useState(emptyApartment);
  const [saving, setSaving] = useState(false);
  const [amenityInput, setAmenityInput] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      const res = await fetch('/api/apartments');
      setApartments(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyApartment);
    setAmenityInput('');
    setModalOpen(true);
  };

  const openEdit = (apt: Apartment) => {
    setEditing(apt);
    setForm({ ...apt });
    setAmenityInput('');
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditing(null); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addAmenity = () => {
    const val = amenityInput.trim();
    if (val && !form.amenities.includes(val)) {
      setForm(prev => ({ ...prev, amenities: [...prev.amenities, val] }));
    }
    setAmenityInput('');
  };

  const removeAmenity = (a: string) => {
    setForm(prev => ({ ...prev, amenities: prev.amenities.filter(x => x !== a) }));
  };

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setForm(prev => ({ ...prev, name, slug: autoSlug(name) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/apartments/${editing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        setApartments(apartments.map(a => a.id === editing.id ? { ...a, ...form } : a));
      } else {
        const res = await fetch('/api/apartments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const created = await res.json();
        setApartments([...apartments, created]);
      }
      closeModal();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const deleteApartment = async (id: string) => {
    if (!confirm('Delete this apartment?')) return;
    await fetch(`/api/apartments/${id}`, { method: 'DELETE' });
    setApartments(apartments.filter(a => a.id !== id));
  };

  const toggleFeatured = async (apt: Apartment) => {
    await fetch(`/api/apartments/${apt.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !apt.featured }),
    });
    setApartments(apartments.map(a => a.id === apt.id ? { ...a, featured: !a.featured } : a));
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-1">Apartments</h1>
              <p className="text-neutral-600">Manage accommodation listings</p>
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-1">Apartments</h1>
            <p className="text-neutral-600">Manage accommodation listings</p>
          </div>
          <Link href="/apartments/new" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 transition-all shadow-md font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Apartment
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'Total', value: apartments.length },
            { label: 'Featured', value: apartments.filter(a => a.featured).length },
            { label: 'Standard', value: apartments.filter(a => !a.featured).length },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <p className="text-sm text-neutral-600 mb-1">{s.label}</p>
              <p className="text-3xl font-bold text-neutral-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-700 mb-4"></div>
              <p className="text-neutral-600">Loading...</p>
            </div>
          ) : apartments.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <p className="text-neutral-500 mb-4">No apartments yet</p>
              <Link href="/apartments/new" className="px-5 py-2.5 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg font-medium">Add First Apartment</Link>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  {['Property', 'Location', 'Price/Night', 'Rooms', 'Status', 'Actions'].map(h => (
                    <th key={h} className={`px-6 py-4 text-xs font-medium text-neutral-600 uppercase tracking-wider ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {apartments.map(apt => (
                  <tr key={apt.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900">{apt.name}</div>
                      <div className="text-xs text-neutral-400">{apt.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{apt.address}</td>
                    <td className="px-6 py-4 font-semibold text-neutral-900">${apt.pricePerNight}</td>
                    <td className="px-6 py-4 text-sm text-neutral-700">{apt.bedrooms} bed · {apt.bathrooms} bath · {apt.maxGuests} guests</td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleFeatured(apt)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${apt.featured ? 'bg-red-100 text-red-800' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>
                        {apt.featured ? 'Featured' : 'Standard'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button onClick={() => openEdit(apt)} className="text-red-700 hover:text-red-800 font-medium text-sm">Edit</button>
                      <button onClick={() => deleteApartment(apt.id)} className="text-neutral-500 hover:text-red-600 font-medium text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-neutral-900">{editing ? 'Edit Apartment' : 'Add New Apartment'}</h2>
              <button onClick={closeModal} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Property Name *</label>
                  <input name="name" value={form.name} onChange={handleNameChange} required className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="e.g. Kigali Heights Apartment" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Slug</label>
                  <input name="slug" value={form.slug} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-neutral-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Price per Night (USD) *</label>
                  <input name="pricePerNight" type="number" min="0" value={form.pricePerNight} onChange={handleChange} required className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Bedrooms</label>
                  <input name="bedrooms" type="number" min="1" value={form.bedrooms} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Bathrooms</label>
                  <input name="bathrooms" type="number" min="1" value={form.bathrooms} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Max Guests</label>
                  <input name="maxGuests" type="number" min="1" value={form.maxGuests} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Image URL</label>
                  <input name="image" value={form.image} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="https://..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Address</label>
                  <input name="address" value={form.address} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Kigali, Rwanda" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none" placeholder="Describe the apartment..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Amenities</label>
                  <div className="flex gap-2 mb-2">
                    <input value={amenityInput} onChange={e => setAmenityInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addAmenity())} className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="e.g. WiFi, Parking..." />
                    <button type="button" onClick={addAmenity} className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-medium transition-colors">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.amenities.map(a => (
                      <span key={a} className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-800 rounded-full text-sm">
                        {a}
                        <button type="button" onClick={() => removeAmenity(a)} className="hover:text-red-900 font-bold">×</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-3">
                  <div onClick={() => setForm(prev => ({ ...prev, featured: !prev.featured }))} className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${form.featured ? 'border-red-700 bg-red-700' : 'border-neutral-300'}`}>
                    {form.featured && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <label className="text-sm font-medium text-neutral-700 cursor-pointer" onClick={() => setForm(prev => ({ ...prev, featured: !prev.featured }))}>Mark as Featured</label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 font-medium transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 font-medium transition-all disabled:opacity-60">
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Apartment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
