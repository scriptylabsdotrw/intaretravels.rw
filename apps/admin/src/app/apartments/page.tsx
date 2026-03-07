'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Apartment {
  id: string;
  name: string;
  pricePerNight: number;
  bedrooms: number;
  featured: boolean;
}

export default function ApartmentsManagement() {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    fetch('/api/apartments')
      .then(res => res.json())
      .then(data => setApartments(data))
      .catch(console.error);
  }, []);

  const deleteApartment = async (id: string) => {
    if (!confirm('Delete this apartment?')) return;
    await fetch(`/api/apartments/${id}`, { method: 'DELETE' });
    setApartments(apartments.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Apartments Management</h1>
          <Link 
            href="/apartments/new"
            className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800"
          >
            Add New Apartment
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-100">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Price/Night</th>
                <th className="px-6 py-3 text-left">Bedrooms</th>
                <th className="px-6 py-3 text-left">Featured</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apt) => (
                <tr key={apt.id} className="border-t">
                  <td className="px-6 py-4">{apt.name}</td>
                  <td className="px-6 py-4">${apt.pricePerNight}</td>
                  <td className="px-6 py-4">{apt.bedrooms}</td>
                  <td className="px-6 py-4">{apt.featured ? '✓' : ''}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link 
                      href={`/apartments/${apt.id}/edit`}
                      className="text-primary-700 hover:underline"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => deleteApartment(apt.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
