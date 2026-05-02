import { getUserBookingAction } from '@/src/services/bookings/getUserBooking.action';
import { Booking } from '@/src/types/booking.types';
import BookingsClient from './BookingsClient';

export default async function BookingsPage() {
  let bookings: Booking[] = [];
  let error: string | null = null;

  try {
    const res = await getUserBookingAction({ limit: 100 });
    if (Array.isArray(res?.data)) {
      bookings = res.data;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
    console.error('[BookingsPage] fetch error:', err);
  }

  return <BookingsClient bookings={bookings} error={error} />;
}
