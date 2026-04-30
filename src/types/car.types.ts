export interface ApiCar {
  id: string;
  name: string;
  brand: string | { id: string; name: string; logo: string | null };
  model: string | { id: string; name: string };

  year: number;
  bodyType: string;
  pricePerDay: number;
  rentalType: 'ANY' | 'PER_DAY' | 'PER_HOUR';
  seats: number;
  transmission: 'AUTOMATIC' | 'MANUAL';
  fuelType: 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID' | 'OTHER';
  mileage: number;
  engineCapacity: number | null;
  color: string | null;
  registrationNo: string | null;
  location: string;
  isAC: boolean;
  isWithDriver: boolean;
  hostId: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  images: { id: string; url: string; carId: string; isPrimary: boolean }[];
  host: {
    id: string;
    isVerified: boolean;
    user: { name: string };
  };
}

export interface Brand {
  id: string;
  name: string;
  logo: string | null;
  _count: { cars: number; models: number };
}

export interface CarModel {
  id: string;
  name: string;
  brandId: string;
  brand: { id: string; name: string; logo: string | null };
  _count: { cars: number };
}

export interface BodyType {
  id: string;
  name: string;
  image: string | null;
  _count: { cars: number };
}

export interface FuelType {
  id: string;
  name: string;
  image: string | null;
  _count: { cars: number };
}

export interface CarsFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  brandId?: string;
  modelId?: string;
  fuelTypeId?: string;
  bodyTypeId?: string;
  transmission?: string;
  rentalType?: string;
  priceFrom?: number;
  priceTo?: number;
  isAvailable?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
