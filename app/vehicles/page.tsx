'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, Map as MapIcon } from 'lucide-react';
import { FilterSidebar, FilterState } from '@/components/filter-sidebar';
import { VehicleCard } from '@/components/vehicle-card';
import { VehicleModal } from '@/components/vehicle-modal';
import { carsData, filterCars, Car } from '@/lib/car-data';

export default function VehiclesPage() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 19,
    priceMax: 99,
    rentalType: 'perHour',
    availableNow: false,
    bodyTypes: ['Sedan', 'Coupe', 'Hatchback', 'Crossover', 'Van'],
    transmissions: [],
    fuelTypes: ['Gasoline', 'Flex Fuel (E85)', 'Electric'],
  });

  const filteredCars = useMemo(() => {
    return filterCars(carsData, {
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      rentalType: filters.rentalType,
      bodyTypes: filters.bodyTypes.length > 0 ? filters.bodyTypes : undefined,
      transmissions:
        filters.transmissions.length > 0 ? filters.transmissions : undefined,
      fuelTypes: filters.fuelTypes.length > 0 ? filters.fuelTypes : undefined,
    });
  }, [filters]);

  const handleFavoriteToggle = (carId: number) => {
    const next = new Set(favorites);
    if (next.has(carId)) next.delete(carId);
    else next.add(carId);
    setFavorites(next);
  };

  return (
    <div className="flex">
      {/* Filter Sidebar */}
      <aside className="hidden lg:block w-80 shrink-0 bg-white sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto"
        style={{ borderRight: '1px solid #ede8df' }}>
        <FilterSidebar onFilterChange={setFilters} />
      </aside>

      {/* Main Vehicle area */}
      <section className="flex-1" style={{ background: '#faf8f4' }}>
        <div className="px-6 py-5 flex items-center justify-between bg-white"
          style={{ borderBottom: '1px solid #ede8df' }}>
          <h1 className="text-lg font-semibold text-gray-900">
            48 vehicles to rent
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors">
              Closest to me
              <ChevronDown size={14} />
            </button>
            <button
              onClick={() => setShowMap((s) => !s)}
              className="flex items-center gap-1 font-medium transition-colors"
              style={{ color: '#c9a84c' }}
            >
              {showMap ? 'Hide map' : 'Show map'}
              <MapIcon size={14} />
            </button>
          </div>
        </div>

        <div className="flex">
          <div className="flex-1 px-6 pb-8 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCars.map((car) => (
                <VehicleCard
                  key={car.id}
                  car={car}
                  onCardClick={setSelectedCar}
                  isFavorite={favorites.has(car.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No vehicles match your filters. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>

          {showMap && (
            <div className="hidden xl:flex w-96 shrink-0 items-center justify-center"
              style={{ background: '#fdf9f0', borderLeft: '1px solid #ede8df' }}>
              <div className="text-center">
                <p className="text-base font-semibold mb-1 text-gray-900">Map view</p>
                <p className="text-sm text-gray-400">
                  Showing {filteredCars.length} vehicles on map
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <VehicleModal
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
        isFavorite={selectedCar ? favorites.has(selectedCar.id) : false}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </div>
  );
}