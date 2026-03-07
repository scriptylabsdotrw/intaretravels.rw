'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Promotion {
  id: string;
  destination: string;
  price: number;
  discount: string;
  airline: string;
  validUntil: string;
  active: boolean;
}

export default function PromotionsManagement() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    fetch('/api/promotions')
      .then(res => res.json())
      .then(data => setPromotions(data))
      .catch(console.error);
  }, []);

  const deletePromotion = async (id: string) => {
    if (!confirm('Delete this promotion?')) return;
    await fetch(`/api/promotions/${id}`, { method: 'DELETE' });
    setPromotions(promotions.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Flight Promotions</h1>
          <Link 
            href="/promotions/new"
            className="bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800"
          >
            Add New Promotion
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-100">
              <tr>
                <th className="px-6 py-3 text-left">Destination</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Discount</th>
                <th className="px-6 py-3 text-left">Airline</th>
                <th className="px-6 py-3 text-left">Valid Until</th>
                <th className="px-6 py-3 text-left">Active</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promo) => (
                <tr key={promo.id} className="border-t">
                  <td className="px-6 py-4">{promo.destination}</td>
                  <td className="px-6 py-4">${promo.price}</td>
                  <td className="px-6 py-4">{promo.discount}</td>
                  <td className="px-6 py-4">{promo.airline}</td>
                  <td className="px-6 py-4">{promo.validUntil}</td>
                  <td className="px-6 py-4">{promo.active ? '✓' : ''}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => deletePromotion(promo.id)}
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
