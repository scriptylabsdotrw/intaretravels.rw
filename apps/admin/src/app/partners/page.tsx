'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { NoSSR } from '../../components/NoSSR';
import Image from 'next/image';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  active: boolean;
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/partners');
      const data = await response.json();
      setPartners(data);
    } catch (error) {
      console.error('Failed to fetch partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    try {
      await fetch(`/api/partners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      });
      
      setPartners(partners.map(p => 
        p.id === id ? { ...p, active: !active } : p
      ));
    } catch (error) {
      console.error('Failed to update partner:', error);
    }
  };

  const deletePartner = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;
    
    try {
      await fetch(`/api/partners/${id}`, { method: 'DELETE' });
      setPartners(partners.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete partner:', error);
    }
  };

  const filteredPartners = partners.filter(partner => {
    if (filter === 'all') return true;
    if (filter === 'active') return partner.active;
    if (filter === 'inactive') return !partner.active;
    return true;
  });

  return (
    <NoSSR>
      <AdminLayout>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Airline Partners</h1>
              <p className="text-neutral-600">Manage your airline partnerships and collaborations</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 transition-all shadow-md font-medium">
              Add New Partner
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <p className="text-sm font-medium text-neutral-600 mb-2">Total Partners</p>
              <p className="text-3xl font-bold text-neutral-900">{partners.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <p className="text-sm font-medium text-neutral-600 mb-2">Active Partners</p>
              <p className="text-3xl font-bold text-green-600">
                {partners.filter(p => p.active).length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <p className="text-sm font-medium text-neutral-600 mb-2">Inactive</p>
              <p className="text-3xl font-bold text-neutral-400">
                {partners.filter(p => !p.active).length}
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

          {/* Partners Grid */}
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
              <p className="mt-4 text-neutral-600">Loading partners...</p>
            </div>
          ) : filteredPartners.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
              <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No partners found</h3>
              <p className="text-neutral-600">Add your first airline partner to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartners.map((partner) => (
                <div key={partner.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Logo Section */}
                  <div className="h-32 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-6 border-b border-neutral-200">
                    {partner.logo ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-red-700 to-red-900 rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-neutral-900">{partner.name}</h3>
                      <button
                        onClick={() => toggleActive(partner.id, partner.active)}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          partner.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {partner.active ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                    
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {partner.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-neutral-200">
                      <button
                        onClick={() => toggleActive(partner.id, partner.active)}
                        className="flex-1 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-sm font-medium"
                      >
                        {partner.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => deletePartner(partner.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </NoSSR>
  );
}