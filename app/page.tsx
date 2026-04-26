'use client';

import { useState, useMemo } from 'react';
import { SidebarNavbar } from '@/components/sidebar-navbar';
import { TopBar } from '@/components/top-bar';
import { FilterSidebar, FilterState } from '@/components/filter-sidebar';
import { VehicleCard } from '@/components/vehicle-card';
import { VehicleModal } from '@/components/vehicle-modal';
import { carsData, filterCars, Car } from '@/lib/car-data';

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 100,
    rentalType: 'any',
    bodyTypes: [],
    transmissions: [],
    fuelTypes: [],
  });

  // Filter cars based on selected filters
  const filteredCars = useMemo(() => {
    return filterCars(carsData, {
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      rentalType: filters.rentalType,
      bodyTypes: filters.bodyTypes.length > 0 ? filters.bodyTypes : undefined,
      transmissions: filters.transmissions.length > 0 ? filters.transmissions : undefined,
      fuelTypes: filters.fuelTypes.length > 0 ? filters.fuelTypes : undefined,
    });
  }, [filters]);

  const handleFavoriteToggle = (carId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(carId)) {
      newFavorites.delete(carId);
    } else {
      newFavorites.add(carId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="flex">
      {/* Sidebar Navbar */}
      <SidebarNavbar />

      {/* Main Content */}
      <div className="flex-1 ml-16 flex flex-col">
        {/* Top Bar */}
        <TopBar
          vehicleCount={filteredCars.length}
          onMapToggle={() => setShowMap(!showMap)}
          showMap={showMap}
        />

        {/* Main Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Filters */}
          <div className="hidden lg:block w-80 bg-gray-50 border-r overflow-y-auto">
            <div className="p-6">
              <FilterSidebar onFilterChange={setFilters} />
            </div>
          </div>

          {/* Center - Vehicle Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-gray-600 text-lg">
                    No vehicles match your filters. Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right - Map View */}
          {showMap && (
            <div className="hidden lg:block w-96 bg-gray-100 border-l">
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">Map View</p>
                  <p className="text-sm">Showing {filteredCars.length} vehicles on map</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vehicle Modal */}
      <VehicleModal
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
        isFavorite={selectedCar ? favorites.has(selectedCar.id) : false}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </div>
  );
}
