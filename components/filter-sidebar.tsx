'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export interface FilterState {
  priceMin: number;
  priceMax: number;
  rentalType: 'any' | 'perDay' | 'perHour';
  bodyTypes: string[];
  transmissions: string[];
  fuelTypes: string[];
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
}

const bodyTypes = ['Sedan', 'Coupe', 'Hatchback', 'Pickup', 'Crossover', 'SUV', 'Van', 'Wagon'];
const transmissions = ['Automatic', 'Manual'];
const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 100,
    rentalType: 'any',
    bodyTypes: [],
    transmissions: [],
    fuelTypes: [],
  });

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceMin: value[0], priceMax: value[1] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRentalTypeChange = (type: 'any' | 'perDay' | 'perHour') => {
    const newFilters = { ...filters, rentalType: type };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (
    category: 'bodyTypes' | 'transmissions' | 'fuelTypes',
    value: string,
    checked: boolean
  ) => {
    const newFilters = {
      ...filters,
      [category]: checked
        ? [...filters[category], value]
        : filters[category].filter((item) => item !== value),
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    const newFilters: FilterState = {
      priceMin: 0,
      priceMax: 100,
      rentalType: 'any',
      bodyTypes: [],
      transmissions: [],
      fuelTypes: [],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full max-w-xs bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filter by</h2>
        <button
          onClick={handleResetFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Reset all
        </button>
      </div>

      {/* Rental Type */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="font-semibold text-sm text-gray-900 mb-3">RENTAL TYPE</h3>
        <div className="flex gap-2">
          {['Any', 'Per day', 'Per hour'].map((type) => {
            const value = type === 'Any' ? 'any' : type === 'Per day' ? 'perDay' : 'perHour';
            return (
              <button
                key={value}
                onClick={() => handleRentalTypeChange(value as any)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filters.rentalType === value
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="font-semibold text-sm text-gray-900 mb-3">PRICE RANGE / HOUR</h3>
        <Slider
          defaultValue={[0, 100]}
          max={100}
          step={1}
          value={[filters.priceMin, filters.priceMax]}
          onValueChange={handlePriceChange}
          className="mb-3"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>FROM ${filters.priceMin.toFixed(0)}</span>
          <span>TO ${filters.priceMax.toFixed(0)}</span>
        </div>
      </div>

      {/* Body Type */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="font-semibold text-sm text-gray-900 mb-3">BODY TYPE</h3>
        <div className="space-y-2">
          {bodyTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.bodyTypes.includes(type)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('bodyTypes', type, checked as boolean)
                }
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="font-semibold text-sm text-gray-900 mb-3">TRANSMISSION</h3>
        <div className="space-y-2">
          {transmissions.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.transmissions.includes(type)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('transmissions', type, checked as boolean)
                }
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">FUEL TYPE</h3>
        <div className="space-y-2">
          {fuelTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.fuelTypes.includes(type)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange('fuelTypes', type, checked as boolean)
                }
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
