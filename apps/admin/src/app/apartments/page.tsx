'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayout } from '../../components/AdminLayout';

interface Apartment {
  id: string;
  name: string;
  slug: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  featured: boolean;
}

export default function ApartmentsManagement() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/apartments')
      .then(res => res.json())
      .then(data => {
        setApartments(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const deleteApartment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this apartment?')) return;
    
    await fetch(`/api/apartments/${id}`, { method: 'DELETE' });
    setApartments(apartments.filter(a => a.id !== id));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Apartments Management</h1>
            <p className="text-neutral-600">Manage accommodation listings and properties</p>
          </div>
          <Link 
            href="/apartments/new"
            className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Apartment
          </Link>
        </div>

        {/* Apartments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700"></div>
              <p className="mt-4 text-neutral-600">Loading apartments...</p>
            </div>
          ) : apartments.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No apartments yet</h3>
              <p className="text-neutral-600 mb-6">Get started by adding your first accommodation listing</p>
              <Link 
                href="/apartments/new"
                className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add First Apartment
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Property Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Price/Night
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Rooms
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {apartments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-neutral-900">{apt.name}</div>
                            <div className="text-sm text-neutral-500">{apt.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-neutral-700 text-sm">{apt.address}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-neutral-900">${apt.pricePerNight}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 text-sm text-neutral-700">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {apt.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                            {apt.bathrooms}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {apt.featured ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            Featured
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                            Standard
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <Link 
                          href={`/apartments/${apt.id}/edit`}
                          className="text-primary-700 hover:text-primary-800 font-medium text-sm"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => deleteApartment(apt.id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
