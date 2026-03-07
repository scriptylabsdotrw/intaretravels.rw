'use client';

import { useState, useEffect } from 'react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  active: boolean;
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    fetch('/api/partners')
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(console.error);
  }, []);

  const toggleActive = async (id: string, active: boolean) => {
    await fetch(`/api/partners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !active }),
    });
    
    setPartners(partners.map(p => 
      p.id === id ? { ...p, active: !active } : p
    ));
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Airline Partners</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="bg-white rounded-lg shadow p-6">
              <div className="h-20 flex items-center justify-center mb-4 bg-neutral-50 rounded">
                <span className="text-2xl">{partner.name}</span>
              </div>
              <h3 className="font-bold mb-2">{partner.name}</h3>
              <p className="text-neutral-600 text-sm mb-4">{partner.description}</p>
              <button
                onClick={() => toggleActive(partner.id, partner.active)}
                className={`w-full py-2 rounded-lg ${
                  partner.active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                {partner.active ? 'Active' : 'Inactive'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
