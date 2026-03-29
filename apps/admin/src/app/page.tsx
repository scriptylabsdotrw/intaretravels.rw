'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminLayout } from '../components/AdminLayout';

export default function AdminDashboard() {
  const [dateFilter, setDateFilter] = useState('7days');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock data
  const stats = [
    { label: 'Total Bookings', value: '156', change: '+12%', trend: 'up', color: 'bg-gradient-to-br from-red-700 to-red-900' },
    { label: 'Revenue', value: '$45,280', change: '+8%', trend: 'up', color: 'bg-gradient-to-br from-red-700 to-red-900' },
    { label: 'Active Tours', value: '11', change: '+2', trend: 'up', color: 'bg-gradient-to-br from-red-700 to-red-900' },
    { label: 'Pending Bookings', value: '23', change: '-5%', trend: 'down', color: 'bg-gradient-to-br from-red-700 to-red-900' },
  ];

  const bookingsByType = [
    { type: 'Tours', count: 89, percentage: 57, color: 'bg-red-700' },
    { type: 'Flights', count: 45, percentage: 29, color: 'bg-red-400' },
    { type: 'Apartments', count: 22, percentage: 14, color: 'bg-neutral-400' },
  ];

  const topTours = [
    { name: '7-Day Zambia Victoria Falls', bookings: 34, revenue: '$97,920', trend: 'up' },
    { name: '6-Day Rwanda Discovery', bookings: 28, revenue: '$21,700', trend: 'up' },
    { name: 'Gorilla Trekking - Volcanoes', bookings: 15, revenue: '$32,175', trend: 'up' },
    { name: '7-Day Angola Adventure', bookings: 12, revenue: '$23,100', trend: 'down' },
  ];

  const topFlights = [
    { destination: 'Dubai', bookings: 18, revenue: '$10,782', airline: 'Qatar Airways' },
    { destination: 'Johannesburg', bookings: 12, revenue: '$3,588', airline: 'Kenya Airways' },
    { destination: 'Nairobi', bookings: 9, revenue: '$1,791', airline: 'RwandAir' },
    { destination: 'Lagos', bookings: 6, revenue: '$2,094', airline: 'Ethiopian Airlines' },
  ];

  const recentBookings = [
    { id: '1', customer: 'John Doe', type: 'Tour', item: 'Rwanda Discovery', amount: '$775', status: 'confirmed', time: '2 hours ago' },
    { id: '2', customer: 'Jane Smith', type: 'Flight', item: 'Dubai', amount: '$599', status: 'pending', time: '4 hours ago' },
    { id: '3', customer: 'Mike Johnson', type: 'Tour', item: 'Zambia Falls', amount: '$2,880', status: 'confirmed', time: '6 hours ago' },
    { id: '4', customer: 'Sarah Williams', type: 'Apartment', item: 'Kigali Heights', amount: '$120', status: 'pending', time: '8 hours ago' },
    { id: '5', customer: 'David Brown', type: 'Tour', item: 'Gorilla Trekking', amount: '$2,145', status: 'confirmed', time: '1 day ago' },
  ];

  const bookingStatusData = [
    { status: 'Confirmed', count: 98, percentage: 63 },
    { status: 'Pending', count: 23, percentage: 15 },
    { status: 'Cancelled', count: 35, percentage: 22 },
  ];

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <AdminLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard</h1>
              <p className="text-neutral-600">Welcome back! Here's your business overview.</p>
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
      <div className="space-y-8">
        {/* Page Header with Filters */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard</h1>
            <p className="text-neutral-600">Welcome back! Here's your business overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>
            <button className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-lg hover:from-red-800 hover:to-red-950 transition-all shadow-md font-medium">
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-neutral-600">{stat.label}</p>
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center shadow-md`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-neutral-900 mb-2">{stat.value}</p>
              <div className="flex items-center gap-2">
                <span className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? (
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                  {stat.change}
                </span>
                <span className="text-sm text-neutral-500">vs last period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bookings by Type - Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Bookings by Type</h2>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                {/* Simple pie chart representation */}
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#b91c1c" 
                    strokeWidth="20"
                    strokeDasharray={`${bookingsByType[0].percentage * 2.51} ${251 - bookingsByType[0].percentage * 2.51}`}
                  />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#f87171" 
                    strokeWidth="20"
                    strokeDasharray={`${bookingsByType[1].percentage * 2.51} ${251 - bookingsByType[1].percentage * 2.51}`}
                    strokeDashoffset={-bookingsByType[0].percentage * 2.51}
                  />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#a3a3a3" 
                    strokeWidth="20"
                    strokeDasharray={`${bookingsByType[2].percentage * 2.51} ${251 - bookingsByType[2].percentage * 2.51}`}
                    strokeDashoffset={-(bookingsByType[0].percentage + bookingsByType[1].percentage) * 2.51}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-neutral-900">156</p>
                    <p className="text-sm text-neutral-600">Total</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {bookingsByType.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${item.color} rounded`}></div>
                    <span className="text-sm font-medium text-neutral-700">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-neutral-600">{item.count} bookings</span>
                    <span className="text-sm font-bold text-neutral-900">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Status */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Booking Status</h2>
            <div className="space-y-6">
              {bookingStatusData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-700">{item.status}</span>
                    <span className="text-sm font-bold text-neutral-900">{item.count}</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        item.status === 'Confirmed' ? 'bg-gradient-to-r from-red-700 to-red-900' :
                        item.status === 'Pending' ? 'bg-red-300' : 'bg-neutral-400'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">{item.percentage}% of total bookings</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <Link href="/bookings" className="text-red-700 hover:text-red-800 font-medium text-sm flex items-center justify-center gap-2">
                View All Bookings
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Top Performers Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Most Booked Tours */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">Most Booked Tours</h2>
              <Link href="/tours" className="text-sm text-red-700 hover:text-red-800 font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {topTours.map((tour, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-700 to-red-900 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-lg font-bold text-white">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{tour.name}</p>
                      <p className="text-sm text-neutral-600">{tour.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-neutral-900">{tour.revenue}</p>
                    <span className={`text-xs ${tour.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {tour.trend === 'up' ? '↑' : '↓'} Trending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Flight Destinations */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">Top Flight Destinations</h2>
              <Link href="/promotions" className="text-sm text-red-700 hover:text-red-800 font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {topFlights.map((flight, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-700 to-red-900 rounded-lg flex items-center justify-center shadow-md">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{flight.destination}</p>
                      <p className="text-sm text-neutral-600">{flight.airline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-neutral-900">{flight.revenue}</p>
                    <p className="text-xs text-neutral-600">{flight.bookings} bookings</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900">Recent Bookings</h2>
            <Link href="/bookings" className="text-sm text-red-700 hover:text-red-800 font-medium">
              View All Bookings
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-4 text-sm font-medium text-neutral-900">{booking.customer}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                        {booking.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-neutral-700">{booking.item}</td>
                    <td className="px-4 py-4 text-sm font-medium text-neutral-900">{booking.amount}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-red-100 text-red-800' : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-neutral-500">{booking.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
