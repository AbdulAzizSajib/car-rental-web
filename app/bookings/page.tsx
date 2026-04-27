'use client';

import { useMemo, useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import { BookingCard } from '@/components/booking-card';
import {
  bookingsData,
  filterBookings,
  BookingStatus,
} from '@/lib/booking-data';

type Tab = 'all' | BookingStatus;

const tabs: { value: Tab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filtered = useMemo(
    () => filterBookings(bookingsData, activeTab),
    [activeTab]
  );

  const counts = useMemo(() => {
    return {
      all: bookingsData.length,
      upcoming: bookingsData.filter((b) => b.status === 'upcoming').length,
      active: bookingsData.filter((b) => b.status === 'active').length,
      completed: bookingsData.filter((b) => b.status === 'completed').length,
      cancelled: bookingsData.filter((b) => b.status === 'cancelled').length,
    };
  }, []);

  return (
    <div style={{ background: '#faf8f4' }} className="min-h-screen">
      <div className="px-6 py-6 bg-white border-b border-[#ede8df]">
        <h1 className="text-xl font-semibold text-gray-900">My Bookings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your reservations, view details, or cancel upcoming trips.
        </p>
      </div>

      <div className="px-6 pt-4 bg-white border-b border-[#ede8df]">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const active = tab.value === activeTab;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  active
                    ? 'border-[#c9a84c] text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
                <span
                  className={`ml-1.5 text-xs ${
                    active ? 'text-[#c9a84c]' : 'text-gray-400'
                  }`}
                >
                  {counts[tab.value]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 py-6">
        {filtered.length === 0 ? (
          <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-xl p-10 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <CalendarCheck size={22} className="text-gray-700" />
            </div>
            <h2 className="text-base font-semibold text-gray-900 mb-1">
              No bookings here yet
            </h2>
            <p className="text-sm text-gray-600">
              When you reserve a vehicle, it will show up in this list.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-w-4xl">
            {filtered.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
