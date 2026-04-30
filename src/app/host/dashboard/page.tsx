'use client';

import { Car, CalendarCheck, DollarSign, Star, Briefcase } from 'lucide-react';

const stats = [
  { label: 'My Vehicles', value: '8', icon: Car, change: '+1' },
  { label: 'Active Bookings', value: '14', icon: CalendarCheck, change: '+3' },
  { label: 'Earnings (Month)', value: '৳86K', icon: DollarSign, change: '+12%' },
  { label: 'Rating', value: '4.8', icon: Star, change: '0.1' },
];

export default function HostDashboardPage() {
  return (
    <div className="min-h-screen p-8" style={{ background: '#faf8f4' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: '#c9a84c' }}>
            <Briefcase size={18} className="text-black" />
          </div>
          <span className="text-[11px] uppercase tracking-[.18em] font-semibold text-gray-500">
            Host Console
          </span>
        </div>
        <h1 className="font-['Bebas_Neue'] text-4xl tracking-wide text-gray-900 mb-8">
          Host Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-xl p-5 border border-[#ede8df]">
                <div className="flex items-center justify-between mb-3">
                  <Icon size={18} className="text-gray-400" />
                  <span className="text-[10px] font-semibold text-green-600">{s.change}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-[#ede8df]">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Upcoming Bookings</h2>
            <p className="text-sm text-gray-500">No upcoming bookings yet.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#ede8df]">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              <button className="text-left text-sm px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700">
                Add new vehicle
              </button>
              <button className="text-left text-sm px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700">
                Manage availability
              </button>
              <button className="text-left text-sm px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700">
                View earnings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
