export interface Car {
  id: number;
  name: string;
  model: string;
  image: string;
  pricePerHour: number;
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  distance: number;
  distanceUnit: string;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  bodyType: 'Sedan' | 'Coupe' | 'Hatchback' | 'Pickup' | 'Crossover' | 'SUV' | 'Van' | 'Wagon' | 'Sport coupe';
  passengers: number;
  power: number;
  powerUnit: string;
  latitude: number;
  longitude: number;
}

export const carsData: Car[] = [
  {
    id: 1,
    name: 'Audi A4',
    model: '3.0 TFSI Sport (249 hp, Quattro)',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19d24e23?w=500&h=400&fit=crop',
    pricePerHour: 24.59,
    pricePerDay: 120,
    rating: 4.7,
    reviewCount: 509,
    distance: 4,
    distanceUnit: 'km',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    bodyType: 'Sedan',
    passengers: 5,
    power: 249,
    powerUnit: 'hp',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: 2,
    name: 'Opel Insignia',
    model: '2.0 Turbo Grand Sport (230 hp, AWD)',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400&fit=crop',
    pricePerHour: 19.99,
    pricePerDay: 250,
    rating: 4.0,
    reviewCount: 87,
    distance: 3,
    distanceUnit: 'km',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    bodyType: 'Sedan',
    passengers: 5,
    power: 230,
    powerUnit: 'hp',
    latitude: 37.7849,
    longitude: -122.4094,
  },
  {
    id: 3,
    name: 'Mini Countryman',
    model: 'Cooper S ALL4 (189 hp, AWD)',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19d24e23?w=500&h=400&fit=crop',
    pricePerHour: 28.5,
    pricePerDay: 180,
    rating: 4.9,
    reviewCount: 342,
    distance: 5,
    distanceUnit: 'km',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    bodyType: 'Crossover',
    passengers: 5,
    power: 189,
    powerUnit: 'hp',
    latitude: 37.7649,
    longitude: -122.4294,
  },
  {
    id: 4,
    name: 'Mazda 6',
    model: '2.5 Turbo Premium (250 hp, AWD)',
    image: 'https://images.unsplash.com/photo-1619405399517-541782920ee0?w=500&h=400&fit=crop',
    pricePerHour: 22.99,
    pricePerDay: 200,
    rating: 4.1,
    reviewCount: 298,
    distance: 5,
    distanceUnit: 'km',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    bodyType: 'Sedan',
    passengers: 5,
    power: 250,
    powerUnit: 'hp',
    latitude: 37.7949,
    longitude: -122.3994,
  },
  {
    id: 5,
    name: 'Cadillac Escalade',
    model: '6.2L V8 Platinum (420 hp, 4WD)',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c3ff86173?w=500&h=400&fit=crop',
    pricePerHour: 24.0,
    pricePerDay: 320,
    rating: 5.0,
    reviewCount: 387,
    distance: 10,
    distanceUnit: 'km',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    bodyType: 'SUV',
    passengers: 7,
    power: 420,
    powerUnit: 'hp',
    latitude: 37.7549,
    longitude: -122.4394,
  },
  {
    id: 6,
    name: 'Ford Focus ST',
    model: '2.3 EcoBoost (280 hp, FWD)',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19d24e23?w=500&h=400&fit=crop',
    pricePerHour: 26.75,
    pricePerDay: 280,
    rating: 4.6,
    reviewCount: 118,
    distance: 8,
    distanceUnit: 'km',
    transmission: 'Manual',
    fuelType: 'Gasoline',
    bodyType: 'Hatchback',
    passengers: 5,
    power: 280,
    powerUnit: 'hp',
    latitude: 37.7849,
    longitude: -122.4394,
  },
  {
    id: 7,
    name: 'Tesla Model S',
    model: 'Long Range (405 hp, AWD)',
    image: 'https://images.unsplash.com/photo-1560958089-b8a46dd52d12?w=500&h=400&fit=crop',
    pricePerHour: 45.0,
    pricePerDay: 100,
    rating: 4.7,
    reviewCount: 221,
    distance: 1,
    distanceUnit: 'km',
    transmission: 'Automatic',
    fuelType: 'Electric',
    bodyType: 'Sedan',
    passengers: 5,
    power: 405,
    powerUnit: 'hp',
    latitude: 37.7749,
    longitude: -122.4294,
  },
  {
    id: 8,
    name: 'Mazda 3 Hatchback',
    model: '2.5 Skyactiv G Select (186 hp, FWD)',
    image: 'https://images.unsplash.com/photo-1619405399517-541782920ee0?w=500&h=400&fit=crop',
    pricePerHour: 21.99,
    pricePerDay: 320,
    rating: 4.9,
    reviewCount: 480,
    distance: 12,
    distanceUnit: 'km',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    bodyType: 'Hatchback',
    passengers: 5,
    power: 186,
    powerUnit: 'hp',
    latitude: 37.7649,
    longitude: -122.3894,
  },
  {
    id: 9,
    name: 'VW Tiguan',
    model: '2.0 TSI R-Line (184 hp, AWD/option)',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19d24e23?w=500&h=400&fit=crop',
    pricePerHour: 31.5,
    pricePerDay: 95,
    rating: 4.6,
    reviewCount: 534,
    distance: 3,
    distanceUnit: 'km',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    bodyType: 'SUV',
    passengers: 5,
    power: 184,
    powerUnit: 'hp',
    latitude: 37.7949,
    longitude: -122.4094,
  },
  {
    id: 10,
    name: 'BMW 3 Series',
    model: '340i xDrive (382 hp, AWD)',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400&fit=crop',
    pricePerHour: 29.99,
    pricePerDay: 250,
    rating: 4.8,
    reviewCount: 445,
    distance: 6,
    distanceUnit: 'km',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    bodyType: 'Sedan',
    passengers: 5,
    power: 382,
    powerUnit: 'hp',
    latitude: 37.7749,
    longitude: -122.3994,
  },
  {
    id: 11,
    name: 'VW Golf GTI',
    model: '2.0 TSI Autobahn (241 hp, FWD)',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19d24e23?w=500&h=400&fit=crop',
    pricePerHour: 20.0,
    pricePerDay: 220,
    rating: 4.9,
    reviewCount: 203,
    distance: 9,
    distanceUnit: 'km',
    transmission: 'Manual',
    fuelType: 'Gasoline',
    bodyType: 'Hatchback',
    passengers: 5,
    power: 241,
    powerUnit: 'hp',
    latitude: 37.7549,
    longitude: -122.4194,
  },
  {
    id: 12,
    name: 'Honda CR-V',
    model: '1.5T AWD (190 hp)',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c3ff86173?w=500&h=400&fit=crop',
    pricePerHour: 25.5,
    pricePerDay: 180,
    rating: 4.7,
    reviewCount: 512,
    distance: 7,
    distanceUnit: 'km',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    bodyType: 'Crossover',
    passengers: 5,
    power: 190,
    powerUnit: 'hp',
    latitude: 37.7849,
    longitude: -122.3894,
  },
];

// Helper function to filter cars
export function filterCars(
  cars: Car[],
  {
    priceMin,
    priceMax,
    rentalType,
    bodyTypes,
    transmissions,
    fuelTypes,
  }: {
    priceMin?: number;
    priceMax?: number;
    rentalType?: 'any' | 'perDay' | 'perHour';
    bodyTypes?: string[];
    transmissions?: string[];
    fuelTypes?: string[];
  }
): Car[] {
  return cars.filter((car) => {
    // Price filter based on rental type
    if (rentalType === 'perHour') {
      if (priceMin && car.pricePerHour < priceMin) return false;
      if (priceMax && car.pricePerHour > priceMax) return false;
    } else if (rentalType === 'perDay') {
      if (priceMin && car.pricePerDay < priceMin) return false;
      if (priceMax && car.pricePerDay > priceMax) return false;
    } else {
      // Check against either price
      const minPrice = Math.min(car.pricePerHour, car.pricePerDay);
      if (priceMin && minPrice < priceMin) return false;
      if (priceMax && minPrice > priceMax) return false;
    }

    // Body type filter
    if (bodyTypes && bodyTypes.length > 0 && !bodyTypes.includes(car.bodyType)) {
      return false;
    }

    // Transmission filter
    if (transmissions && transmissions.length > 0 && !transmissions.includes(car.transmission)) {
      return false;
    }

    // Fuel type filter
    if (fuelTypes && fuelTypes.length > 0 && !fuelTypes.includes(car.fuelType)) {
      return false;
    }

    return true;
  });
}
