'use client';

import { useMemo, useState } from 'react';
import { CalendarCheck } from 'lucide-react';
import { BookingCard } from '@/src/components/booking-card';
import { Booking } from '@/src/types/booking.types';
import { cancelBookingAction } from '@/src/services/bookings/cancelBooking.action';

type Tab = 'ALL' | 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

const tabs: { value: Tab; label: string }[] = [
  { value: 'ALL',       label: 'All' },
  { value: 'PENDING',   label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'ACTIVE',    label: 'Active' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export default function BookingsClient({ bookings: initial, error }: { bookings: Booking[]; error?: string | null }) {
  const [bookings, setBookings] = useState<Booking[]>(initial);
  const [activeTab, setActiveTab] = useState<Tab>('ALL');

  async function handleCancel(id: string) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    // optimistic update
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' } : b))
    );
    try {
      await cancelBookingAction(id);
    } catch {
      // revert on failure
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: initial.find((x) => x.id === id)?.status ?? b.status } : b))
      );
    }
  }

  const filtered = useMemo(
    () => (activeTab === 'ALL' ? bookings : bookings.filter((b) => b.status === activeTab)),
    [activeTab, bookings]
  );

  const counts = useMemo(() => {
    const c: Record<Tab, number> = {
      ALL: bookings.length,
      PENDING: 0,
      CONFIRMED: 0,
      ACTIVE: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    };
    for (const b of bookings) {
      if (b.status in c) c[b.status as Tab]++;
    }
    return c;
  }, [bookings]);

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
        {error && (
          <div className="max-w-4xl mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            Failed to load bookings: {error}
          </div>
        )}
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
              <BookingCard key={booking.id} booking={booking} onCancel={handleCancel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
