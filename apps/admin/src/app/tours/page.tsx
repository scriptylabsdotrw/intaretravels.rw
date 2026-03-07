'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Tour {
  id: string;
  name: string;
  slug: string;
  price: number;
  duration: string;
  featured: boolean;
}

export default function ToursManagement() {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => setTours(data))
      .catch(console.error);
  }, []);

  const deleteTour = async (id: string) => {
    if (!confirm('Delete this tour?')) return;
    
    await fetch(`/api/tours/${id}`, { method: 'DELETE' });
    setTours(tours.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Tours Management</h1>
          <Link 
            href="/tours/new"
            className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800"
          >
            Add New Tour
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-100">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Duration</th>
                <th className="px-6 py-3 text-left">Featured</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id} className="border-t">
                  <td className="px-6 py-4">{tour.name}</td>
                  <td className="px-6 py-4">${tour.price}</td>
                  <td className="px-6 py-4">{tour.duration}</td>
                  <td className="px-6 py-4">
                    {tour.featured ? '✓' : ''}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link 
                      href={`/tours/${tour.id}/edit`}
                      className="text-primary-700 hover:underline"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => deleteTour(tour.id)}
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
