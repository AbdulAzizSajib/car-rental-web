'use client';

import { Users, Car, CalendarCheck, DollarSign, ShieldCheck } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '1,248', icon: Users, change: '+12%' },
  { label: 'Total Vehicles', value: '342', icon: Car, change: '+5%' },
  { label: 'Active Bookings', value: '87', icon: CalendarCheck, change: '+18%' },
  { label: 'Revenue (Month)', value: '৳1.2M', icon: DollarSign, change: '+24%' },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen p-8" style={{ background: '#faf8f4' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: '#c9a84c' }}>
            <ShieldCheck size={18} className="text-black" />
          </div>
          <span className="text-[11px] uppercase tracking-[.18em] font-semibold text-gray-500">
            Admin Console
          </span>
        </div>
        <h1 className="font-['Bebas_Neue'] text-4xl tracking-wide text-gray-900 mb-8">
          Admin Dashboard
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
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <p className="text-sm text-gray-500">No recent activity to display.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-[#ede8df]">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              <button className="text-left text-sm px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700">
                Manage users
              </button>
              <button className="text-left text-sm px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700">
                Approve hosts
              </button>
              <button className="text-left text-sm px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700">
                View reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
