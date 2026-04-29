'use client';

import { Calendar, MapPin, Clock } from 'lucide-react';
import { Booking, BookingStatus, getCarById } from '@/src/lib/booking-data';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (bookingId: string) => void;
  onView?: (bookingId: string) => void;
}

const statusStyles: Record<BookingStatus, { bg: string; text: string; label: string }> = {
  upcoming: { bg: '#fdf3d4', text: '#8a6d10', label: 'Upcoming' },
  active: { bg: '#dcfce7', text: '#166534', label: 'Active' },
  completed: { bg: '#e5e7eb', text: '#374151', label: 'Completed' },
  cancelled: { bg: '#fee2e2', text: '#991b1b', label: 'Cancelled' },
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

function formatDuration(start: string, end: string, rentalType: 'hourly' | 'daily'): string {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (rentalType === 'hourly') {
    const hours = Math.round(ms / (1000 * 60 * 60));
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  }
  const days = Math.round(ms / (1000 * 60 * 60 * 24));
  return `${days} day${days === 1 ? '' : 's'}`;
}

export function BookingCard({ booking, onCancel, onView }: BookingCardProps) {
  const car = getCarById(booking.carId);
  if (!car) return null;

  const status = statusStyles[booking.status];
  const canCancel = booking.status === 'upcoming';

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-48 h-40 sm:h-auto bg-gray-50 shrink-0 flex items-center justify-center p-4">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-400 font-mono">{booking.id}</span>
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
              <p className="text-xs text-gray-500 truncate">{car.model}</p>
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
                {formatDuration(booking.startDate, booking.endDate, booking.rentalType)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gray-400 shrink-0" />
              <span className="truncate">{booking.pickupLocation}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onView?.(booking.id)}
              className="text-sm font-medium px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View details
            </button>
            {canCancel && (
              <button
                onClick={() => onCancel?.(booking.id)}
                className="text-sm font-medium px-4 py-2 rounded-full text-red-600 hover:bg-red-50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
