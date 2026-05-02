'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Booking } from '@/src/types/booking.types';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => Promise<void>;
}

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  PENDING:   { bg: '#fdf3d4', text: '#8a6d10', label: 'Pending' },
  CONFIRMED: { bg: '#dbeafe', text: '#1e40af', label: 'Confirmed' },
  ACTIVE:    { bg: '#dcfce7', text: '#166534', label: 'Active' },
  COMPLETED: { bg: '#e5e7eb', text: '#374151', label: 'Completed' },
  CANCELLED: { bg: '#fee2e2', text: '#991b1b', label: 'Cancelled' },
};

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const sameDay = s.toDateString() === e.toDateString();
  const dateOpts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const timeOpts: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };
  if (sameDay) {
    return `${s.toLocaleDateString('en-US', dateOpts)} · ${s.toLocaleTimeString('en-US', timeOpts)} – ${e.toLocaleTimeString('en-US', timeOpts)}`;
  }
  return `${s.toLocaleDateString('en-US', dateOpts)} – ${e.toLocaleDateString('en-US', dateOpts)}`;
}

function formatDuration(start: string, end: string, rentalType: string): string {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (rentalType === 'PER_HOUR') {
    const hours = Math.round(ms / (1000 * 60 * 60));
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  }
  const days = Math.round(ms / (1000 * 60 * 60 * 24));
  return `${days} day${days === 1 ? '' : 's'}`;
}

export function BookingCard({ booking, onCancel }: BookingCardProps) {
  const [cancelling, setCancelling] = useState(false);
  const { car } = booking;
  const primaryImage = car.images.find((img) => img.isPrimary) ?? car.images[0];
  const status = statusStyles[booking.status] ?? { bg: '#e5e7eb', text: '#374151', label: booking.status };
  const canCancel = booking.status === 'PENDING' || booking.status === 'CONFIRMED';

  async function handleCancel() {
    if (!onCancel || cancelling) return;
    setCancelling(true);
    try {
      await onCancel(booking.id);
    } finally {
      setCancelling(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-48 h-40 sm:h-auto bg-gray-50 shrink-0 flex items-center justify-center p-4">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={car.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
              No image
            </div>
          )}
        </div>

        <div className="flex-1 p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-400 font-mono">
                  {booking.id.slice(0, 8).toUpperCase()}
                </span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: status.bg, color: status.text }}
                >
                  {status.label}
                </span>
              </div>
              <h3 className="font-semibold text-base text-gray-900 truncate">
                {car.name}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {car.transmission} · {car.seats} seats · {car.isAC ? 'AC' : 'No AC'}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-gray-400">Total</p>
              <p className="text-lg font-semibold text-gray-900">
                ${booking.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-400 shrink-0" />
              <span className="truncate">
                {formatDateRange(booking.startDate, booking.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-gray-400 shrink-0" />
              <span className="truncate">
                {formatDuration(booking.startDate, booking.endDate, car.rentalType)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gray-400 shrink-0" />
              <span className="truncate">{booking.pickupLocation}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
              View details
            </button>
            {canCancel && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="text-sm font-medium px-4 py-2 rounded-full text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelling ? 'Cancelling…' : 'Cancel'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
