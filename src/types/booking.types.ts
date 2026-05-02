// For the car object INSIDE bookings (normalized - just IDs)
export interface BookingCar {
  id: string;
  name: string;
  brandId: string; // Just ID, not object
  modelId: string; // Just ID, not object
  bodyTypeId: string; // Just ID, not object
  fuelTypeId: string; // Just ID, not object
  year: number;
  pricePerDay: number;
  rentalType: "ANY" | "PER_DAY" | "PER_HOUR";
  seats: number;
  transmission: "AUTOMATIC" | "MANUAL";
  mileage: number;
  engineCapacity: number | null;
  color: string | null;
  registrationNo: string | null;
  location: string;
  isAC: boolean;
  isWithDriver: boolean;
  hostId: string | null;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  images: { id: string; url: string; carId: string; isPrimary: boolean }[];
}

// For the booking itself
export interface Booking {
  id: string;
  userId: string;
  carId: string;
  driverId: string | null;
  pickupLocation: string;
  dropLocation: string;
  startDate: string;
  endDate: string;
  basePrice: number;
  serviceFee: number;
  totalPrice: number;
  status: string;
  tripType: string;
  contactNumber: string;
  specialRequest: string | null;
  createdAt: string;
  updatedAt: string;
  car: BookingCar;
  driver: null | any; // Define if you have driver objects
}

// For the full API response
export interface BookingsResponse {
  success: boolean;
  message: string;
  data: Booking[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
