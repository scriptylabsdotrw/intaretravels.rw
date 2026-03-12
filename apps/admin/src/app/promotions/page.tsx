'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';

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
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await fetch('/api/promotions');
      const data = await response.json();
      setPromotions(data);
    } catch (error) {
      console.error('Failed to fetch promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/promotions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentStatus }),
      });
      setPromotions(promotions.map(p => p.id === id ? { ...p, active: !currentStatus } : p));
    } catch (error) {
      console.error('Failed to update promotion:', error);
    }
  };

  const deletePromotion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this promotion?')) return;
    
    try {
      await fetch(`/api/promotions/${id}`, { method: 'DELETE' });
      setPromotions(promotions.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete promotion:', error);
    }
  };

  const filteredPromotions = promotions.filter(promo => {
    if (filter === 'all') return true;
    if (filter === 'active') return promo.active;
    if (filter === 'inactive') return !promo.active;
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Flight Promotions</h1>
            <p className="text-neutral-600">Manage flight deals and special offers</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 transition-all shadow-md font-medium">
            Add New Promotion
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <p className="text-sm font-medium text-neutral-600 mb-2">Total Promotions</p>
            <p className="text-3xl font-bold text-neutral-900">{promotions.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <p className="text-sm font-medium text-neutral-600 mb-2">Active Deals</p>
            <p className="text-3xl font-bold text-green-600">
              {promotions.filter(p => p.active).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <p className="text-sm font-medium text-neutral-600 mb-2">Inactive</p>
            <p className="text-3xl font-bold text-neutral-400">
              {promotions.filter(p => !p.active).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-gradient-to-r from-red-700 to-red-900 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Promotions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
              <p className="mt-4 text-neutral-600">Loading promotions...</p>
            </div>
          ) : filteredPromotions.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No promotions found</h3>
              <p className="text-neutral-600">Create your first flight promotion to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Airline
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Valid Until
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
                  {filteredPromotions.map((promo) => (
                    <tr key={promo.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-700 to-red-900 rounded-lg flex items-center justify-center text-white shadow-md">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </div>
                          <span className="font-medium text-neutral-900">{promo.destination}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-neutral-700">{promo.airline}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-neutral-900">${promo.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {promo.discount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-neutral-700">{promo.validUntil}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleActive(promo.id, promo.active)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            promo.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-neutral-100 text-neutral-800'
                          }`}
                        >
                          {promo.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deletePromotion(promo.id)}
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
