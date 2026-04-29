'use client';

import { Heart, MapPin } from 'lucide-react';
import { useState } from 'react';
import { ApiCar } from '@/src/types/car.types';

function resolveName(val: string | { name: string } | null | undefined): string {
  if (!val) return '';
  return typeof val === 'string' ? val : val.name;
}

interface VehicleCardProps {
  car: ApiCar;
  onCardClick: (car: ApiCar) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (carId: string) => void;
}

export function VehicleCard({
  car,
  onCardClick,
  isFavorite = false,
  onFavoriteToggle,
}: VehicleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const primaryImage = car.images.find((img) => img.isPrimary)?.url ?? car.images[0]?.url;

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onCardClick(car)}
    >
      {/* Top meta row */}
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {car.location}
          </span>
          <span className="capitalize text-gray-400">{resolveName(car.brand)}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle?.(car.id);
          }}
          className="p-1 -m-1"
          aria-label="Toggle favorite"
        >
          <Heart
            size={18}
            className={
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300 hover:text-gray-400'
            }
          />
        </button>
      </div>

      {/* Image */}
      <div className="relative h-36 flex items-center justify-center overflow-hidden px-4">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={car.name}
            className="w-full h-full object-contain transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          >
            <span className="text-gray-300 text-xs">{car.year} · {car.color ?? resolveName(car.brand)}</span>
          </div>
        )}
      </div>

      {/* Bottom info */}
      <div className="px-4 pb-4 pt-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-[15px] text-gray-900 truncate">
            {car.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{resolveName(car.model)}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-base font-semibold text-gray-900">
            ৳{car.pricePerDay.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400"> / day</span>
        </div>
      </div>
    </div>
  );
}
