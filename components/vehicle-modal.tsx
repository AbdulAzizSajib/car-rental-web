'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Heart, MapPin, Zap, Gauge, Users } from 'lucide-react';
import { Car } from '@/lib/car-data';
import { Button } from '@/components/ui/button';

interface VehicleModalProps {
  car: Car | null;
  onClose: () => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (carId: number) => void;
}

export function VehicleModal({
  car,
  onClose,
  isFavorite = false,
  onFavoriteToggle,
}: VehicleModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'pricing'>('details');
  const router = useRouter();

  if (!car) return null;

  const handleBookNow = () => {
    onClose();
    router.push('/bookings');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b flex items-center justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{car.name}</h2>
            <p className="text-sm text-gray-600">{car.model}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onFavoriteToggle?.(car.id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart
                size={24}
                className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
              />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full h-80 bg-gray-100 overflow-hidden">
          <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          {(['details', 'specs', 'pricing'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'text-gray-900 border-b-2 border-gray-900 bg-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    PASSENGERS
                  </label>
                  <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Users size={20} />
                    {car.passengers}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    TRANSMISSION
                  </label>
                  <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Gauge size={20} />
                    {car.transmission}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    POWER
                  </label>
                  <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Zap size={20} />
                    {car.power} {car.powerUnit}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    FUEL TYPE
                  </label>
                  <p className="text-lg font-semibold text-gray-900">{car.fuelType}</p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  BODY TYPE
                </label>
                <p className="text-lg font-semibold text-gray-900">{car.bodyType}</p>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Vehicle Specifications</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Passengers:</dt>
                    <dd className="font-semibold text-gray-900">{car.passengers}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Power:</dt>
                    <dd className="font-semibold text-gray-900">
                      {car.power} {car.powerUnit}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Transmission:</dt>
                    <dd className="font-semibold text-gray-900">{car.transmission}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Fuel Type:</dt>
                    <dd className="font-semibold text-gray-900">{car.fuelType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Body Type:</dt>
                    <dd className="font-semibold text-gray-900">{car.bodyType}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-xs font-semibold text-gray-500 mb-1">MINUTE RATE</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${(car.pricePerHour / 60).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600">/ min</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-xs font-semibold text-gray-500 mb-1">HOURLY RATE</p>
                  <p className="text-2xl font-bold text-gray-900">${car.pricePerHour.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">/ hour</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-xs font-semibold text-gray-500 mb-1">DAILY RATE</p>
                  <p className="text-2xl font-bold text-gray-900">${car.pricePerDay.toFixed(0)}</p>
                  <p className="text-xs text-gray-600">/ day</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-sm text-green-900">
                  <span className="font-semibold">Discount available:</span> Book 7 days or more
                  and get 23% off!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-500">STARTING FROM</p>
              <p className="text-3xl font-bold text-gray-900">${car.pricePerHour.toFixed(2)}</p>
              <p className="text-sm text-gray-600">/hour</p>
            </div>
            <Button
              onClick={handleBookNow}
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-2 text-lg"
            >
              Book now
            </Button>
          </div>
          <p className="text-xs text-gray-600">10 min free</p>
        </div>
      </div>
    </div>
  );
}
