'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';

interface Booking {
  id: string;
  type: 'tour' | 'apartment' | 'flight';
  name: string;
  email: string;
  phone: string;
  itemName: string;
  startDate?: string;
  endDate?: string;
  participants?: number;
  departure?: string;
  returnDate?: string;
  passengers?: number;
  amount?: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  message?: string;
}

const empty: Omit<Booking, 'id' | 'createdAt'> = {
  type: 'tour', name: '', email: '', phone: '', itemName: '',
  startDate: '', endDate: '', participants: 1,
  departure: '', returnDate: '', passengers: 1,
  amount: 0, status: 'pending', message: '',
};

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Booking | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      setBookings(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (b: Booking) => {
    setEditing(b);
    setForm({ type: b.type, name: b.name, email: b.email, phone: b.phone, itemName: b.itemName, startDate: b.startDate || '', endDate: b.endDate || '', participants: b.participants || 1, departure: b.departure || '', returnDate: b.returnDate || '', passengers: b.passengers || 1, amount: b.amount || 0, status: b.status, message: b.message || '' });
    setModalOpen(true);
  };
  const closeModal = () => { setModalOpen(false); setEditing(null); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/bookings/${editing.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        setBookings(bookings.map(b => b.id === editing.id ? { ...b, ...form } : b));
      } else {
        const res = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        const created = await res.json();
        setBookings([created, ...bookings]);
      }
      closeModal();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    setBookings(bookings.map(b => b.id === id ? { ...b, status: status as Booking['status'] } : b));
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this booking?')) return;
    await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    setBookings(bookings.filter(b => b.id !== id));
  };

  const filtered = bookings.filter(b =>
    (typeFilter === 'all' || b.type === typeFilter) &&
    (statusFilter === 'all' || b.status === statusFilter)
  );

  const statusStyle: Record<string, string> = {
    confirmed: 'bg-red-100 text-red-800',
    pending: 'bg-neutral-100 text-neutral-700',
    cancelled: 'bg-neutral-200 text-neutral-500',
  };

  const TypeIcon = ({ type }: { type: string }) => {
    if (type === 'tour') return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>;
    if (type === 'apartment') return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
    return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-1">Bookings</h1>
            <p className="text-neutral-600">Manage all customer bookings</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 transition-all shadow-md font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Booking
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {[
            { label: 'Total', value: bookings.length, color: 'text-neutral-900' },
            { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'text-neutral-700' },
            { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'text-red-700' },
            { label: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: 'text-neutral-400' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <p className="text-sm text-neutral-600 mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm flex flex-wrap gap-6">
          <div>
            <p className="text-xs font-medium text-neutral-500 uppercase mb-2">Type</p>
            <div className="flex gap-2">
              {['all', 'tour', 'apartment', 'flight'].map(t => (
                <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${typeFilter === t ? 'bg-gradient-to-r from-red-700 to-red-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-500 uppercase mb-2">Status</p>
            <div className="flex gap-2">
              {['all', 'pending', 'confirmed', 'cancelled'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${statusFilter === s ? 'bg-gradient-to-r from-red-700 to-red-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-700 mb-4"></div>
              <p className="text-neutral-600">Loading bookings...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <p className="text-neutral-500">No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    {['Type', 'Customer', 'Item', 'Details', 'Amount', 'Date', 'Status', 'Actions'].map(h => (
                      <th key={h} className={`px-5 py-4 text-xs font-medium text-neutral-600 uppercase tracking-wider ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filtered.map(b => (
                    <tr key={b.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-red-700 to-red-900 rounded-lg flex items-center justify-center text-white shadow-sm">
                            <TypeIcon type={b.type} />
                          </div>
                          <span className="text-sm font-medium capitalize text-neutral-700">{b.type}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-neutral-900 text-sm">{b.name}</div>
                        <div className="text-xs text-neutral-500">{b.email}</div>
                        <div className="text-xs text-neutral-500">{b.phone}</div>
                      </td>
                      <td className="px-5 py-4 text-sm text-neutral-800">{b.itemName}</td>
                      <td className="px-5 py-4 text-xs text-neutral-600">
                        {b.type === 'tour' && <><div>Start: {b.startDate}</div><div>Guests: {b.participants}</div></>}
                        {b.type === 'apartment' && <><div>Check-in: {b.startDate}</div><div>Check-out: {b.endDate}</div></>}
                        {b.type === 'flight' && <><div>Depart: {b.departure}</div><div>Return: {b.returnDate}</div><div>Pax: {b.passengers}</div></>}
                      </td>
                      <td className="px-5 py-4 font-semibold text-neutral-900 text-sm">{b.amount ? `$${b.amount}` : '—'}</td>
                      <td className="px-5 py-4 text-xs text-neutral-500">{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)} className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusStyle[b.status]}`}>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-5 py-4 text-right space-x-3">
                        <button onClick={() => openEdit(b)} className="text-red-700 hover:text-red-800 font-medium text-sm">Edit</button>
                        <button onClick={() => deleteBooking(b.id)} className="text-neutral-400 hover:text-red-600 font-medium text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-bold text-neutral-900">{editing ? 'Edit Booking' : 'New Booking'}</h2>
              <button onClick={closeModal} className="p-2 hover:bg-neutral-100 rounded-lg">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Booking Type</label>
                  <select name="type" value={form.type} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="tour">Tour</option>
                    <option value="apartment">Apartment</option>
                    <option value="flight">Flight</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Customer Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="+250..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="email@example.com" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">{form.type === 'flight' ? 'Destination' : form.type === 'apartment' ? 'Apartment Name' : 'Tour Name'} *</label>
                  <input name="itemName" value={form.itemName} onChange={handleChange} required className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                {form.type === 'flight' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Departure Date</label>
                      <input name="departure" type="date" value={form.departure} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Return Date</label>
                      <input name="returnDate" type="date" value={form.returnDate} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Passengers</label>
                      <input name="passengers" type="number" min="1" value={form.passengers} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">{form.type === 'apartment' ? 'Check-in' : 'Start Date'}</label>
                      <input name="startDate" type="date" value={form.startDate} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">{form.type === 'apartment' ? 'Check-out' : 'End Date'}</label>
                      <input name="endDate" type="date" value={form.endDate} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">{form.type === 'apartment' ? 'Guests' : 'Participants'}</label>
                      <input name="participants" type="number" min="1" value={form.participants} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Amount (USD)</label>
                  <input name="amount" type="number" min="0" value={form.amount} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
                  <select name="status" value={form.status} onChange={handleChange} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Notes</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none" placeholder="Any special requests or notes..." />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 font-medium disabled:opacity-60">
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
