import { carsData, Car } from './car-data';

export type BookingStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export type RentalType = 'hourly' | 'daily';

export interface Booking {
  id: string;
  carId: number;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  rentalType: RentalType;
  totalPrice: number;
  status: BookingStatus;
}

export const bookingsData: Booking[] = [
  {
    id: 'BK-1042',
    carId: 1,
    startDate: '2026-05-04T09:00:00',
    endDate: '2026-05-07T18:00:00',
    pickupLocation: '450 Mission St, San Francisco',
    rentalType: 'daily',
    totalPrice: 360,
    status: 'upcoming',
  },
  {
    id: 'BK-1039',
    carId: 4,
    startDate: '2026-04-27T08:00:00',
    endDate: '2026-04-29T20:00:00',
    pickupLocation: '1200 Market St, San Francisco',
    rentalType: 'daily',
    totalPrice: 240,
    status: 'active',
  },
  {
    id: 'BK-1031',
    carId: 7,
    startDate: '2026-04-18T10:00:00',
    endDate: '2026-04-18T16:00:00',
    pickupLocation: 'SFO Airport, Terminal 2',
    rentalType: 'hourly',
    totalPrice: 158.4,
    status: 'completed',
  },
  {
    id: 'BK-1024',
    carId: 2,
    startDate: '2026-04-10T14:00:00',
    endDate: '2026-04-12T14:00:00',
    pickupLocation: 'Embarcadero Center, San Francisco',
    rentalType: 'daily',
    totalPrice: 220,
    status: 'completed',
  },
  {
    id: 'BK-1018',
    carId: 9,
    startDate: '2026-04-02T11:00:00',
    endDate: '2026-04-02T15:00:00',
    pickupLocation: 'Union Square, San Francisco',
    rentalType: 'hourly',
    totalPrice: 96,
    status: 'cancelled',
  },
];

export function getCarById(carId: number): Car | undefined {
  return carsData.find((c) => c.id === carId);
}

export function filterBookings(
  bookings: Booking[],
  status: BookingStatus | 'all'
): Booking[] {
  if (status === 'all') return bookings;
  return bookings.filter((b) => b.status === status);
}
