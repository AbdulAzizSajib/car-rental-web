'use client';

import { Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { Car } from '@/src/lib/car-data';

interface VehicleCardProps {
  car: Car;
  onCardClick: (car: Car) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (carId: number) => void;
}

export function VehicleCard({
  car,
  onCardClick,
  isFavorite = false,
  onFavoriteToggle,
}: VehicleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
          <span>
            {car.distance < 1000
              ? `${car.distance * 100}m`
              : `${car.distance}km`}{' '}
            ({Math.max(1, Math.round(car.distance / 2))} min)
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-gray-900 font-medium">{car.rating.toFixed(1)}</span>
            <span className="text-gray-400">({car.reviewCount})</span>
          </span>
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
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-contain transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
      </div>

      {/* Bottom info */}
      <div className="px-4 pb-4 pt-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-[15px] text-gray-900 truncate">
            {car.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{car.model}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-base font-semibold text-gray-900">
            ${car.pricePerHour.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400"> / hour</span>
        </div>
      </div>
    </div>
  );
}
