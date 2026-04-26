'use client';

import { MapPin, Clock, MapPinOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  vehicleCount: number;
  onMapToggle: () => void;
  showMap: boolean;
}

export function TopBar({ vehicleCount, onMapToggle, showMap }: TopBarProps) {
  return (
    <div className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Clock size={16} className="text-gray-600" />
            <span className="text-sm text-gray-600">01:48 PM (UTC -7)</span>
            <MapPin size={16} className="text-gray-600" />
            <span className="text-sm text-gray-600">San Francisco, US</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onMapToggle}
              className="gap-2"
            >
              {showMap ? <MapPinOff size={16} /> : <MapPin size={16} />}
              {showMap ? 'Hide map' : 'Show map'}
            </Button>
            <Button variant="outline" size="sm">
              PRO features
            </Button>
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            {vehicleCount} vehicles to rent
          </h1>
          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Closest to me
            </button>
            <select className="text-sm text-gray-500 hover:text-gray-700 bg-transparent border-0 focus:ring-0">
              <option>Show map</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
